const candidateModel = require("../models/candidate");
const userModel = require("../models/user");
const { insertVote, hasVoted } = require("../models/vote");

//For perform voting operation
const vote = async (req, res) => {
    const { userId, candidateId } = req.body;
    try {
        // Check if user exists and is a voter
        const isVoter = await userModel.userrId(userId);
        console.log("Voter Info:", isVoter);
        if (!isVoter || isVoter.role !== "voter") {
            return res.status(401).json({ message: "User has no voting rights!" });
        }

        // Check if user has already voted
        const userVoted = await hasVoted(userId);
        if (userVoted) {
            return res.status(409).json({ message: "User has already voted!" });
        }

        // Update vote count for the candidate
        const updateCount = await candidateModel.IncrementVotes(candidateId);
        if (!updateCount) {
            return res.status(500).json({ message: "Error updating vote count." });
        }

        // Insert vote into the votes table
        const insertVoteResult = await insertVote(userId, candidateId);
        if (!insertVoteResult) {
            return res.status(500).json({ message: "Error inserting vote record." });
        }

        // Mark user as having voted
        const updateIsVoted = await userModel.updateIsVoted(userId);
        if (!updateIsVoted) {
            return res.status(500).json({ message: "Error updating user's voting status." });
        }

        return res.status(200).json({
            message: "Voted successfully",
            candidate: updateCount,
            user: updateIsVoted,
            vote: insertVoteResult,
        });
    } catch (error) {
        console.error("Error during voting operation:", error);
        return res.status(500).json({ error: "An error occurred while processing your vote." });
    }
};


module.exports= {
    vote,
}