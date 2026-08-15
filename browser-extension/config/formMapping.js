const JANMITRA_FORM_MAPPING = {
  firstName: {
    selectors: ['input[formcontrolname="firstName"]', 'input[name="firstName"]', 'input[autocomplete="given-name"]'],
    label: 'First Name'
  },
  lastName: {
    selectors: ['input[formcontrolname="lastName"]', 'input[name="lastName"]', 'input[autocomplete="family-name"]'],
    label: 'Last Name'
  },
  annualIncome: {
    selectors: ['input[formcontrolname="annualIncome"]', 'input[name="annualIncome"]', 'input[type="number"][min="0"]', 'input[placeholder="e.g. 250000"]'],
    label: 'Annual Family Income'
  },
  gender: {
    selectors: ['select[formcontrolname="gender"]', 'select[name="gender"]', 'select[aria-label="Gender"]'],
    label: 'Gender',
    options: {
      male: ['Male', 'GENDER.MALE', 'M'],
      female: ['Female', 'GENDER.FEMALE', 'F']
    }
  },
  mobile: {
    selectors: ['input[type="tel"]', 'input.intl-num', 'input[autocomplete="tel-national"]', 'input[formcontrolname="mobile"]', 'input[name="mobile"]', 'input[name="phone"]'],
    label: 'Mobile Number'
  },
  category: {
    selectors: ['select[formcontrolname="category"]', 'select[name="category"]'],
    label: 'Social Category',
    options: {
      general: ['General', 'SOCIAL_CATEGORY.GENERAL'],
      sc: ['SC', 'SOCIAL_CATEGORY.SC'],
      st: ['ST', 'SOCIAL_CATEGORY.ST'],
      obc: ['OBC', 'SOCIAL_CATEGORY.OBC'],
      ews: ['EWS', 'SOCIAL_CATEGORY.EWS'],
      other: ['Other', 'SOCIAL_CATEGORY.OTHER']
    }
  },
  numberOfSiblings: {
    selectors: ['input[formcontrolname="numberOfSiblings"]', 'input[name="numberOfSiblings"]', 'input[placeholder="e.g. 2"]', 'input[type="number"][max="20"]'],
    label: 'Number of Siblings'
  }
};

const JANMITRA_RAW_DATA = {
  firstName: 'Tejas',
  lastName: 'Babar',
  annualIncome: '150000',
  gender: 'Male',
  mobile: '9876543210',
  category: 'General',
  numberOfSiblings: '2'
};
