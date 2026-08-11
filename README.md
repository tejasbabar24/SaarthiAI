# JanMitra AI – Government Form Assistant

## What this extension does
This Chrome extension detects one specific offline test form and helps fill it with hardcoded sample citizen data. It works without any network access, APIs, or external services.

## Included files
- `manifest.json` - Chrome Manifest V3 configuration
- `popup/` - extension popup UI files
- `content/` - content scripts for form detection and filling
- `config/formMapping.js` - field mapping to the supported test form
- `test-form/government-form.html` - local supported test government-style form

## How to load the extension in Chrome
1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode** in the top-right.
3. Click **Load unpacked**.
4. Select the `browser-extension` folder from this project.
5. The extension should appear as `JanMitra AI – Government Form Assistant`.

## How to open the test form
1. Open the file explorer and locate `browser-extension/test-form/government-form.html`.
2. Open this file in Chrome by dragging it into a browser window or using `Ctrl+O` and selecting the file.
3. Make sure the page URL starts with `file:///` in the address bar.
4. If the popup says it is not detected, enable **Allow access to file URLs** for the extension in `chrome://extensions`.
5. Refresh the page after enabling file URL access.

## How the extension detects the form
The extension checks the loaded page for a matching set of fields with fixed IDs defined in `config/formMapping.js`.
If all expected fields are present, it displays a floating JanMitra assistant on the page and enables the popup buttons.

## How to review the raw data
1. Open the Chrome extension popup by clicking the extension icon.
2. Click **Review Information**.
3. The review panel shows the hardcoded values to be inserted.

## How to fill the form
1. After reviewing, click **Confirm & Fill** in the popup review panel.
2. The extension fills each mapped field and triggers input/change events.
3. The page then shows a success status prompting you to review before submitting.

## How to test every field was filled
1. Confirm the supported form is detected by the popup status message.
2. Open `test-form/government-form.html` and verify the input fields were populated with sample data.
3. Each filled field is also highlighted with a subtle green visual indicator.

## Known limitation
- This extension supports only the included one test form (`government-form.html`).
- It does not support other websites, real government portals, or remote services.
