const { response } = require("express");
const pool=require("../config/db");
const bcrypt = require('bcrypt');

//Add new user (hashed password)
const createUser= async(name,age,email,mobile,address,adharcardnumber,password,role)=>{
    try {
        
    const result=await pool.query("INSERT INTO users (name,age,email,mobile,address,adharcardnumber,password,role)  VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[name,age,email,mobile,address,adharcardnumber,password,role]);
    return result.rows[0];

    } catch (error) {
        throw error;
    } 
}

//find user by id
const userrId=async (id)=>{
try {
    const result=await pool.query("SELECT * FROM users WHERE id=$1",[id]);
    return result.rows[0];
} catch (error) {
    throw error;
}
}
//Update password
const updatePassword=async(id,newPass)=>{
try {
    const result=await pool.query("UPDATE users SET password=$1 WHERE id=$2 RETURING *",[newPass,id]);
    return result.rows[0];
} catch (error) {
    throw error;
}
}

//Find user by gmail
const userByGmail=async(email)=>{
    
    try {
        console.log('Searching for user with email:', email);
        const result=await pool.query("SELECT * FROM users WHERE email=$1",[email]);
        console.log('Storing result.rows', result.rows);
       return result.rows[0];
    }  catch (error) {
        console.error('Error querying database:', error);
        throw error;
      }
}

//Compare password with hash password

const comparePass= async (enteredPassword, storedPasswordHash) => {
    try {
     const isMatch =  await bcrypt.compare(enteredPassword, storedPasswordHash);
    return isMatch;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  };

const updateIsVoted=async(id)=>{
    try {
        const result=await pool.query("UPDATE users SET isvoted=true WHERE id=$1 RETURNING *",[id]);
        return result.rows[0];
    } catch (error) {
        
    }
}

const countRole=async(role)=>{
    try {
        const result=await pool.query("SELECT COUNT(*) FROM users WHERE role=$1",[role])
        return parseInt(result.rows[0].count,10)
    } catch (error) {
        console.error("The error in countRole try section",error);
        throw error;
    }
}
  

module.exports={
    createUser,
    userrId,
    userByGmail,
    comparePass,
    updatePassword,
    updateIsVoted,
    countRole
}