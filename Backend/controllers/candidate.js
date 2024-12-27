const candidateModel=require("../models/candidate");
const userModel=require("../models/user");
const express=require("express")

//check if user is admin
// const checkIsAdmin=async(email)=>{
//     try {
//         const user=await userModel.userByGmail(email);
//         if(user.role==="admin") return true;
//     } catch (error) {
//         return false;
//     }
  

// }


//Create a new candidate
const createCandidate=async(req,res)=>{
    // //only admin can create candidates
    // if(!await checkIsAdmin(req.user.email)){
    //     console.log("admin role not found");
    //     return res.status(403).json({message:"User doesn't have admin role"})
    // } else console.log("admin role found!");
    const {name,party,age}=req.body;
    try {
    const candidateExist=await candidateModel.candExist(name,party);
    if(candidateExist) return res.status(201).send("Candidate with same name and party already exist");
    const createCandi=await candidateModel.newCandidate(name,party,age);
    return res.status(201).send("Sucessfully created!");
    } catch (error) {
        console.log(error);
        return res.status(404).send("Invalid inteval!");
    }
}

const deleteCand=async(req,res)=>{
    const {id}=req.params;
    try {
        const user = await candidateModel.candByid(id);
        if (!user) return res.status(404).send("Candidate does not exist!");
    
        const deleted = await candidateModel.deleteId(id); // Pass id directly
        console.log("Deleting candidate with ID:", id);
        if (!deleted) return res.status(400).send("Failed to delete candidate!");
    return res.status(200).send("Deleted sucessfull!");
    } catch (error) {
        console.error("Error detecting while deleting:", error);
        return res.status(500).send("An error occurred while deleting the candidate.");
    }
}

const updateCandidate = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, party, age } = req.body;
  
      if (!id) return res.status(400).send("Candidate ID is required!");
      if (!name || !party || !age)
        return res.status(400).send("All fields (name, party, age) are required!");
  
      const user = await candidateModel.candByid(id);
      if (!user) return res.status(404).send("Candidate does not exist!");
  
      const result = await candidateModel.updateCand(id, name, party, age);
      if (!result) return res.status(400).send("Failed to update candidate!");
  
      return res.status(200).json({ message: "Updated successfully!", data: result });
    } catch (error) {
      console.error("Error in updateCandidate:", error);
      return res.status(500).send("Internal Server Error");
    }
  };
  

const renderAllCandidate=async(req,res)=>{
const candidates=await candidateModel.showCandi();
console.log("Render all candi",candidates);

if(!candidates) return res.status(404).send("There are no candidates!");
res.status(200).json({
    message:"Render sucessfull",
    data:candidates
});
}


module.exports={
    renderAllCandidate,
    updateCandidate,
    deleteCand,
    createCandidate,
}