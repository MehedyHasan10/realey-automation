const path = require("path");

const listingData = {

location: {
  addressSearchText: "a",
  expectedPropertyName:
  "Arndale Shopping Centre Access, Kilkenny",
},

details: {
  propertyType: "House",
  bedrooms: 3,
  bathrooms: 2,
  carSpaces: 1,
  landSize: "",
  buildingSize: "",
  yearBuilt: "",
},

  pricing: {
    listingType: "Offers",
    priceGuide: "50000",
  },

  description: {
    headline: "Modern Family Home in Prime Location",

    propertyDescription: [
      "Beautiful and spacious family home located in a highly desirable area.",
      "The property offers modern interiors, comfortable living spaces,",
      "excellent natural light, and convenient access to local amenities.",
      "This listing was created through Playwright automation testing.",
    ].join(" "),

    keyFeatures: [
      "Fireplace",
      "Air Conditioning",
      "Dishwasher",
      "Built-in Wardrobes",
      "Floorboards",
      "Garden",
      "Balcony",
      "Garage",
      "Swimming Pool",
    ],
  },

  media: {
    propertyPhotos: [
      path.resolve(
        process.cwd(),
        "test-assets/listing/property-1.jpg"
      ),

      path.resolve(
        process.cwd(),
        "test-assets/listing/property-2.jpg"
      ),
    ],

    floorPlan: path.resolve(
      process.cwd(),
      "test-assets/listing/floor-plan.jpg"
    ),
  },

  expected: {
    successMessage:
      /listing published|published successfully|listing created|success/i,

    successUrl:
      /listing|listings|dashboard|property/i,
  },
};

module.exports = {
  listingData,
};