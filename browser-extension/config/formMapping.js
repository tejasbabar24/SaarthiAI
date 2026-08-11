const JANMITRA_FORM_MAPPING = {
  fullName: {
    selectors: ['#fullName', '#firstname'],
    label: 'Full Name'
  },
  dob: {
    selectors: ['#dob', 'input[name="dob"]', 'input[type="date"]'],
    label: 'Date of Birth'
  },
  gender: {
    selectors: ['#gender', 'select[name="gender"]'],
    label: 'Gender'
  },
  mobile: {
    selectors: ['#mobile', 'input[name="mobile"]', 'input[name="phone"]'],
    label: 'Mobile Number'
  },
  aadhaar: {
    selectors: ['#aadhaar', 'input[name="aadhaar"]'],
    label: 'Aadhaar Number'
  },
  address: {
    selectors: ['#address', 'textarea[name="address"]', 'input[name="address"]'],
    label: 'Address'
  },
  district: {
    selectors: ['#district', 'input[name="district"]'],
    label: 'District'
  },
  state: {
    selectors: ['#state', 'input[name="state"]'],
    label: 'State'
  },
  pinCode: {
    selectors: ['#pinCode', 'input[name="pinCode"]', 'input[name="pincode"]'],
    label: 'PIN Code'
  },
  annualIncome: {
    selectors: ['#annualIncome', 'input[name="annualIncome"]', 'input[name="income"]'],
    label: 'Annual Family Income'
  }
};

const JANMITRA_RAW_DATA = {
  fullName: 'Tejas Babar',
  dob: '12/06/2005',
  gender: 'Male',
  mobile: '9876543210',
  aadhaar: '123456789012',
  address: 'Akurdi, Pune',
  district: 'Pune',
  state: 'Maharashtra',
  pinCode: '411035',
  annualIncome: '150000'
};
