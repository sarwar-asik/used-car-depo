import { getAuth } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../firebase/AuthProvider";
import app from "../../firebase/Firebase.config";
import useToken from "../../hooks/useToken";

const Login = () => {
  const auth = getAuth(app);
  const { googleSignIn, user, login, gitSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const handleShow = () => {
    setShow(!show);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // for jwt ////
  const [tokenEmail,setTokenEmail] =useState('')
  const [token]=useToken(tokenEmail)
  if(token){
    return navigate(from, { replace: true });
  }



  const submitLogin = (data) => {
    const email = data.email;
    const password = data.password;
    const usertype = data.user;
    const user = { email, password, usertype };
    // console.log(user);
    login(email, password)
      .then((result) => {
        toast("success login ");
        setError("");
        setTokenEmail(email)
        // console.log(result.user);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
    setError("")
  };
  return (
    <div className="max-w-md mx-auto my-5 rounded">
      <h1 className="text-3xl my-3 text-center"> Log In please </h1>
      <form onSubmit={handleSubmit(submitLogin)} className="">
        {/* <Header /> */}

        <div className="form-control w-full ">
          <label className="label">
            <span className="text-xl font-semi-bold">Your Email</span>
          </label>
          <input
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Provide correct email",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
          />
          {errors.email && (
            <p className="text-red-400 text-sm" role="alert">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="text-xl font-semi-bold">Your Password</span>
            <span>
              {" "}
              {show ? (
                <HiEyeOff onClick={handleShow} />
              ) : (
                <HiEye onClick={handleShow} />
              )}
            </span>
          </label>
          <input
            {...register("password", {
              required: "Please provide correct password",
              minLength: {
                value: 6,
                message: "Password must be 6 character",
              },
            })}
            type={show ? "password" : "text"}
            placeholder="type password"
            className="input input-bordered w-full"
          />
          <label className="label">
            {errors.password && (
              <p className="text-red-400 text-sm" role="alert">
                {errors.password?.message}
              </p>
            )}
          </label>
        </div>

        <select
          {...register("user", { required: true })}
          className="w-full py-3 my-2"
        >
          <option value="buyer">Buyers</option>
          <option value="seller">Seller</option>
        </select>

        <p className="text-xl text-red-500 mb-3"> {error}</p>

        <input
          type="submit"
          value="Log In"
          className="btn btn-active btn-primary w-full my-5"
        />
      </form>
      <p>
        Create an Account ?
        <Link to="/signup" className="text-primary">
          Please Sign up
        </Link>
      </p>
      <div className="divider">OR</div>

      <button onClick={googleSignIn} className="btn btn-outline btn-primary w-full text-lg ">
      <FaGoogle className="text-3xl mx-2"/>  Continue With Google
      </button>
      <button onClick={gitSignIn} className="btn btn-outline w-full text-lg mt-4">
      <FaGithub className="text-3xl mx-2"/>  Continue With GitHub
      </button>
    </div>
  );
};

export default Login;
