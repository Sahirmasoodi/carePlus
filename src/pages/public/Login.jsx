import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { addUserData, isLoggedIn } from "../../../store/slices/userSlice";
import loginImg from "../../assets/assets_frontend/mainLogin.png";
import { loginUser, signupUser } from "../../store/slices/auth/auth.thunk";
import { usePopup } from "../../components/PopupMessage/PopupContext";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    defaultValues: {
      email: "sahir.maasoodi@gmail.com",
      password: "Sahir@123",
    },
  });
  const { popMessage } = usePopup();
  const [isSignin, setIsSignin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state?.common?.auth);

  useEffect(() => {
    if (user?.role == "admin") {
      navigate("/admin/dashboard");
    }
    if (user?.role == "patient") {
      navigate("/patient/home");
    }
    if (user?.role == "doctor") {
      navigate("/doc-home");
    }
  }, [user, navigate]);

  async function handleForm(data) {
    try {
      if (isSignin) {
        data.role = "patient";
        await dispatch(signupUser(data)).unwrap();
        popMessage("Signin successfull");
      } else {
        await dispatch(loginUser(data)).unwrap();
        popMessage("Login successfull");
      }
    } catch (error) {
      popMessage(error?.error || "Something went wrong");
    }
  }

  return (
    <div className=" h-[93vh] w-full flex flex-col md:flex-row items-center justify-center bg-[#EFF4FE] overflow-x-hidden">
      <div className="w-full md:w-1/2 flex justify-center px-4 py-10">
        <div className="w-full max-w-lg border border-gray-200 p-6 md:p-10 bg-[#EFF4FE] rounded-md shadow-sm">
          <form
            onSubmit={handleSubmit(handleForm)}
            className="flex flex-col gap-5 text-gray-500"
          >
            <div>
              <h1 className="text-3xl text-black">
                {isSignin ? "Signup" : "Login"}
              </h1>
              <p>
                {isSignin
                  ? "Please signup to book appointment"
                  : "Please login to book appointment"}
              </p>
            </div>

            {isSignin && (
              <div className="grid grid-cols-2 gap-x-2">
                <div className="flex flex-col col-span-1">
                  <div>
                    <label>First Name</label>
                    <strong className="text-red-600 ms-2">
                      {errors?.firstName?.message}
                    </strong>
                  </div>
                  <input
                    type="text"
                    className="h-10 ps-3 rounded-md border"
                    {...register("firstName", { required: "*" })}
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <div>
                    <label>Last Name</label>
                    <strong className="text-red-600 ms-2">
                      {errors?.lastName?.message}
                    </strong>
                  </div>
                  <input
                    type="text"
                    className="h-10 ps-3 rounded-md border"
                    {...register("lastName", { required: "*" })}
                  />
                </div>
              </div>
            )}
            {isSignin && (
              <div className="flex flex-col col-span-1">
                <div>
                  <label>Gender</label>
                  <strong className="text-red-600 ms-2">
                    {errors?.gender?.message}
                  </strong>
                </div>
                <select
                  className="h-10 ps-3 rounded-md border bg-white"
                  {...register("gender", { required: "*" })}
                >
                  <option disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            )}

            <div className="flex flex-col">
              <div>
                <label>Email</label>
                <strong className="text-red-600 ms-2">
                  {errors?.email?.message}
                </strong>
              </div>
              <input
                type="text"
                className="h-10 ps-3 rounded-md border"
                {...register("email", { required: "*" })}
              />
            </div>

            <div className="flex flex-col">
              <div>
                <label>Password</label>
                <strong className="text-red-600 ms-2">
                  {errors?.password?.message}
                </strong>
              </div>
              <input
                type="password"
                className="h-10 ps-3 rounded-md border"
                {...register("password", { required: "*" })}
              />
            </div>

            <button className="w-full py-2 border rounded-full hover:bg-primary hover:text-white transition">
              {isSignin ? "Signup" : "Login"}
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-5">
            <p className="text-sm text-gray-500">
              {isSignin ? "Already have an account?" : "Create account"}
            </p>
            <button
              className="text-primary font-semibold hover:underline"
              onClick={() => setIsSignin(!isSignin)}
            >
              {isSignin ? "Login" : "Signup"}
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE SECTION */}
      <div className="hidden md:flex w-1/2 h-[93vh] justify-center items-center">
        <img
          src={loginImg}
          alt="login"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
