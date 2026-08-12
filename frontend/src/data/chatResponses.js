// All chat responses are predefined locally. No API calls.

export const sampleQueries = [
  { label: "Find schemes for me", icon: "search", query: "What schemes am I eligible for?" },
  { label: "Check eligibility", icon: "check-circle", query: "Am I eligible for Post Matric Scholarship?" },
  { label: "Missing documents", icon: "file-warning", query: "What documents am I missing?" },
  { label: "How to apply", icon: "clipboard-list", query: "How do I apply for PM Kisan?" },
  { label: "Find service center", icon: "map-pin", query: "Where is the nearest Setu Kendra?" },
  { label: "Scholarship for daughter", icon: "graduation-cap", query: "माझ्या मुलीसाठी कोणत्या scholarship उपलब्ध आहेत?" },
];

export const chatResponses = {
  // Default fallback
  default: {
    type: "text",
    message: "I can help you discover government schemes, check eligibility, find documents, and guide you through applications. Please ask me a specific question or choose from the quick options below.",
  },

  greet: {
    type: "text",
    message: "Namaste! 🙏 I am Sarthi AI, your digital citizen assistant. I'm here to help you find government schemes you may be eligible for, guide you through documents, and assist with applications. How can I help you today?",
  },

  schemes_general: {
    type: "schemes",
    message: "Based on your profile (Age: 22, Male, SC category, Annual Income: ₹2.4 lakh, Maharashtra), I found **4 highly matching schemes** for you:",
    schemes: [
      { id: 2, name: "Post Matric Scholarship", match: 88, category: "Education" },
      { id: 9, name: "PM Jan Dhan Yojana", match: 95, category: "Social Welfare" },
      { id: 5, name: "Ayushman Bharat PM-JAY", match: 85, category: "Health" },
      { id: 8, name: "National Apprenticeship Training Scheme", match: 78, category: "Employment" },
    ],
  },

  scholarship_daughter: {
    type: "schemes",
    message: "मी 4 scholarship योजना शोधल्या ज्या तुमच्या profile शी जुळतात. (I found 4 schemes that may match your profile.)",
    schemes: [
      { id: 1, name: "Savitribai Phule Scholarship", match: 92, category: "Education" },
      { id: 2, name: "Post Matric Scholarship", match: 88, category: "Education" },
      { id: 7, name: "Beti Bachao Beti Padhao", match: 65, category: "Women & Child" },
      { id: 12, name: "PM Free Silai Machine Yojana", match: 55, category: "Women & Child" },
    ],
  },

  eligibility_postmatric: {
    type: "eligibility",
    message: "Great news! Based on your profile, you appear **eligible** for the Post Matric Scholarship. Here's a quick check:",
    checks: [
      { label: "Age (15-30 years)", passed: true, value: "22 years ✓" },
      { label: "Category (SC/ST/OBC)", passed: true, value: "SC ✓" },
      { label: "Annual Income (< ₹2.5L)", passed: true, value: "₹2.4L ✓" },
      { label: "Education (10th Pass)", passed: true, value: "B.E. 3rd Year ✓" },
      { label: "Caste Certificate", passed: false, value: "⚠ Not uploaded yet" },
    ],
    suggestion: "You're 88% matched! Upload your Caste Certificate to complete your profile and apply.",
  },

  missing_docs: {
    type: "documents",
    message: "I checked your document profile. Here's the status:",
    verified: ["Aadhaar Card", "Income Certificate", "Domicile Certificate", "10th Marksheet", "Bank Passbook", "Passport Photo"],
    missing: ["Caste Certificate"],
    suggestion: "Your Caste Certificate is required for SC/ST/OBC scholarships. Visit your nearest Talathi office or Setu Kendra to obtain it.",
  },

  how_to_apply_pmkisan: {
    type: "steps",
    message: "Here's how to apply for **PM Kisan Samman Nidhi**:",
    steps: [
      "Visit pmkisan.gov.in or your nearest Common Service Centre (CSC)",
      "Click on 'Farmer Corner' and select 'New Farmer Registration'",
      "Enter your Aadhaar number and state",
      "Fill in your personal, bank, and land details",
      "Upload supporting documents (land record, Aadhaar, bank passbook)",
      "Submit the application. Benefit will be transferred to your bank account.",
    ],
    note: "You can also ask a Sarthi AI agent to assist you at a nearby CSC.",
  },

  nearest_center: {
    type: "locations",
    message: "Here are the nearest government service centers near Akurdi, Pune:",
    locations: [
      { name: "Gram Panchayat Office, Akurdi", distance: "0.8 km", type: "Gram Panchayat" },
      { name: "Talathi Office, Akurdi", distance: "1.2 km", type: "Talathi" },
      { name: "Maha e-Seva Kendra, Pimpri", distance: "2.8 km", type: "e-Seva Kendra" },
    ],
  },

  translate_marathi: {
    type: "text",
    message: "मी तुमच्यासाठी माहिती मराठीत भाषांतरित करतो:\n\n**Post Matric Scholarship** ही SC/ST/OBC समुदायातील 10वी नंतरच्या शिक्षणासाठी एक शिष्यवृत्ती आहे. वार्षिक ₹3,000 ते ₹12,000 आणि maintenance allowance दिला जातो. अर्ज nationalscholarships.gov.in वर करता येतो.",
  },

  hindi_help: {
    type: "text",
    message: "नमस्ते! मैं Sarthi AI आपकी मदद के लिए यहाँ हूँ। आप मुझसे पूछ सकते हैं:\n• कौन सी योजनाएं मेरे लिए उपलब्ध हैं?\n• Post Matric Scholarship के लिए पात्रता?\n• कौन से दस्तावेज़ चाहिए?\n• आवेदन कैसे करें?",
  },
};

export const getResponse = (query) => {
  const q = query.toLowerCase().trim();

  if (q.match(/नमस्|hello|hi |namaste|good/)) return chatResponses.greet;
  if (q.match(/मुलीसाठी|daughter|girl|scholarship.*girl|girl.*scholarship/)) return chatResponses.scholarship_daughter;
  if (q.match(/eligible|eligib|पात्र|post matric.*eligible|eligible.*post/)) return chatResponses.eligibility_postmatric;
  if (q.match(/missing|document|कागदपत्र|दस्तावेज/)) return chatResponses.missing_docs;
  if (q.match(/pm kisan|किसान.*apply|apply.*kisan|how.*apply.*kisan/)) return chatResponses.how_to_apply_pmkisan;
  if (q.match(/apply|अर्ज.*कसा|how.*apply/)) return chatResponses.how_to_apply_pmkisan;
  if (q.match(/center|centre|office|सेवा केंद्र|setu|seva/)) return chatResponses.nearest_center;
  if (q.match(/translate|english|marathi|मराठी/)) return chatResponses.translate_marathi;
  if (q.match(/hindi|हिन्दी|help/)) return chatResponses.hindi_help;
  if (q.match(/scheme|benefit|योजन|find|what.*eligib|eligible.*scheme|which scheme/)) return chatResponses.schemes_general;

  return chatResponses.default;
};
