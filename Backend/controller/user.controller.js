import { uploadOnCloudinary } from "../cloudinary.js";
import { generateAccessToken } from "../jwtToke.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { promises as fs } from 'fs'; // for using promise-based fs methods

const Signup = async (req, res) => {
  try {
    const { FirstName, LastName, email, password, ConfirmPassword } =
      req.body;
    if (password === "" || ConfirmPassword === "")
      return res.status(400).json({ message: "Enter password" });

    if (email === "")
      return res.status(400).json({ message: "Email required" });

    if (FirstName === "")
      return res.status(400).json({ message: "FirstName required" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user Already Exists" });

    if (password !== ConfirmPassword)
      return res.status(400).json({ message: "Password mismatch" });


    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //handle File upload
    let avatarUrl = null
    if(req.file){
      const avatarresponseFromCloudinary = await uploadOnCloudinary(req.file.path)
      console.log(avatarresponseFromCloudinary);
      avatarUrl = avatarresponseFromCloudinary?.url
      console.log(req.file);
      
      // unlinking the file after upload
      fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
        } else {
            console.log("File deleted successfully");
        }
    });
      
    }

    const newUser = new User({
      FirstName,
      LastName,
      email,
      password:hashedPassword,
      ConfirmPassword:hashedPassword,
      avatar:avatarUrl
    })
    await newUser.save()
    const savedUser = await User.findOne({email:email})   //get the current user using which we will create jwt token
    if(!savedUser) return res.status(400).json({"message":"User not found after saving"})
    //create JWT token
    const token = generateAccessToken(savedUser._id)
    console.log(`token : ${token}`  );
    

    //setting token in headers to access in frontend
    res.setHeader('Authorization',`${token}`)

    res.setHeader('X-FirstName' , `${FirstName}`)

    //get the name of the created user
    const name = await User.findOne({email}).FirstName
    
    return res.status(200).send({ message: "user created",
      User: newUser ,
      JWT : token,
      UserName : name});
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "")
      return res.status(400).json({ message: "Email can't be empty" });
    if (password === "")
      return res.status(400).json({ message: "Password can't be empty" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "user with given credentials doesn't exist" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ messgae: "password mismatch" });
    //generate JWT
    const token = generateAccessToken(user._id);
    //send token in headers
    res.setHeader('Authorization',`${token}`)
    const name= await user.FirstName
    return res.status(200).send({ "message": "login sucessfull",token,name });
  } catch (error) {
    console.log(error);
  }
};

export { Signup, login };
