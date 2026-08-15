/**
 * Fill form fields using the mapping and sample data.
 * Fires input and change events to emulate user interaction.
 */
function resolveFieldElement(field) {
  const selectors = Array.isArray(field.selectors) ? field.selectors : [field.selector];
  return selectors.map((selector) => document.querySelector(selector)).find((el) => el !== null) || null;
}

function findMatchingSelectValue(element, value, optionMap) {
  if (!element || element.tagName !== 'SELECT') {
    return value;
  }

  const options = Array.from(element.options);

  if (optionMap) {
    for (const values of Object.values(optionMap)) {
      if (Array.isArray(values) && values.includes(value)) {
        const matchedOption = options.find((option) => values.includes(option.value) || values.includes(option.textContent.trim()));
        if (matchedOption) {
          return matchedOption.value;
        }
      }
    }
  }

  const exactMatch = options.find((option) => option.value === value || option.textContent.trim() === value);
  if (exactMatch) {
    return exactMatch.value;
  }

  return value;
}

function fillJanMitraForm() {
  const results = [];
  const mappingKeys = L\bject.keys(JANMITRA_FORM_MAPPING);

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

      if (element.tagName === 'SELECT') {
        const selectedValue = findMatchingSelectValue(element, value, field.options);
        element.value = selectedValue;
      } else {
        element.value = value;
      }

      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.dispatchEvent(new Event('blur', { bubbles: true }));
      element.classList.add('janmitra-filled');
      results.push({ key, selector, status: 'filled', value: element.value });
    } catch (error) {
      results.push({ key, selector, status: 'error', message: error.message });
    }
  });

  return results;
}
