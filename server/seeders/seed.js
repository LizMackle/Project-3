const db = require("../config/connection");
const { User, Review } = require("../models");
const seedUser = require("./userSeeds.json");
const seedReview = require("./reviewSeeds.json");

db.once("open", async () => {
  try {
    // cleaning database
    await Review.deleteMany({});
    await User.deleteMany({});

    // bulk create each model
    await User.insertMany(seedUser);
    await Review.insertMany(seedReview);

    console.log("all done!🌱");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
