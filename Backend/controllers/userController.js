const { jwtAuthMiddleware, generateToken } = require("../middlewares/roleMiddleware");
const userModel=require("../models/user");

const bcrypt=require("bcrypt");

//Register a user
const registerUser=async(req,res)=>{
    console.log(req.body);
const {name,age,email,mobile,address,adharcardnumber,password,role}=req.body;

if (!name || !age || !email || !adharcardnumber || !mobile || !address || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  
try {
    const user=await userModel.userByGmail(email);
    if(user) return res.status(400).send('User already exists');
    //Only single admin allowed
    if(role==="admin"){
       const admins=await userModel.countRole("admin");
       if(admins>=1) {
        return res.status(500).json({message:"Only one admin is allowed!"});
       }
    }
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);

    //Creating User and inserting in database by the help of createUser function
    const newUser=await userModel.createUser(name,age,email,mobile,address,adharcardnumber,hashPassword,role);

    //Generating token not storing
    const payload={
        email:newUser.email,
        id:newUser.id,
        role:newUser.role
    }
    console.log("The payload is",payload);
    
    const token=generateToken(payload);
    console.log("The Token generated is:",token);

    res.status(201).json({message:"User created sucessfully",token:token});
} catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).send('Internal Server Error');
}
}

//login user
const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await userModel.userByGmail(email);
        console.log("Retriev user",user);
        
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
        const user=await userModel.userrId(userId);
        if(!user) res.status(404).send('User not exists');
        const isMatch=await userModel.comparePass(currentPass,user.password);
        if(!isMatch) res.status(201).send('Password is wrong!');
        else{
            const salt=await  bcrypt.genSalt(10);
            const hashPassword=await  bcrypt.hash(newPass,salt);
            await userModel.updatePass(hashPassword,userId);
            res.status(200).json({message:"Password Saved sucessfull"});
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports={
    registerUser,
    loginUser,
    updatePass,
    userProfile
};