import React,{useState} from 'react'

const UpdatePassword = () => {
  //Add useState to store data in react
  const [currentPassword,setCurrentPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [errorMessage,setErrorMessage]=useState("");
  const [successMessage,setSuccesMessage]=useState("");
  
 
  const handlePasswordUpdate=async (e)=>{
   e.preventDefault();

   if(newPassword!==confirmPassword){
    alert("New password and confirm password don't match!")
   }
   
   try {
    const response= await fetch("/profile/password",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({currentPassword,newPassword}),
    })
      if(response.ok){
        setSuccesMessage("Password changed sucessfully")
        setErrorMessage("")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")

      }else{
        const data=await response.json();
        setErrorMessage(data.message||"Failed to update password!");
      }
   } catch (error) {
    console.error("Error in handlePasswordUpdate fuction!",error.message);
   }

  }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Update Password
            </h1>
            {errorMessage && (
              <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-sm mb-4">{successMessage}</p>
            )}
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="w-full p-3 border rounded-md shadow-inner outline-none"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="w-full p-3 border rounded-md shadow-inner "
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-600 mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full p-3 border rounded-md shadow-inner "
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md shadow hover:bg-blue-600"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      );
    };
    
export default UpdatePassword;
