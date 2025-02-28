const candidateModel = require("../models/candidate");
const userModel = require("../models/user");
const { insertVote, hasVoted } = require("../models/vote");

const vote = async (req, res) => {
  const { userId, candidateId } = req.body;
  console.log("User detail",req.body);
  
  if (!userId || !candidateId) {
    return res.status(400).json({ message: "User ID or Candidate ID is missing." });
  }

  try {
    const isVoter = await userModel.userrId(userId);
    if (!isVoter || isVoter.role !== "voter") {
      return res.status(401).json({ message: "User has no voting rights!" });
    }

    const userVoted = await hasVoted(userId);
    if (userVoted) {
      return res.status(409).json({ message: "User has already voted!" });
    }

    const updateCount = await candidateModel.IncrementVotes(candidateId);
    if (!updateCount) {
      return res.status(500).json({ message: "Error updating vote count." });
    }

    const insertVoteResult = await insertVote(userId, candidateId);
    if (!insertVoteResult) {
      return res.status(500).json({ message: "Error inserting vote record." });
    }

    await userModel.updateIsVoted(userId);

    return res.status(200).json({ message: "Voted successfully" });
  } catch (error) {
    console.error("Error during voting operation:", error);
    return res.status(500).json({ error: "An error occurred while processing your vote." });
  }
};


module.exports = {
  vote,
};
