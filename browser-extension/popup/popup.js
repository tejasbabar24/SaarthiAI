const statusValue = document.getElementById('statusValue');
const statusHelp = document.getElementById('statusHelp');
const fieldsReady = document.getElementById('fieldsReady');
const reviewButton = document.getElementById('reviewButton');
const fillButton = document.getElementById('fillButton');
const reviewPanel = document.getElementById('reviewPanel');
const reviewList = document.getElementById('reviewList');
const closeReview = document.getElementById('closeReview');
const confirmFill = document.getElementById('confirmFill');

function sendToCurrentTab(message) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || !tabs[0]) {
        resolve({ error: 'No active tab.' });
        return;
      }
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, message, (response) => {
        const error = chrome.runtime.lastError;
        resolve({ response: response || null, tab, error: error ? error.message : null });
      });
    });
  });
}

function injectContentScripts(tabId) {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        files: ['config/formMapping.js', 'content/fieldDetector.js', 'content/formFiller.js', 'content/content.js']
      },
      () => {
        const error = chrome.runtime.lastError;
        if (error) {
          resolve({ success: false, error: error.message });
          return;
        }
        resolve({ success: true });
      }
    );
  });
}

async function refreshStatus() {
  const result = await sendToCurrentTab({ type: 'CHECK_FORM_STATUS' });
  const response = result.response;
  const tab = result.tab;
  const error = result.error;

  const isFileUrl = tab && typeof tab.url === 'string' && tab.url.startsWith('file://');
  const shouldAttemptInjection = error && error.includes('Could not establish connection') && tab && tab.id;

  if (shouldAttemptInjection) {
    const injection = await injectContentScripts(tab.id);
    if (!injection.success) {
      statusValue.textContent = `Content injection failed: ${injection.error}`;
      fieldsReady.textContent = '0';
      reviewButton.disabled = true;
      fillButton.disabled = true;
      return;
    }

    const retry = await sendToCurrentTab({ type: 'CHECK_FORM_STATUS' });
    const retryResponse = retry.response;
    const retryError = retry.error;
    if (retryResponse && retryResponse.supported) {
      statusValue.textContent = '✓ Supported form detected';
      fieldsReady.textContent = retryResponse.totalFields;
      reviewButton.disabled = false;
      fillButton.disabled = false;
      return;
    }
    if (retryError) {
      statusValue.textContent = `Messaging failed after injection: ${retryError}`;
    } else if (isFileUrl) {
      statusValue.textContent = 'Supported file loaded, but the form was not recognized.';
    } else {
      statusValue.textContent = 'No supported form detected';
    }
    fieldsReady.textContent = '0';
    reviewButton.disabled = true;
    fillButton.disabled = true;
    return;
  }

  if (response && response.supported) {
    statusValue.textContent = '✓ Supported form detected';
    statusHelp.textContent = '';
    fieldsReady.textContent = response.totalFields;
    reviewButton.disabled = false;
    fillButton.disabled = false;
  } else {
    if (error) {
      statusValue.textContent = `Extension messaging failed: ${error}`;
      statusHelp.textContent = '';
    } else if (!response) {
      if (isFileUrl) {
        statusValue.textContent = 'No extension access to local file. Enable "Allow access to file URLs" and refresh the page.';
      } else {
        statusValue.textContent = 'Open the test form directly in Chrome as a local file (`file:///...`).';
      }
      statusHelp.textContent = '';
    } else {
      if (isFileUrl) {
        statusValue.textContent = 'Supported file loaded, but the form was not recognized.';
      } else {
        statusValue.textContent = 'No supported form detected';
      }
      const missingKeys = response.missingFields.map((item) => item.key).join(', ');
      statusHelp.textContent = missingKeys ? `Missing fields: ${missingKeys}` : '';
    }
    fieldsReady.textContent = '0';
    reviewButton.disabled = true;
    fillButton.disabled = true;
  }
}

function renderReviewItems(preview) {
  reviewList.innerHTML = '';
  preview.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'review-item';
    row.innerHTML = `
      <div class="label">${item.label}</div>
      <div class="value">${item.value}</div>
    `;
    reviewList.appendChild(row);
  });
}

async function openReviewPanel() {
  const response = await sendToCurrentTab({ type: 'REQUEST_FORM_PREVIEW' });
  if (response && response.supported) {
    renderReviewItems(response.preview);
    reviewPanel.classList.remove('hidden');
  }
}

async function fillForm() {
  const response = await sendToCurrentTab({ type: 'FILL_FORM' });
  if (response && response.results) {
    const successCount = response.results.filter((item) => item.status === 'filled').length;
    statusValue.textContent = `✓ Form filled successfully. Please review before submitting.`;
    fieldsReady.textContent = successCount;
  }
}

reviewButton.addEventListener('click', openReviewPanel);
fillButton.addEventListener('click', async () => {
  await openReviewPanel();
});
closeReview.addEventListener('click', () => {
  reviewPanel.classList.add('hidden');
});
confirmFill.addEventListener('click', async () => {
  await fillForm();
  reviewPanel.classList.add('hidden');
});

refreshStatus();
