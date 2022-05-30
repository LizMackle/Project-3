const db = require("../config/connection");
const { User, Review } = require("../models");
const seedUser = require("./userSeeds.json");
const seedReview = require("./reviewSeeds.json");

db.once("open", async () => {
  try {
    // cleaning database
    await Review.deleteMany({});
    await User.deleteMany({});

    const user = new User({
      username: "Brian Kernighan",
      email: "bkernighan@techfriends.dev",
      password: "password01",
    });

    await user.save();

    const test = seedReview.map((r) => {
      r.reviewAuthorId = user._id;

      return r;
    });

    await Review.insertMany(test);

    console.log("all done!🌱");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
