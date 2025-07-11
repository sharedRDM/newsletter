const fs = require("fs");
const path = require("path");

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function mustGet(obj, dottedPath) {
  const parts = dottedPath.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p];
    else throw new Error(`Missing required field: ${dottedPath}`);
  }
  return cur;
}

function replaceAll(html, token, value) {
  const safe = escapeHtml(value);
  return html.split(token).join(safe);
}

function renderUseCases(items) {
  if (!Array.isArray(items)) return "";
  const left = [];
  const right = [];
  items.forEach((item, idx) => {
    const bucket = idx % 2 === 0 ? left : right;
    const title = escapeHtml(item.title || "");
    const url = escapeHtml(item.url || "");
    bucket.push(
      `<div style="margin-bottom: 25px;">
         <a href="${url}" target="_blank" style="font: Bold 14px Arial, Helvetica, sans-serif; color: #878787; text-decoration: none;">
           <strong>${title}</strong>
         </a>
         <div style="font: 12px Arial, Helvetica, sans-serif; color: #878787; margin-top: 5px;">
           <a href="${url}" target="_blank" style="color: #e74c3c; text-decoration: none;">READ MORE</a>
         </div>
       </div>`
    );
  });

  return `<table width="100%" border="0" cellpadding="15" cellspacing="0">
    <tr>
      <td width="50%" align="left" valign="top">${left.join("\n")}</td>
      <td width="50%" align="left" valign="top">${right.join("\n")}</td>
    </tr>
  </table>`;
}

function renderWebinarTopics(topics) {
  if (!Array.isArray(topics) || topics.length === 0) return "";
  return `<ul style="margin-top: 10px; padding-left: 20px; color: #686666;">
    ${topics.map((t) => `<li>${escapeHtml(t)}</li>`).join("\n")}
  </ul>`;
}

function renderWebinarImages(images) {
  if (!Array.isArray(images) || images.length === 0) return "";
  return `<table width="100%" border="0" cellpadding="0" cellspacing="0">
    ${images
      .map(
        (src, idx) => `<tr>
          <td align="center" valign="top">
            <img src="${escapeHtml(src)}" width="190" height="110" alt="Webinar ${idx + 1}" style="display: block; border-radius: 4px;"/>
          </td>
        </tr>
        <tr><td height="15" align="center" valign="top">&nbsp;</td></tr>`
      )
      .join("\n")}
  </table>`;
}

function buildNewsletter() {
  try {
    console.log("Building newsletter...");

    // Load content (editable by non-devs)
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const dataPath = path.resolve(__dirname, "newsletter-data.js");
    delete require.cache[dataPath];
    const data = require(dataPath);

    // Read template
    const templatePath = path.resolve(__dirname, "newsletter-template.html");
    let html = fs.readFileSync(templatePath, "utf8");

    // Basic placeholders
    html = replaceAll(html, "{{newsletter.title}}", mustGet(data, "newsletter.title"));
    html = replaceAll(html, "{{newsletter.subtitle}}", mustGet(data, "newsletter.subtitle"));
    html = replaceAll(html, "{{newsletter.year}}", mustGet(data, "newsletter.year"));
    html = replaceAll(html, "{{newsletter.projectPageUrl}}", mustGet(data, "newsletter.projectPageUrl"));
    html = replaceAll(html, "{{newsletter.clusterUrl}}", mustGet(data, "newsletter.clusterUrl"));
    html = replaceAll(html, "{{newsletter.projectDescription}}", mustGet(data, "newsletter.projectDescription"));

    // Images
    html = replaceAll(html, "{{images.sharedRdmLogo}}", mustGet(data, "images.sharedRdmLogo"));
    html = replaceAll(html, "{{images.clusterLogo}}", mustGet(data, "images.clusterLogo"));
    html = replaceAll(html, "{{images.bmbwfLogo}}", mustGet(data, "images.bmbwfLogo"));
    html = replaceAll(html, "{{images.cheatSheetsImage}}", mustGet(data, "images.cheatSheetsImage"));
    html = replaceAll(html, "{{images.bibliothekskongressImage}}", mustGet(data, "images.bibliothekskongressImage"));

    // Sections: Use Cases
    html = replaceAll(html, "{{sections.useCases.title}}", mustGet(data, "sections.useCases.title"));
    html = replaceAll(html, "{{sections.useCases.description}}", mustGet(data, "sections.useCases.description"));
    html = html.split("{{{sections.useCases.itemsHtml}}}").join(renderUseCases(mustGet(data, "sections.useCases.items")));

    // Sections: Communities
    html = replaceAll(html, "{{sections.communities.sectionTitle}}", mustGet(data, "sections.communities.sectionTitle"));
    html = replaceAll(html, "{{sections.communities.description}}", mustGet(data, "sections.communities.description"));

    html = replaceAll(html, "{{sections.communities.eln.title}}", mustGet(data, "sections.communities.eln.title"));
    html = replaceAll(html, "{{sections.communities.eln.description}}", mustGet(data, "sections.communities.eln.description"));
    html = replaceAll(html, "{{sections.communities.eln.readMoreUrl}}", mustGet(data, "sections.communities.eln.readMoreUrl"));

    html = replaceAll(html, "{{sections.communities.invenio.title}}", mustGet(data, "sections.communities.invenio.title"));
    html = replaceAll(html, "{{sections.communities.invenio.description}}", mustGet(data, "sections.communities.invenio.description"));
    html = replaceAll(html, "{{sections.communities.invenio.readMoreUrl}}", mustGet(data, "sections.communities.invenio.readMoreUrl"));

    html = replaceAll(html, "{{sections.communities.damap.title}}", mustGet(data, "sections.communities.damap.title"));
    html = replaceAll(html, "{{sections.communities.damap.description}}", mustGet(data, "sections.communities.damap.description"));
    html = replaceAll(html, "{{sections.communities.damap.readMoreUrl}}", mustGet(data, "sections.communities.damap.readMoreUrl"));

    // Sections: Dissemination
    html = replaceAll(html, "{{sections.dissemination.sectionTitle}}", mustGet(data, "sections.dissemination.sectionTitle"));

    html = replaceAll(html, "{{sections.dissemination.webinars.title}}", mustGet(data, "sections.dissemination.webinars.title"));
    html = replaceAll(html, "{{sections.dissemination.webinars.description}}", mustGet(data, "sections.dissemination.webinars.description"));
    html = replaceAll(html, "{{sections.dissemination.webinars.repositoryUrl}}", mustGet(data, "sections.dissemination.webinars.repositoryUrl"));
    html = replaceAll(html, "{{sections.dissemination.webinars.youtubeUrl}}", mustGet(data, "sections.dissemination.webinars.youtubeUrl"));
    html = html.split("{{{sections.dissemination.webinars.topicsHtml}}}").join(renderWebinarTopics(mustGet(data, "sections.dissemination.webinars.topics")));
    html = html.split("{{{images.webinarImagesHtml}}}").join(renderWebinarImages(mustGet(data, "images.webinarImages")));

    html = replaceAll(html, "{{sections.dissemination.cheatSheets.title}}", mustGet(data, "sections.dissemination.cheatSheets.title"));
    html = replaceAll(html, "{{sections.dissemination.cheatSheets.description}}", mustGet(data, "sections.dissemination.cheatSheets.description"));
    html = replaceAll(html, "{{sections.dissemination.cheatSheets.url}}", mustGet(data, "sections.dissemination.cheatSheets.url"));

    html = replaceAll(html, "{{sections.dissemination.bibliothekskongress.title}}", mustGet(data, "sections.dissemination.bibliothekskongress.title"));
    html = replaceAll(html, "{{sections.dissemination.bibliothekskongress.description}}", mustGet(data, "sections.dissemination.bibliothekskongress.description"));
    html = replaceAll(html, "{{sections.dissemination.bibliothekskongress.url}}", mustGet(data, "sections.dissemination.bibliothekskongress.url"));

    // Contact
    html = replaceAll(html, "{{contact.email}}", mustGet(data, "contact.email"));
    html = replaceAll(html, "{{contact.address.street}}", mustGet(data, "contact.address.street"));
    html = replaceAll(html, "{{contact.address.city}}", mustGet(data, "contact.address.city"));
    html = replaceAll(html, "{{contact.subscribeUrl}}", mustGet(data, "contact.subscribeUrl"));

    // Write output
    fs.writeFileSync(path.resolve(__dirname, "index.html"), html);
    console.log("Newsletter built successfully!");
    console.log("Output: index.html");
  } catch (error) {
    console.error("Error building newsletter:", error.message);
    process.exit(1);
  }
}

buildNewsletter();