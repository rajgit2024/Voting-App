const { jwtAuthMiddleware, generateToken } = require("../middlewares/roleMiddleware");
const userModel=require("../models/user");
const pool=require("../config/db");
const bcrypt=require("bcrypt");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

//Register a user
const registerUser = async (req, res) => {
    const { name, age, email, mobile, address, adharcardnumber, password, role } = req.body;

    if (!name || !age || !email || !adharcardnumber || !mobile || !address || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await userModel.userByGmail(email);
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        if (role === "admin") {
            const admins = await userModel.countRole("admin");
            if (admins >= 1) {
                return res.status(500).json({ message: "Only one admin is allowed!" });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.createUser(name, age, email, mobile, address, adharcardnumber, hashPassword, role);

        sendVerificationEmail(newUser);

        return res.status(201).json({ 
            message: "User created successfully. Please check your email to verify your account."
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).send('Internal Server Error');
    }
};


//login user
const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await userModel.userByGmail(email);
        console.log("Retriev user",user);
        if(!user.is_verified){
            console.log(`Verify your email to login`);
            return res.status(500).json({message:"Email is not verified!"})
        } 
        
        if(!user){
          return res.status(404).send("User not found")
        } 
        const isMatch=await userModel.comparePass(password,user.password);
        console.log('Password match:', isMatch);
        if (!isMatch) return res.status(401).send("Password not match!");

        const payload={
            email:user.email,
            id:user.id,
            role:user.role
        }
        console.log("The given payload is",payload);
        
       const token=generateToken(payload);
       console.log("The Login token is",token);
       return res.status(200).json({message:"Login Sucessfull",token:token});
        } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send('Internal Server Error');
    }
   
}


const userProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from JWT payload

        // Fetch user details from the database
        const user = await userModel.userrId(userId);
        if (!user) {
            return res.status(404).json({ message: 'User does not exist.' });
        }

        const { name, age, email, mobile, address, adharcardnumber, role } = user;

        return res.status(200).json({
            name,
            age,
            email,
            mobile,
            address,
            adharcardnumber,
            role,
        });
    } catch (error) {
        console.error('Error in userProfile:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


//Upgrade password
const updatePass=async(req,res)=>{
    const {userId,currentPass,newPass}=req.body;
    try {
        console.log("Request received:", { userId, currentPass, newPass });
        const user=await userModel.userrId(userId);
        if(!user) res.status(404).send('User not exists');
        const isMatch=await userModel.comparePass(currentPass,user.password);
        console.error("Current password is incorrect for user ID:", userId);
        if(!isMatch) res.status(201).send('Password is wrong!');
        else{
            const salt=await  bcrypt.genSalt(10);
            
            const hashPassword=await  bcrypt.hash(newPass,salt);
            await userModel.updatePassword(hashPassword,userId);
            console.log("Password updated successfully for user ID:", userId);
            res.status(200).json({message:"Password Saved sucessfull"});
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

// Image Upload Function
const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user is authenticated
    const imageUrl = req.file.filename;

    // Update user profile with the new image filename
    await pool.query('UPDATE users SET profile_image = $1 WHERE id = $2', [imageUrl, userId]);

    res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (error) {
    console.error('Error while uploading image:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports={
    registerUser,
    loginUser,
    updatePass,
    userProfile,
    uploadProfileImage,
};