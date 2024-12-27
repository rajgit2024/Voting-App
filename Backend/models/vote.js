const pool=require("../config/db")

// const checkVoted=async(userId,candidateId)=>{
//     try {
//         const result=await pool.query("SELECT * FROM votes WHERE user_id=$1 AND candidate_id=$2",[userId,candidateId]);
//         return result.rows.length>0;
//     } catch (error) {
//         console.error("Error in checkVoted:", error.message);
//         throw error;
//     }
    
// }

//Check user voter by their id
const hasVoted=async(userId)=>{
    try {
        const result = await pool.query('SELECT * FROM votes WHERE user_id = $1', [userId]);
        return result.rows.length>0 //return true if exist
    } catch (error) {
        console.log("Error in isUserVoted",error);
        throw error;
    }
    
}

const insertVote=async(user_id,candidate_id)=>{
    try {
    const result=await pool.query(`INSERT INTO votes(user_id,candidate_id,vote_time) VALUES($1,$2,NOW()) RETURNING *`,[user_id,candidate_id]);
    console.log("Error while inserting votes",result);
    return result.rows[0];
    } catch (error) {
      throw error;
    }
}

module.exports={
 
    insertVote,
    hasVoted
}
