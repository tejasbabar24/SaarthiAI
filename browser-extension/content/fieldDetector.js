/**
 * Detects the supported JanMitra test form by checking expected fields.
 * Returns an object with status and missing fields if any.
 */
function resolveFieldElement(field) {
  const selectors = Array.isArray(field.selectors) ? field.selectors : [field.selector];
  return selectors.map((selector) => document.querySelector(selector)).find((el) => el !== null) || null;
}

function resolveFieldSelector(field) {
  const selectors = Array.isArray(field.selectors) ? field.selectors : [field.selector];
  return selectors.find((selector) => document.querySelector(selector)) || selectors[0];
}

function detectJanMitraTestForm() {
  const detectedFields = [];
  const missingFields = [];
  const mappingKeys = Object.keys(JANMITRA_FORM_MAPPING);

  mappingKeys.forEach((key) => {
    const field = JANMITRA_FORM_MAPPING[key];
    const element = resolveFieldElement(field);
    if (element) {
      detectedFields.push({ key, selector: field.selectors || field.selector, element });
    } else {
      missingFields.push({ key, selector: field.selectors || field.selector });
    }
  });

  return {
    supported: detectedFields.length === mappingKeys.length,
    detectedFields,
    missingFields,
    totalFields: mappingKeys.length
  };
}

function getJanMitraFormPreview() {
  const preview = [];
  const mappingKeys = Object.keys(JANMITRA_FORM_MAPPING);

  mappingKeys.forEach((key) => {
    const field = JANMITRA_FORM_MAPPING[key];
    preview.push({
      label: field.label,
      value: JANMITRA_RAW_DATA[key] || '',
      key,
      selector: resolveFieldSelector(field)
    });
  });

  return preview;
}
