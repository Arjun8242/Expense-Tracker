import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { API_PATHS} from "../../utils/apipaths";
import upload from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); 

    let profileImageUrl = "";

    if (!fullName) {
      setError("Full name is required");
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    setError("");

    try{

      if(profilePic){
        const imgUploadRes = await upload(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
       
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
    });
    const { user } = response.data;
const token = user.token;

    if(token){
      sessionStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
    }
  }
  catch(error){
    if(error.response && error.response.data.message){
      setError(error.response.data.message);
    }else{
      setError("Something went wrong. Please try again later.");
  };
  }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email address"
              placeholder="Enter your email"
              type="text"
            />

            <div className="md:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

         <button
  type="submit"
  disabled={loading} // disables while loading
  className={`w-full py-2 px-4 mt-4 bg-green-500 text-white font-semibold rounded-lg shadow-md 
    hover:bg-green-600 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
    ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
>
  {loading ? "Signing Up..." : "SIGN UP"}  {/* shows loading text */}
</button>


          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p> 
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
