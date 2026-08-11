/**
 * Fill form fields using the mapping and sample data.
 * Fires input and change events to emulate user interaction.
 */
function resolveFieldElement(field) {
  const selectors = Array.isArray(field.selectors) ? field.selectors : [field.selector];
  return selectors.map((selector) => document.querySelector(selector)).find((el) => el !== null) || null;
}

function fillJanMitraForm() {
  const results = [];
  const mappingKeys = Object.keys(JANMITRA_FORM_MAPPING);

  mappingKeys.forEach((key) => {
    const field = JANMITRA_FORM_MAPPING[key];
    const value = JANMITRA_RAW_DATA[key] || '';
    const element = resolveFieldElement(field);
    const selector = Array.isArray(field.selectors) ? field.selectors.join(', ') : field.selector;

    if (!element) {
      results.push({ key, selector, status: 'missing' });
      return;
    }

    try {
      element.focus();
      element.value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.classList.add('janmitra-filled');
      results.push({ key, selector, status: 'filled' });
    } catch (error) {
      results.push({ key, selector, status: 'error', message: error.message });
    }
  });

  return results;
}
