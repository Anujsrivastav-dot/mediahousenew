const { check, oneOf } = require("express-validator/check");

var checkEmail = [
  check("emailId", "EmailId is required").exists(),
  check("emailId", "Invalid email address").isEmail()
],

  //=========================================//
  firstName = [
    check("firstName", "firstName is required")
      .exists()
      .not()
      .isEmpty()
      .withMessage("firstName cannot be empty")
  ],
  middleName = [
    check("middleName", "middleName is required")
      .exists()
      .not()
      .isEmpty()
      .withMessage("middleName cannot be empty")
  ],
  lastName = [check("lastName", "lastName is required").exists()],
  mobileNumber = [
    check("mobileNumber", "MobileNumber is required")
      .exists()
      .not()
      .isEmpty()
      .withMessage("mobileNumber cannot be empty")
  ],
  country = [check("country", "country is required").exists()],
  state = [check("state", "state is required").exists()],
  designationName = [
    check("designationName", "designationName is required").exists()
  ],
  designationId = [
    check("designationId", "designationId is required").exists()
  ],
  benefitName = [check("benefitName", "benefitName is required").exists()],
  categoryName = [check("categoryName", "categoryName is required").exists()],
  uploadVideos = [check("uploadVideos", "uploadVideos is required").exists()],
  enquiryTitle = [check("enquiryTitle", "enquiryTitle is required").exists()],
  resumeDetails = [check("resumeDetails", "Resume Details is required").exists()],
  enquiryDescription = [check("enquiryDescription", "enquiryDescription is required").exists()],
  storyCategoryName = [
    check("storyCategoryName", "storyCategoryName is required").exists()
  ],
  storyTypeName = [
    check("storyTypeName", "storyTypeName is required").exists()
  ],
  storyKeywordName = [
    check("storyKeywordName", "storyKeywordName is required").exists()
  ],
  city = [check("city", "city is required").exists()],
  pinCode = [check("pinCode", "pinCode is required").exists()],
  langCode = [check("langCode", "langCode is required").exists()],
  shortBio = [check("shortBio", "shortBio is required").exists()],
  password = [
    check("password", "Password is required")
      .exists()
      .not()
      .isEmpty()
      .withMessage("password cannot be empty")
  ],
  areaOfInterests = [
    check("areaOfInterest", "areaOfInterest is required")
      .exists()
      .not()
      .isEmpty()
      .withMessage("areaOfInterest cannot be empty")
  ],
  targetAudience = [
    check("targetAudience", "targetAudience is required")
      .exists()
      .not()
      .isEmpty()
      .withMessage("targetAudience cannot be empty")
  ],
  resumeDetail = [check("resumeDetail", "resumeDetail is required").exists()],
  facebookLink = [check("facebookLink", "facebookLink is required").exists()],
  twitterLink = [check("twitterLink", "twitterLink is required").exists()],
  linkedinLink = [check("linkedinLink", "linkedinLink is required").exists()],
  instagramLink = [
    check("instagramLink", "instagramLink is required").exists()
  ],
  youtubeLink = [check("youtubeLink", "youtubeLink is required").exists()],
  // prevWork = [
  //   check("previousWorks[0].title", "title is required")
  //     .exists()
  //     .not()
  //     .isEmpty()
  //     .withMessage("title cannot be empty"),
  //   check("previousWorks[0].link", "link is required")
  //     .exists()
  //     .not()
  //     .isEmpty()
  //     .withMessage("link cannot be empty")
  // ];

// refrences = [
//   check("refrences[0].firstName", "firstName is required")
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage("firstName cannot be empty"),
//   check("refrences[0].middleName", "middleName is required")
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage("middleName cannot be empty"),
//   check("refrences[0].lastName", "lastName is required")
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage("lastName cannot be empty"),
//   check("refrences[0].designation", "designation is required")
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage("designation cannot be empty"),
//   check("refrences[0].lastName", "lastName is required")
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage("lastName cannot be empty"),
//   check("refrences[0].mobileNumber", "mobileNumber is required")
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage("mobileNumber cannot be empty")
// ];
refrences =[check("refrences", "refrences is required").exists()];
stepCount =[check("stepCount", "stepCount is required").exists()];
prevWork =[check("previousWorks", "previousWorks is required").exists()];
platformBenefitId =[check("platformBenefits", "platformBenefits id is required").exists()];
platformSuggestion =[check("platformSuggestion", "platformSuggestion is required").exists()];
headLine = [check("headLine", "headLine is required").exists()];
journalistId = [check("journalistId", "journalistId is required").exists()];
price = [check("price", "price is required").exists()];
categoryId = [check("categoryId", "categoryId is required").exists()];
date = [check("date", "date is required").exists()];
keywordId = [check("keywordId", "keywordId is required").exists()];
briefDescription = [
  check("briefDescription", "briefDescription is required").exists()
];
var checkAdminEmail = [
  check("adminEmail", "EmailId is required").exists(),
  check("adminEmail", "Invalid email address").isEmail()
]
var validateObj = {};
validateObj.saveDataReq=[...firstName,...lastName,...middleName,...mobileNumber,...password,...checkEmail,...shortBio]
validateObj.designationReq = [...designationName];
validateObj.benefitReq = [...benefitName];
validateObj.categoryReq = [...categoryName];
validateObj.storyCategoryReq = [...storyCategoryName];
validateObj.storyTypeReq = [...storyTypeName];
validateObj.storyKeywordReq = [...storyKeywordName];

validateObj.journalistReq = [
  ...firstName,
  ...lastName,
  ...middleName,
  ...mobileNumber,
  ...checkEmail,
  ...shortBio,
  ...password,
  ...designationId,
  ...langCode,
  ...pinCode,
  ...country,
  ...state,
  ...city,
];
validateObj.professionalDetailsReq = [
  ...areaOfInterests,
  ...targetAudience,
  ...resumeDetail,
  ...journalistId,

];
validateObj.refrencesReq = [...refrences,...journalistId];
validateObj.previousWorksReq = [...prevWork,...journalistId];
validateObj.socialAccountLinksReq = [...facebookLink,...journalistId];
validateObj.platformBenefitReq = [...platformBenefitId,...journalistId,...platformSuggestion];

validateObj.postStoryReq = [...uploadVideos];
validateObj.jLoginReq = [...checkEmail, ...password];
validateObj.adminLoginReq = [...checkAdminEmail, ...password];
validateObj.enquiryReq = [...enquiryTitle, ...enquiryDescription];
validateObj.socioLinkReq = [...facebookLink, ...twitterLink, ...instagramLink, ...linkedinLink, ...youtubeLink];

// ==============================
//   validation for mobile api 
// ==============================
validateObj.personalReq = [
  ...firstName,
  ...lastName,
  ...middleName,
  ...mobileNumber,
  ...checkEmail,
  ...shortBio,
  ...password,
  ...designationId,
  ...langCode,
  ...pinCode,
  ...country,
  ...state,
  ...city,
  ...stepCount
];
validateObj.professionalDetails = [
              ...areaOfInterests,
              ...targetAudience,
              ...resumeDetails,
              ...journalistId,
              ...stepCount
            ];
validateObj.refrences = [...refrences,...journalistId,...stepCount];
validateObj.previousWorks = [...prevWork,...journalistId,...stepCount];
validateObj.socialAccountLinks = [...facebookLink,...journalistId,...stepCount];
validateObj.platformBenefit = [...platformBenefitId,...journalistId,...platformSuggestion,...stepCount];
validateObj.blog = [...headLine,...categoryId,...langCode,...country,...state,...city,...date,...keywordId,...journalistId,...stepCount];


module.exports = validateObj;