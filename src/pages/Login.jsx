import Navbar from "../components/shared/Navbar";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../authentications/providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FacebookAuthProvider } from "firebase/auth";

function SubmitButton() {
  return (
    <button
      type="submit"
      className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-sky-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-sky-600 focus:bg-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none"
    >
      <span>Login</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.04c0-.79-.07-1.54-.18-2.29H12v4.35h6.35a5.86 5.86 0 0 1-2.53 3.86v3.2
h4.05c2.38-2.19 3.75-5.42 3.75-9.12z"
      />
      <path
        fill="#34A853"
        d="M12 21c3.38 0 6.22-1.12 8.27-3.04l-4.05-3.2c-1.13.76-2.58 1.21-4.22 1.21-3.24 0
-6.01-2.18-7.01-5.12H.94v3.2A11.98 11.98 0 0 0 12 21z"
      />
      <path
        fill="#FBBC05"
        d="M5.99 14.25c-.24-.68-.37-1.41-.37-2.15s.13-1.47.37-2.15V6.75H1.94A11.94 11.94 0
 0 0 0 12c0 1.92.45 3.74 1.94 5.25l4.05-3.24z"
      />
      <path
        fill="#FF5E55"
        d="M12 5.25c1.77 0 3.36.61 4.61 1.92l3.45-3.45C18.23 1.19 15.38 0 12 0 7.99 0 4.39
 2.34 2.37 5.75l4.05 3.24c1-.62 2.76-1.74 5.58-1.74z"
      />
    </svg>
  );
}

function FbIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="fill-current border rounded-full p-1"
    >
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
    </svg>
  );
}

const Login = () => {
  const { login, googleSignIn, facebookSignIn, setFbpic } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    const { email, password } = data;
    login(email, password)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully Logged in!",
          icon: "success",
        });
        navigate("/dashboard");
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Email/Password!",
        })
      );
  };

  const handleGoogleLogIn = () => {
    // console.log("clicked");
    googleSignIn()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully Logged in!",
          icon: "success",
        });
        navigate("/dashboard");
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Email/Password!",
        })
      );
  };

  const handleFacebookLogIn = () => {
    // console.log("clicked");
    facebookSignIn()
      .then((res) => {
        console.log(res);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(res);
        const accessToken = credential.accessToken;
        fetch(
          `https://graph.facebook.com/${res.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
        )
          .then((response) => response.blob())
          .then((blob) => {
            setFbpic(URL.createObjectURL(blob));
          })
          .catch((err) => console.log(err));

        navigate("/");
      })
      .catch((err) => alert(err));
  }

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <main className="bg-slate-100 min-h-screen">
      <Navbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center space-y-4  overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 max-w-lg pt-5 px-5 mx-auto mt-20"
      >
        <header className="mb-4 text-center">
          <h3 className="text-xl font-medium text-slate-700">Login Form</h3>
        </header>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          type="email"
          placeholder="Your Email"
          {...register("email", { required: true })}
          className="border-2 rounded-lg px-2 text-sm font-light py-2"
        />
        {errors.email && (
          <span className="text-sm text-red-300 font-light">
            Email is required
          </span>
        )}
        <input
          type="password"
          placeholder="Your Password"
          {...register("password", { required: true, minLength: 6 })}
          className="border-2 rounded-lg px-2 text-sm font-light py-2"
        />
        {errors.password && (
          <span className="text-sm text-red-300 font-light">
            Password must be greater than 6 characters
          </span>
        )}

        <div className="flex justify-end pb-6 ">
          <SubmitButton></SubmitButton>
        </div>
      </form>
      <h2 className="text-center mt-3">OR</h2>
      <div className="flex bg-white w-64 mx-auto rounded mt-3 justify-center items-center gap-2 border-2 bg-base-100 shadow-xl">
        <GoogleIcon></GoogleIcon>
        <button
          className="rounded-xl text-xl font-semibold"
          onClick={handleGoogleLogIn}
        >
          Login with Google
        </button>
      </div>
      <h2 className="text-center mt-3">OR</h2>
      <div className="flex bg-white w-64 mx-auto rounded mt-3 justify-center items-center gap-2 border-2 bg-base-100 shadow-xl">
        <FbIcon></FbIcon>
        <button
          className="rounded-xl text-xl font-semibold"
          onClick={handleFacebookLogIn}
        >
          Login with Facebook
        </button>
      </div>
    </main>
  );
};

export default Login;
