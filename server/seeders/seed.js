const db = require("../config/connection");
const { User, Review } = require("../models");
// const userSeeds = require("./userSeeds.json");
// const reviewSeeds = require("./reviewSeeds.json");
const userSeeds = [
  {
    name: "Brian Kernighan",
    email: "bkernighan@techfriends.dev",
    password: "password01",
  },
];

const reviewSeeds = [
  {
    latitude: -31.9523,
    longitude: 115.8613,
    title: "Safe place",
    comment:
      "One of the most wholesome films I have seen in a while. Profound at times and yet light hearted; smartly structured and yet sweetly wandering. A recommended watch in these bored and depressed quarantine days, because its hard to imagine anyone not finding some joy in this film.",
    stars: 2,
  },
  {
    latitude: 18.0178,
    longitude: -76.8099,
    title: "Jamaica Beautiful place",
    comment:
      "One of the most wholesome films I have seen in a while. Profound at times and yet light hearted; smartly structured and yet sweetly wandering. A recommended watch in these bored and depressed quarantine days, because its hard to imagine anyone not finding some joy in this film.",
    stars: 3,
  },
];

db.once("open", async () => {
  try {
    await Review.deleteMany({});
    await User.deleteMany({});

    const user = new User({
      name: "Brian Kernighan",
      email: "bkernighan@techfriends.dev",
      password: "password01",
    });

    await user.save();

    // const dbReviews = reviewSeeds.map(async (review) => {
    //   await Review.create(review);
    // });

    // userSeeds.map(async (user) => {
    //   user.reviews = dbReviews.map((r) => r._id);
    //   await User.create(user);
    // });

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

// db.once("open", async () => {
//   try {
//     await Review.deleteMany({});
//     await Review.create(reviewSeeds);

//     console.log("all done!");
//     process.exit(0);
//   } catch (err) {
//     throw err;
//   }
// });
