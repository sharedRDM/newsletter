/**
 * NEWSLETTER CONTENT (edit this file only)
 *
 */

module.exports = {
  newsletter: {
    title: "Newsletter Shared RDM #4",
    subtitle:
      "Welcome back to the Shared RDM Newsletter! This is the fourth edition of the newsletter. Have a look what happened between July 2025 and now within our project.",
    year: "2026",
    projectPageUrl: "https://forschung-daten.at/en/shared-rdm/",
    clusterUrl: "https://forschung-daten.at/en/",
    projectDescription:
      "Shared RDM Services & Infrastructure is a BMBWF-funded project devoted to establishing a framework for providing Research Data Management (RDM) tools and infrastructures as shared services for Austrian universities and research institutions. This initiative aims to foster resource efficiency, interoperability, standardization, and alignment with international initiatives such as EOSC. Ultimately, it increases Austria's visibility and reliability in the reuse of research results.",
  },

  images: {
    sharedRdmLogo: "images/SharedRDM-orange.png",
    clusterLogo: "images/logo-cluster-neu.jpg",
    bmbwfLogo: "images/bmbwf.png",
    fairaiImage: "images/2026/fair_ai_symposium.jpg",
    webinarImages: ["images/2026/webinar1.png", "images/2026/webinar2.jpg"],
    opensciencefestivalImage: "images/2026/opensciencefestival.jpg",
    websideImage: "images/2026/webside.png",
    cordiImage: "images/2026/cordi.png",
    projectmeetingImage: "images/2026/projectmeeting.jpg",
    cheatSheetsImage: "images/2025/Cheat-sheets.png",
    bibliothekskongressImage: "images/2025/Bibliothekskongress.png",
  },

  sections: {
    symposium: {
      title:
        "FAIR & AI Symposium Highlights:\nA Community Shaping the Future of Trustworthy Research Data and AI",
      description: `The FAIR & AI Symposium, organised under Cluster Forschung+Daten, brought together a vibrant community of researchers, infrastructure specialists, data stewards, and policy experts to explore one of today's most pressing intersections: the evolving relationship between FAIR research data and artificial intelligence (AI).
Held in the magnificent Aula of TU Graz' historic main building, the rich program sparked lively discussions on how data management and AI development can advance together in a responsible and sustainable way.
Key themes and insights: FAIR and AI complement each other, but privacy, transparency, and bias remain key challenges
Throughout the symposium, participants reflected on the pivotal question:
Are the FAIR Guiding Principles still sufficient for data stewardship, in an era where AI increasingly guides how we create, manage, and reuse data?
The sessions made clear that while FAIR remains a strong foundation, AI brings both powerful opportunities and new responsibilities. Automated metadata generation, semantic enrichment, and improved data discoverability were highlighted as significant enablers for FAIRification. At the same time, speakers emphasized that challenges such as transparency, bias detection, accountability, and ethical decision-making cannot be delegated to machines alone.`,
      readMoreUrl:
        "https://forschung-daten.at/en/shared-rdm/news-events/details/fair-ai-symposium-tu-graz/",
    },

    communities: {
      sectionTitle: "News from within our communities",
      description:
        "Vibrant communities play a decisive role in the further development and dissemination of RDM software solutions and practices. Through regular developer meetings, knowledge transfer between national organisations, orientation towards international developments, mutual support and openness towards external parties and new participants, RDM support solutions can be established in line with demand and across the board.",

      eln: {
        title: "Electronic Lab Notebook Community",
        description: `Austrian ELN Community Meeting at JKU Linz
On 22 October 2025, the Austrian ELN Community met at JKU Linz to discuss the current application scenarios for the ELN software 'eLabFTW' at the participating universities. The meeting also discussed cooperation with the French company Deltablot to enable optimal further development.
In addition, inter-university training opportunities were discussed and it was decided to increase the involvement of researchers and teachers in the community. To this end, there are plans to set up a forum-like structure that will be available to all eLabFTW users at Austrian universities. The focus would be on cross-domain exchange between users. The first implementation steps and another face-to-face meeting are planned for 2026.`,
      },

      invenio: {
        title: "InvenioRDM",
        description: `Over the past year, InvenioRDM (a repository solution) has seen steady progress at TU Wien and Graz University of Technology. A key factor in this development was the introduction of a structured curation workflow, implemented in February at TU Wien and in November at Graz University of Technology, which has contributed to consistently high data quality. 

In September 2025, the TU Wien Research Data Repository was awarded the CoreTrustSeal certification. This recognition confirms the repository's status as a reliable, trustworthy, and user-friendly platfrom for the long-term management and sharing of reseach data.`,
        readMoreUrl: "https://forschung-daten.at/en/shared-rdm/",
      },

      damap: {
        title: "DAMAP",
        description: `The DAMAP cloud service was prepared, which included several test deployments on the ARI&Snet platform (in collaboration with the ARI&Snet project) for interested universities such as Central European University, BOKU University, and Vienna University of Economics and Business. These pilots provided valuable feedback, which is now directly informing the final preparations for the planned cloud release in the first quarter of 2026.
Beyond technical work, the DAMAP team also contributed to the design of the RDA maDMP API, helping to align DAMAP with emerging international standards for machine-actionable data management plans. In addition, DAMAP was presented to the Finnish university community, where initial interest was expressed in potentially adopting the service.`,
      },
    },
    useCases: {
      title: "Use Cases Development",
      description:
        "The Use Cases developed within the Shared RDM project are developing further.",
      items: [],
    },

    training: {
      sectionTitle: "Training and Knowledge Transfer",

      webinars: {
        title: 'Webinar series "Research Data Management in Austria"',
        description:
          "During the past six months, our webinar series brought together a broad audience from Austria and abroad, with two well-attended sessions offering insightful and informative discussions. All previous episodes can be found on YouTube. The topics were:",
        repositoryUrl:
          "https://repository.tugraz.at/communities/rdm-austria/records?q=&l=list&p=1&s=10&sort=newest",
        youtubeUrl: "https://www.youtube.com/@rdm-austria",
        topics: [
          "Ethical aspects of human-participant research data collection and management: The open-source Ethiktool software (9th of December 2025)",
          "Anonymization and pseudonymization in the social sciences – Practical strategies for responsible research data management (21st of January 2026)",
        ],
      },
    },

    dissemination: {
      sectionTitle: "Dissemination Activities",
      webinars: {
        title: 'Webinar series "Research Data Management in Austria"',
        description:
          "During the past six months, our webinar series brought together a broad audience from Austria and abroad, with two well-attended sessions offering insightful and informative discussions. All previous episodes can be found on YouTube. The topics were:",
        repositoryUrl:
          "https://repository.tugraz.at/communities/rdm-austria/records?q=&l=list&p=1&s=10&sort=newest",
        youtubeUrl: "https://www.youtube.com/@rdm-austria",
        topics: [
          "Ethical aspects of human-participant research data collection and management: The open-source Ethiktool software (9th of December 2025)",
          "Anonymization and pseudonymization in the social sciences – Practical strategies for responsible research data management (21st of January 2026)",
        ],
      },
      cheatSheets: {
        title: "Cheat Sheet Series",
        description:
          "The Cheat Sheet Series was already introduced in our last newsletter.",
        url: "https://phaidra.univie.ac.at/detail/o:2122994",
      },
      bibliothekskongress: {
        title: "Shared RDM @ Bibliothekskongress",
        description:
          "The 2nd Austrian Library Congress took place in March in Vienna.",
        url: "https://opus4.kobv.de/opus4-bib-info/frontdoor/index/index/docId/19409",
      },

      CoRDI: {
        title: "Shared RDM @ CORDI 2025",
        description: `The second edition of the Conference on Research Data Infrastructure (CoRDI) brought together national and international experts from August 26–28, 2025, in Aachen. This NFDI conference, hosted at RWTH Aachen's lecture hall centre C.A.R.L., showcased a wide-ranging programme of keynotes, lectures, poster sessions, and a market of opportunities, all united under the theme of generating more knowledge through the effective use of research data.
Shared RDM Services & Infrastructure had the honour of opening a sub session with a presentation on Framework Conditions for Shared Services in Austria. The talk attracted significant interest from the audience and demonstrated how collaborative infrastructures and harmonized approaches can strengthen research data management across institutions and disciplines. In addition, a complementary poster illustrated how Shared RDM is laying the foundation for a national ecosystem of shared services by balancing organizational, technical, and policy requirements, highlighting the potential of shared infrastructures to support sustainable and cross-institutional RDM practices.`,
        url: "https://forschung-daten.at/en/article/shared-rdm-cordi-2025/",
      },

      opensciencefestival: {
        title:
          "Open Science Festival 2025:\nPoster Presentation from Shared RDM",
        description: `On 8 and 9 September, the University of Vienna invited Austrian and international guests to an Open Science exchange. The Open Science Festival is a concept from the Netherlands, where the event has been held regularly since 2021. Three years ago, the TIB and Leibniz University Hannover jointly organised the first Open Science Festival in the German-speaking world. Others followed in Cologne, Mainz – and now in Vienna. We had the opportunity to present a poster with the first results of the Shared RDM survey [SB8.1]on the use of data stewards at Austrian universities. Posters of the partner project ARI&Snet, the overarching Cluster Forschungsdaten, and the EU project OSTrails were also on display at the exhibition.`,
        url: "https://forschung-daten.at/en/shared-rdm/news-events/details/open-science-festival/",
      },

      projectmeeting: {
        title: "Shared RDM meets OSTrails:\nProject Meeting 2025",
        description: `The annual Shared RDM project meeting took place at Graz University of Technology on 23–24 September. The focus was on how universities can continue to collaborate sustainably even after the official end of the project. The meeting kicked off with an exciting presentation on the EU project OSTrails, which deals with the DAMAP tool, among other things. Connections to Shared RDM also became clear during the presentation.`,
        url: "https://forschung-daten.at/en/shared-rdm/news-events/details/shared-rdm-project-meeting-2025/",
      },
      CFD: {
        title: "Cluster Research+Data in a new guise",
        description: `We are pleased to announce the relaunch of the website Cluster Forschung+Daten. As part of the website redesign, the cluster has also changed its name and is now called Cluster Research+Data. The new site provides comprehensive information on both current and completed projects, along with a wide range of resources and materials related to research data. In addition, the website has been redesigned with improved usability to make navigation and access to content easier and more intuitive.`,
        url: "https://forschung-daten.at/en/",
      },
    },
  },

  contact: {
    email: "contact.sharedrdm@mlist.tugraz.at",
    address: {
      street: "Münzgrabenstraße 36/ II",
      city: "8010 Graz",
    },
    subscribeUrl: "https://mlist.tugraz.at/mailman/listinfo/news.sharedrdm",
  },
};
