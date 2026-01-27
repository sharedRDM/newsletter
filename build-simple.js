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

function replaceAllUnsafe(html, token, value) {
  return html.split(token).join(value);
}

function imageToDataUri(imagePath) {
  try {
    const fullPath = path.resolve(__dirname, imagePath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Warning: Image not found: ${imagePath}`);
      return imagePath;
    }
    const imageBuffer = fs.readFileSync(fullPath);
    const ext = path.extname(imagePath).toLowerCase();
    let mimeType = "image/png";
    if (ext === ".jpg" || ext === ".jpeg") {
      mimeType = "image/jpeg";
    } else if (ext === ".png") {
      mimeType = "image/png";
    } else if (ext === ".gif") {
      mimeType = "image/gif";
    }
    const base64 = imageBuffer.toString("base64");
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.warn(`Warning: Could not convert image ${imagePath}:`, error.message);
    return imagePath;
  }
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
       </div>`,
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
            <img src="${src}" width="250" height="auto" alt="Webinar ${idx + 1}" style="display: block; border-radius: 4px; max-width: 100%;"/>
          </td>
        </tr>
        <tr><td height="15" align="center" valign="top">&nbsp;</td></tr>`,
      )
      .join("\n")}
  </table>`;
}

function buildNewsletter() {
  try {
    console.log("Building newsletter...");

    const dataPath = path.resolve(__dirname, "newsletter-data.js");
    delete require.cache[dataPath];
    const data = require(dataPath);

    const templatePath = path.resolve(__dirname, "newsletter-template.html");
    let html = fs.readFileSync(templatePath, "utf8");
    html = replaceAll(
      html,
      "{{newsletter.title}}",
      mustGet(data, "newsletter.title"),
    );
    html = replaceAll(
      html,
      "{{newsletter.subtitle}}",
      mustGet(data, "newsletter.subtitle"),
    );
    html = replaceAll(
      html,
      "{{newsletter.year}}",
      mustGet(data, "newsletter.year"),
    );
    html = replaceAll(
      html,
      "{{newsletter.projectPageUrl}}",
      mustGet(data, "newsletter.projectPageUrl"),
    );
    html = replaceAll(
      html,
      "{{newsletter.clusterUrl}}",
      mustGet(data, "newsletter.clusterUrl"),
    );
    html = replaceAll(
      html,
      "{{newsletter.projectDescription}}",
      mustGet(data, "newsletter.projectDescription"),
    );

    html = replaceAllUnsafe(
      html,
      "{{images.sharedRdmLogo}}",
      imageToDataUri(mustGet(data, "images.sharedRdmLogo")),
    );
    html = replaceAllUnsafe(
      html,
      "{{images.clusterLogo}}",
      imageToDataUri(mustGet(data, "images.clusterLogo")),
    );
    html = replaceAllUnsafe(
      html,
      "{{images.bmbwfLogo}}",
      imageToDataUri(mustGet(data, "images.bmbwfLogo")),
    );
    html = replaceAllUnsafe(
      html,
      "{{images.fairaiImage}}",
      imageToDataUri(mustGet(data, "images.fairaiImage")),
    );
    html = replaceAllUnsafe(
      html,
      "{{images.cordiImage}}",
      imageToDataUri(mustGet(data, "images.cordiImage")),
    );
    html = replaceAllUnsafe(
      html,
      "{{images.opensciencefestivalImage}}",
      imageToDataUri(mustGet(data, "images.opensciencefestivalImage")),
    );
    html = replaceAllUnsafe(
      html,
      "{{images.projectmeetingImage}}",
      imageToDataUri(mustGet(data, "images.projectmeetingImage")),
    );
    html = replaceAllUnsafe(
      html,
      "{{images.websideImage}}",
      imageToDataUri(mustGet(data, "images.websideImage")),
    );
    const webinarImages = mustGet(data, "images.webinarImages");
    const webinarImagesWithDataUri = webinarImages.map((img) =>
      imageToDataUri(img),
    );
    html = html
      .split("{{{images.webinarImagesHtml}}}")
      .join(renderWebinarImages(webinarImagesWithDataUri));

    const symposiumTitle = mustGet(data, "sections.symposium.title");
    const symposiumTitleHtml = symposiumTitle.replace(/\n/g, "<br />");
    html = html.split("{{sections.symposium.title}}").join(symposiumTitleHtml);
    html = replaceAll(
      html,
      "{{sections.symposium.description}}",
      mustGet(data, "sections.symposium.description"),
    );
    html = replaceAll(
      html,
      "{{sections.symposium.readMoreUrl}}",
      mustGet(data, "sections.symposium.readMoreUrl"),
    );

    html = replaceAll(
      html,
      "{{sections.communities.sectionTitle}}",
      mustGet(data, "sections.communities.sectionTitle"),
    );
    html = replaceAll(
      html,
      "{{sections.communities.description}}",
      mustGet(data, "sections.communities.description"),
    );

    html = replaceAll(
      html,
      "{{sections.communities.eln.title}}",
      mustGet(data, "sections.communities.eln.title"),
    );
    html = replaceAll(
      html,
      "{{sections.communities.eln.description}}",
      mustGet(data, "sections.communities.eln.description"),
    );

    html = replaceAll(
      html,
      "{{sections.communities.invenio.title}}",
      mustGet(data, "sections.communities.invenio.title"),
    );
    html = replaceAll(
      html,
      "{{sections.communities.invenio.description}}",
      mustGet(data, "sections.communities.invenio.description"),
    );

    html = replaceAll(
      html,
      "{{sections.communities.damap.title}}",
      mustGet(data, "sections.communities.damap.title"),
    );
    html = replaceAll(
      html,
      "{{sections.communities.damap.description}}",
      mustGet(data, "sections.communities.damap.description"),
    );

    html = replaceAll(
      html,
      "{{sections.training.sectionTitle}}",
      mustGet(data, "sections.training.sectionTitle"),
    );
    html = replaceAll(
      html,
      "{{sections.training.webinars.title}}",
      mustGet(data, "sections.training.webinars.title"),
    );
    html = replaceAll(
      html,
      "{{sections.training.webinars.description}}",
      mustGet(data, "sections.training.webinars.description"),
    );
    html = replaceAll(
      html,
      "{{sections.training.webinars.repositoryUrl}}",
      mustGet(data, "sections.training.webinars.repositoryUrl"),
    );
    html = replaceAll(
      html,
      "{{sections.training.webinars.youtubeUrl}}",
      mustGet(data, "sections.training.webinars.youtubeUrl"),
    );
    html = html
      .split("{{{sections.training.webinars.topicsHtml}}}")
      .join(
        renderWebinarTopics(mustGet(data, "sections.training.webinars.topics")),
      );

    html = replaceAll(
      html,
      "{{sections.dissemination.sectionTitle}}",
      mustGet(data, "sections.dissemination.sectionTitle"),
    );

    html = replaceAll(
      html,
      "{{sections.dissemination.webinars.title}}",
      mustGet(data, "sections.dissemination.webinars.title"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.webinars.description}}",
      mustGet(data, "sections.dissemination.webinars.description"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.webinars.repositoryUrl}}",
      mustGet(data, "sections.dissemination.webinars.repositoryUrl"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.webinars.youtubeUrl}}",
      mustGet(data, "sections.dissemination.webinars.youtubeUrl"),
    );
    html = html
      .split("{{{sections.dissemination.webinars.topicsHtml}}}")
      .join(
        renderWebinarTopics(
          mustGet(data, "sections.dissemination.webinars.topics"),
        ),
      );

    html = replaceAll(
      html,
      "{{sections.dissemination.CoRDI.title}}",
      mustGet(data, "sections.dissemination.CoRDI.title"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.CoRDI.description}}",
      mustGet(data, "sections.dissemination.CoRDI.description"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.CoRDI.url}}",
      mustGet(data, "sections.dissemination.CoRDI.url"),
    );

    html = replaceAll(
      html,
      "{{sections.dissemination.opensciencefestival.title}}",
      mustGet(data, "sections.dissemination.opensciencefestival.title"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.opensciencefestival.description}}",
      mustGet(data, "sections.dissemination.opensciencefestival.description"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.opensciencefestival.url}}",
      mustGet(data, "sections.dissemination.opensciencefestival.url"),
    );

    html = replaceAll(
      html,
      "{{sections.dissemination.projectmeeting.title}}",
      mustGet(data, "sections.dissemination.projectmeeting.title"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.projectmeeting.description}}",
      mustGet(data, "sections.dissemination.projectmeeting.description"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.projectmeeting.url}}",
      mustGet(data, "sections.dissemination.projectmeeting.url"),
    );

    html = replaceAll(
      html,
      "{{sections.dissemination.CFD.title}}",
      mustGet(data, "sections.dissemination.CFD.title"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.CFD.description}}",
      mustGet(data, "sections.dissemination.CFD.description"),
    );
    html = replaceAll(
      html,
      "{{sections.dissemination.CFD.url}}",
      mustGet(data, "sections.dissemination.CFD.url"),
    );

    html = replaceAll(
      html,
      "{{contact.email}}",
      mustGet(data, "contact.email"),
    );
    html = replaceAll(
      html,
      "{{contact.address.street}}",
      mustGet(data, "contact.address.street"),
    );
    html = replaceAll(
      html,
      "{{contact.address.city}}",
      mustGet(data, "contact.address.city"),
    );
    html = replaceAll(
      html,
      "{{contact.subscribeUrl}}",
      mustGet(data, "contact.subscribeUrl"),
    );

    fs.writeFileSync(path.resolve(__dirname, "index.html"), html);
    console.log("Newsletter built successfully!");
    console.log("Output: index.html");
  } catch (error) {
    console.error("Error building newsletter:", error.message);
    process.exit(1);
  }
}

buildNewsletter();
