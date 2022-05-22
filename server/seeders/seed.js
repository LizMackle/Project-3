const db = require("../config/connection");
const { User, Review } = require("../models");
const seedUser = require("./userSeeds.json");
const seedReview = require("./reviewSeeds.json");

db.once("open", async () => {
  try {
    await Review.deleteMany({});
    await User.deleteMany({});

    await User.create(seedUser);

    for (let index = 0; index < seedReview; index++) {
      const { _id, reviewAuthor } = await Review.create[seedReview[index]];
      const name = await User.findByIdAndUpdate(
        { name: reviewAuthor },
        {
          $addToSet: {
            reviews: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!🌱");
  process.exit(0);
});
