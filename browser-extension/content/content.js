/**
 * Content script that detects the supported form and injects a floating helper.
 * It also shows an inline review panel and fills the form after confirmation.
 */
(function () {
  const injectedId = 'janmitra-floating-assistant';
  const reviewPanelId = 'janmitra-inline-review-panel';
  let currentStatus = null;

  function createFloatingAssistant(totalFields) {
    if (document.getElementById(injectedId)) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.id = injectedId;
    wrapper.style.position = 'fixed';
    wrapper.style.bottom = '24px';
    wrapper.style.right = '24px';
    wrapper.style.width = '280px';
    wrapper.style.zIndex = '2147483647';
    wrapper.style.boxShadow = '0 18px 45px rgba(17, 28, 64, 0.18)';
    wrapper.style.background = '#172957';
    wrapper.style.color = '#ffffff';
    wrapper.style.borderRadius = '18px';
    wrapper.style.fontFamily = 'Segoe UI, Arial, sans-serif';
    wrapper.style.padding = '16px';
    wrapper.style.lineHeight = '1.4';

    wrapper.innerHTML = `
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Saarthi AI</div>
      <div style="font-size: 13px; opacity: 0.9; margin-bottom: 12px;">Supported form detected</div>
      <div style="font-size: 13px; background: rgba(234,241,251,0.18); color: #EAF1FB; padding: 8px 12px; border-radius: 12px; margin-bottom: 14px;">${totalFields} fields available</div>
      <button id="janmitra-review-button" style="width:100%; border:none; background:#E96B5B; color:#ffffff; font-weight:600; padding:10px 12px; border-radius:10px; cursor:pointer;">Review & Fill</button>
    `;

    document.body.appendChild(wrapper);
    wrapper.querySelector('#janmitra-review-button').addEventListener('click', showInlineReviewPanel);
  }

  function addInlineStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .janmitra-filled {
        background: rgba(218, 250, 206, 0.9) !important;
        border: 1.5px solid #6bbe4d !important;
        transition: background 0.35s ease, border-color 0.35s ease;
      }
      #${reviewPanelId} {
        position: fixed;
        inset: 0;
        background: rgba(23, 41, 87, 0.7);
        display: grid;
        place-items: center;
        z-index: 2147483648;
      }
      #${reviewPanelId} .panel-card {
        width: min(460px, calc(100% - 32px));
        background: #ffffff;
        border-radius: 20px;
        padding: 22px;
        box-shadow: 0 20px 40px rgba(17, 28, 64, 0.2);
      }
      #${reviewPanelId} .panel-card h2 {
        margin: 0 0 12px;
        font-size: 18px;
        color: #1f3268;
      }
      #${reviewPanelId} .panel-card .panel-info {
        margin-bottom: 18px;
        color: #4c5b85;
        font-size: 14px;
      }
      #${reviewPanelId} .review-item {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
        padding: 10px 0;
        border-bottom: 1px solid #eef2fb;
      }
      #${reviewPanelId} .review-item:last-child {
        border-bottom: none;
      }
      #${reviewPanelId} .review-item .label {
        font-size: 13px;
        color: #5a6c99;
      }
      #${reviewPanelId} .review-item .value {
        font-size: 14px;
        font-weight: 700;
        color: #172957;
        text-align: right;
      }
      #${reviewPanelId} .panel-actions {
        display: flex;
        gap: 12px;
        margin-top: 18px;
      }
      #${reviewPanelId} button {
        border: none;
        border-radius: 12px;
        padding: 11px 14px;
        font-weight: 700;
        cursor: pointer;
      }
      #${reviewPanelId} .close-btn {
        background: #f1f3fb;
        color: #172957;
      }
      #${reviewPanelId} .confirm-btn {
        background: #1f3268;
        color: #ffffff;
      }
    `;
    document.head.appendChild(style);
  }

  function createInlineReviewPanel() {
    if (document.getElementById(reviewPanelId)) {
      return;
    }

    const panel = document.createElement('div');
    panel.id = reviewPanelId;
    panel.style.display = 'none';
    panel.innerHTML = `
      <div class="panel-card">
        <h2>Review & Fill</h2>
        <div class="panel-info">Confirm the values below, then click Confirm & Fill. The extension will not submit the form.</div>
        <div id="janmitra-preview-list"></div>
        <div class="panel-actions">
          <button class="close-btn" id="janmitra-close-panel">Close</button>
          <button class="confirm-btn" id="janmitra-confirm-fill">Confirm & Fill</button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    panel.querySelector('#janmitra-close-panel').addEventListener('click', () => {
      panel.style.display = 'none';
    });
    panel.querySelector('#janmitra-confirm-fill').addEventListener('click', async () => {
      const fillResults = fillJanMitraForm();
      panel.style.display = 'none';
      updateStatus();
      showFillCompleteMessage(fillResults);
    });
  }

  function showFillCompleteMessage(results) {
    const filledCount = results.filter((item) => item.status === 'filled').length;
    const message = document.createElement('div');
    message.textContent = `✓ ${filledCount} field(s) filled successfully. Please review before submitting.`;
    message.style.position = 'fixed';
    message.style.bottom = '24px';
    message.style.left = '24px';
    message.style.padding = '14px 18px';
    message.style.background = '#eaf1fb';
    message.style.color = '#172957';
    message.style.borderRadius = '14px';
    message.style.boxShadow = '0 16px 30px rgba(17, 28, 64, 0.16)';
    message.style.zIndex = '2147483648';
    document.body.appendChild(message);
    setTimeout(() => {
      message.remove();
    }, 4200);
  }

  function renderInlinePreview() {
    const previewContainer = document.getElementById('janmitra-preview-list');
    if (!previewContainer) {
      return;
    }

    const preview = getJanMitraFormPreview();
    previewContainer.innerHTML = '';
    preview.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'review-item';
      row.innerHTML = `
        <div class="label">${item.label}</div>
        <div class="value">${item.value}</div>
      `;
      previewContainer.appendChild(row);
    });
  }

  function showInlineReviewPanel() {
    if (!currentStatus || !currentStatus.supported) {
      return;
    }
    renderInlinePreview();
    const panel = document.getElementById(reviewPanelId);
    if (panel) {
      panel.style.display = 'grid';
    }
  }

  function updateStatus() {
    currentStatus = detectJanMitraTestForm();
    if (currentStatus.supported) {
      createFloatingAssistant(currentStatus.totalFields);
      createInlineReviewPanel();
    }
  }

  function handleRuntimeMessage(message, sender, sendResponse) {
    if (!message || typeof message.type !== 'string') {
      return;
    }

    switch (message.type) {
      case 'CHECK_FORM_STATUS':
        updateStatus();
        sendResponse({ supported: currentStatus?.supported || false, totalFields: currentStatus?.totalFields || 0, missingFields: currentStatus?.missingFields || [] });
        break;
      case 'REQUEST_FORM_PREVIEW':
        sendResponse({ preview: getJanMitraFormPreview(), supported: currentStatus?.supported || false, missingFields: currentStatus?.missingFields || [] });
        break;
      case 'FILL_FORM': {
        const fillResults = fillJanMitraForm();
        sendResponse({ results: fillResults });
        break;
      }
      default:
        break;
    }
  }

  addInlineStyles();
  updateStatus();
  chrome.runtime.onMessage.addListener(handleRuntimeMessage);
})();
