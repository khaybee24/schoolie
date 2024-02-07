const mongoose = require("mongoose");
const User = require("./models/user.models");
const bcrypt = require("bcrypt");

const connect = async (req, res) => {
  try {
    await mongoose.connect(
      process.env.MONGO,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};
connect();

(async () => {
  const data = [
    {
      firstName: "Kemisola",
      lastName: "Doe",
      email: "dommy@gmail.com",
      password: "1234567",
      phoneNumber: "09070195672",
    },
    // Remove extra curly brace here
    {
      firstName: "John",
      lastName: "Doe",
      email: "doe@gmail.com",
      password: "1234567",
      phoneNumber: "09070895072",
      role: "admin",
    },
  ];

  const saltRounds = 10;

  // Use a loop to hash passwords for all data objects
  for (const userData of data) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
    console.log(userData.password);
  }

  // seed
  const seedDatabase = async () => {
    try {
      await User.deleteMany({});
      await User.insertMany(data);
      console.log("Seeding success");
    } catch (error) {
      console.log(error);
    } finally {
      mongoose.connection.close();
    }
  };

  seedDatabase();
})();