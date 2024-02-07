const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const Item = require('../models/items')
const cloudinary = require("../utils/clodinary")
const saltRounds = 10
const faker = require('faker')




const adminSignup = async (req, res) => {
    try {
      const { userName, email, password,role } = req.body;
      const existingUser = await User.findOne({ email: email });
  
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      if (!password || typeof password !== 'string') {
  return res.status(400).json({ error: "Invalid password" });
}

  
      const newUser = new User({
        userName: userName,
        email: email,
        password: hashedPassword,
        role,
      });
      await newUser.save();
  
       // Create a transporter using your Gmail account
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });
  
      // Define the email options
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: `${newUser.email}`,
        subject: "Hello from Schoolie",
        text: "Thank you for signing up with us as an Admin.",
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      
      const expirationTime = process.env.expires_In;
      const payload = {
        userId: user._id,
      };
      

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: expirationTime }
        );
        
      return res.status(201).json({ message: "User created" });
    } catch (err) {
      console.error("User creation error:", err); 
      return res
        .status(500)
        .json({ error: "Something went wrong creating a user" });
        
    }
  };
  


  const adminLogin = async (req, res) => {
    try {
      const { userName, password } = req.body;
      const user = await User.findOne({ userName: userName });
      if (!user) {
       return res.status(404).json({ message: "user not found" });
      }
      if(user.role !== "admin") {
        return  res.status(403).json({ message: "You are not Authorized" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Incorrect Password" });
      }
      const expirationTime = process.env.expires_In;
      const payload = {
        userId: user._id,
      };
      
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: expirationTime }
        );
        // console.log(token)
        
      const dataInfo = {
        status: "success",
        message: "Admin Logged in successful",
        access_token: token,
      };
      return res.status(200).json(dataInfo);
    } catch (error) {
        return res
          .status(500)
          .json({ error: "Something went wrong logging in user" });
      }
    };
    
    const saveItem = async (req, res) => {
      try {
        const { userId } = req.user;
        const user = await User.findOne({ _id: userId });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        if (user.role !== "admin") {
          return res.status(403).json({ message: "You are not authorized to access this route" });
        }
    
        const { name,Amount, location,image} = req.body;
        console.log(req.body);
        
        const result = await cloudinary.uploader.upload(req.file.path);

        const newItem = new Item({
        name:name,
        Amount:Amount,
        location:location,
        image: result.secure_url,
    });
    
        
        const savedItem = await newItem.save();
    
        res.status(201).json({ message: 'Item saved successfully', Item: savedItem });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save the item' });
      }
    };




    const fake = async (num) => {
      try {
        // Generate fake items
        const fakeItems = fake(50);
        for (let i = 0; i<num; i++) {
          const fakeItem = {
            name: faker.name.productName(),
            description: faker.lorem.sentence(2),
            amount: faker.random.number({ min: 1, max: 100000 }),
            createdAt: faker.date.past(),
          };
          fakeItems.push(fakeItem);
        }
    
        // Insert the fake items into the MongoDB collection
        const items = await Item.insertMany(fakeItems);
        res.json(items);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error generating fake items');
      }
    };
    
    
    
// // Define a route to get paginated items
// const fetch = async (req, res) => {
//   const page = parseInt(req.query.page) ||1; // Current page
//   const perPage = 5; // Number of items per page

//   console.log('Requested Page:', page);
  
//   try {
//     const items = await Item.find()
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .exec();

//     res.json(items);
//     console.log('Items:', items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };



const fetch = async (req,res) => {
  const page = parseInt(req.query.page) ||1; // Current page
  const perPage = 5; 
  try {
    const totalItems = await Item.countDocuments()
    
    const items = await Item.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

      res.json(items);
      console.log('Total Items:', totalItems);
      console.log('Items Returned:', items.length);
      

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

    module.exports = { adminSignup, adminLogin, saveItem, fetch, fake};
