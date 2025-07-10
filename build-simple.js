const fs = require('fs');

function buildNewsletter() {
  try {
    console.log('Building newsletter...');
    
    // Read the configuration file
    const config = JSON.parse(fs.readFileSync('newsletter-config.json', 'utf8'));
    console.log('Configuration loaded');
    
    // Read the template HTML (now based on your perfect 2025 structure)
    let html = fs.readFileSync('index-original.html', 'utf8');
    console.log('Template HTML loaded');
    
    // Simple replacements - only basic content, no structural changes
    console.log('Applying basic replacements...');
    
    // Newsletter title and subtitle
    html = html.replace(/Newsletter Shared RDM #3/g, config.newsletter.title);
    html = html.replace(/Welcome back to the Shared RDM Newsletter! This is the third edition of the newsletter\. Have a look what happened between January 2025 and now within our project\./g, config.newsletter.subtitle);
    
    // Project URLs
    html = html.replace(/https:\/\/forschungsdaten\.at\/en\/sharedrdm\//g, config.newsletter.projectPageUrl);
    html = html.replace(/https:\/\/forschungsdaten\.at\//g, config.newsletter.clusterUrl);
    
    // Year references
    html = html.replace(/2025/g, config.newsletter.year);
    
    // Logo and image paths
    html = html.replace(/images\/SharedRDM-orange\.png/g, config.images.sharedRdmLogo);
    html = html.replace(/images\/cluster-logo\.png/g, config.images.clusterLogo);
    html = html.replace(/images\/bmbwf\.png/g, config.images.bmbwfLogo);
    
    // Main link replacements
    html = html.replace(/https:\/\/repository\.tugraz\.at\/communities\/rdm-austria-2025\/records\?q=&l=list&p=1&s=10&sort=newest/g, config.links.webinarreihe);
    html = html.replace(/https:\/\/opus4\.kobv\.de\/opus4-bib-info\/frontdoor\/index\/index\/docId\/19409\s*/g, config.links.bibliothekskongress);
    
    // Use Cases section
    html = html.replace(/Use Cases Development/g, config.content.useCases.title);
    html = html.replace(/The Use Cases developed within the Shared RDM project are developing further\. In seven testimonials our partners described, how they experienced the collaboration and what they have learned from it\. See what our partners have to say:/g, config.content.useCases.description);
    
    // Communities section
    html = html.replace(/News from within our communities/g, config.content.communities.sectionTitle);
    html = html.replace(/Vibrant communities play a decisive role in the further development and dissemination of RDM software solutions and practices\.\s*Through regular developer meetings, knowledge transfer between national organisations, orientation towards international developments, mutual support and openness towards external parties and new participants, FDM support solutions can be established in line with demand and across the board\./g, config.content.communities.description);
    
    // ELN Community
    html = html.replace(/ELN Community/g, config.content.communities.eln.title);
    html = html.replace(/The Austrian ELN community conducted a user survey to better understand the needs and preferences of eLabFTW users[\s\S]*?Overall, the report highlights both strengths and areas for improvement in the platform\./g, config.content.communities.eln.description);
    
    // InvenioRDM Community
    html = html.replace(/InvenioRDM(?!\s*Community)/g, config.content.communities.invenio.title);
    html = html.replace(/Members of the TU Graz and TU Wien joined the InvenioRDM partner workshop[\s\S]*?We are happy to announce that the next InvenioRDM Partner Workshop will take place in Graz in 2026!/g, config.content.communities.invenio.description);
    
    // DAMAP Community
    html = html.replace(/DAMAP/g, config.content.communities.damap.title);
    html = html.replace(/The DAMAP team participated in the 19th International Digital Curation Conference[\s\S]*?IDCC remains a key event for connecting with professionals and advancing best practices in data management\./g, config.content.communities.damap.description);
    
    // Dissemination section
    html = html.replace(/Dissemination Activities/g, config.content.dissemination.sectionTitle);
    
    // Webinar series
    html = html.replace(/Webinar series "Research Data Management in Austria"/g, config.content.dissemination.webinars.title);
    html = html.replace(/In the last half year, three webinars were conducted[\s\S]*?The topics were:/g, config.content.dissemination.webinars.description);
    
    // Webinar topics
    html = html.replace(/Austrian Micro Data Center in der Praxis \(1st of April 2025\)/g, config.content.dissemination.webinars.topics[0]);
    html = html.replace(/Austrian NeuroCloud \(14th of April 2025\)/g, config.content.dissemination.webinars.topics[1]);
    html = html.replace(/Accessibility of PDF documents \(10th of June 2025\)/g, config.content.dissemination.webinars.topics[2]);
    
    // Cheat Sheets
    html = html.replace(/Cheat Sheet Series/g, config.content.dissemination.cheatSheets.title);
    html = html.replace(/The Cheat Sheet Series was already introduced in our last newsletter[\s\S]*?Make use of this resource and use and share them as you like!/g, config.content.dissemination.cheatSheets.description);
    
    // Bibliothekskongress
    html = html.replace(/Shared RDM @ Bibliothekskongress/g, config.content.dissemination.bibliothekskongress.title);
    html = html.replace(/The 2nd Austrian Library Congress took place in March in Vienna[\s\S]*?The resources of this presentation can be viewed here:/g, config.content.dissemination.bibliothekskongress.description);
    
    // Additional links
    html = html.replace(/https:\/\/www\.youtube\.com\/@rdm-austria/g, config.links.youtube);
    html = html.replace(/https:\/\/repository\.tugraz\.at\/records\/4863b-kjt77/g, config.links.elnSurvey);
    html = html.replace(/https:\/\/www\.tuwien\.at\/en\/research\/rti-support\/research-data\/center-for-rdm\/news\/news\/inveniordm-community-workshop-2025/g, config.links.invenioWorkshop);
    html = html.replace(/https:\/\/www\.tuwien\.at\/en\/all-news\/news\/the-damap-team-at-the-idcc25/g, config.links.damapNews);
    html = html.replace(/https:\/\/phaidra\.univie\.ac\.at\/detail\/o:2122994/g, config.links.cheatSheets);
    
    // Contact information
    html = html.replace(/contact\.sharedrdm@mlist\.tugraz\.at/g, config.contact.email);
    html = html.replace(/Brockmanngasse 84/g, config.contact.address.street);
    html = html.replace(/8010 Graz/g, config.contact.address.city);
    html = html.replace(/https:\/\/mlist\.tugraz\.at\/mailman\/listinfo\/news\.sharedrdm/g, config.contact.subscribe);
    
    // Write the built HTML
    fs.writeFileSync('index.html', html);
    console.log(' Newsletter built successfully!');
    console.log(' Output: index.html');
    
  } catch (error) {
    console.error(' Error building newsletter:', error.message);
    process.exit(1);
  }
}

// Run the build
buildNewsletter(); 