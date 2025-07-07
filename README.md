# Shared RDM Newsletter Template 

This template system makes it easy to update the Shared RDM newsletter yearly by separating content from design. 

## Files Overview

- **`newsletter-config.json`** - Contains all the content that changes yearly (text, links, dates, etc.)
- **`index-original.html`** - The original newsletter template (DO NOT EDIT)
- **`build-simple.js`** - The build script that generates the newsletter
- **`index.html`** - The generated newsletter (automatically created)
- **`images/`** - Folder containing all newsletter images

## Quick Start

### For Yearly Updates

1. **Update Content**: Edit `newsletter-config.json` with new information
2. **Update Images**: Replace images in the `images/` folder (or update paths in config)
3. **Build Newsletter**: Run `node build-simple.js`
4. **Done!** Your updated newsletter is now in `index.html`

### Using NPM Scripts

You can also use the predefined scripts:

```bash
# Build the newsletter
npm run build

# Build and open in browser (macOS)
npm run dev
```

## Updating Content

### Main Newsletter Information

Edit these fields in `newsletter-config.json`:

```json
{
  "newsletter": {
    "title": "Newsletter Shared RDM #3",           // Update number
    "subtitle": "Welcome to the third edition...", // Update description
    "year": "2025",                                // Update year
    "projectPageUrl": "https://...",               // Project website
    "clusterUrl": "https://..."                    // Cluster website
  }
}
```

### Use Cases Section

Update institution deployments:

```json
{
  "useCases": {
    "title": "Use Cases Development",
    "description": "In 2025, we deployed...",
    "institutions": [
      "New institution 1",
      "New institution 2",
      // Add more as needed
    ],
    "toolsLink": "https://new-link-to-tools.pdf"
  }
}
```

### Communities Section

Update community information and links:

```json
{
  "communities": {
    "eln": {
      "title": "ELN Community",
      "description": "Updated description...",
      "contactEmail": "new-email@example.com"
    },
    // Update other communities similarly
  }
}
```

### Dissemination Activities

Update events, webinars, and activities:

```json
{
  "dissemination": {
    "webinars": {
      "title": "Webinar series 2025",
      "description": "This year we conducted...",
      "topics": [
        "New Topic 1 (Date)",
        "New Topic 2 (Date)"
      ],
      "repositoryUrl": "https://updated-repository-link"
    },
    "projectMeeting": {
      "title": "Project Meeting 2025",
      "description": "The meeting took place...",
      "learnMoreUrl": "https://new-meeting-link"
    }
    // Update other activities
  }
}
```

### Contact Information

Update if contact details change:

```json
{
  "contact": {
    "email": "new-contact@example.com",
    "subscribeUrl": "https://new-subscription-link",
    "address": {
      "street": "New Address",
      "city": "New City"
    }
  }
}
```

## Updating Images

### Option 1: Replace Existing Images
Keep the same filenames and just replace the image files in the `images/` folder:

- `SharedRDM-orange.png`
- `cluster-logo.png`
- `Webinar-series.png`
- `Project-meeting.jpg`
- etc.

### Option 2: Use New Image Names
1. Add new images to the `images/` folder
2. Update the paths in `newsletter-config.json`:

```json
{
  "images": {
    "webinarImage": "images/new-webinar-2025.png",
    "projectMeetingImage": "images/meeting-2025.jpg"
  }
}
```

## Advanced Customization

### Adding New Sections

If you need to add entirely new sections to the newsletter:

1. Add the content to `newsletter-config.json`
2. Edit `build-simple.js` to include replacement rules for the new content
3. If needed, modify `index-original.html` to include placeholder text

### Modifying the Build Script

The `build-simple.js` script uses simple string replacement. To add new replacements:

```javascript
// Add new replacement
html = html.replace('OLD_TEXT', config.your.new.content);
```


