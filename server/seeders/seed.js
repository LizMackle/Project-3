// const db = require("../config/connection");
// const { User, Review } = require("../models");
// const { reviewSeeds, userSeeds } = require("../seeders");

// db.once("open", async () => {
//   try {
//     await User.deleteMany({});
//     await User.create(userSeeds);

//     console.log("all done!");
//     process.exit(0);
//   } catch (err) {
//     throw err;
//   }
// });

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
