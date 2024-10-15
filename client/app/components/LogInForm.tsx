import { useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2"; // Import SweetAlert2
import SocialMediaLink from "./SocialMediaLink";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Logged in successfully",
          html: `
            <button onclick="window.location.href='/articles'" class="swal2-confirm swal2-styled">Explore Articles</button>
            <button onclick="window.location.href='/write'" class="swal2-confirm swal2-styled">Write Article</button>
          `,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Please try again.",
      });
    }
  };

  const handleGoogleLogin = () => {
    //This URL is expected to be an endpoint on the server that handles Google authentication.
    //when the user clicks on google icon (login via google) a window is opened requesting google at the following URL 
    window.open("http://localhost:8001/auth/google", "_self");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          className="w-[90vw] sm:w-72 mb-4"
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          className="w-[90vw] sm:w-72 mb-4"
        />
      </div>
      <button
        type="submit"
        className="font-semibold md:w-[50%] align-middle select-none md:text-xs text-[16px] text-center uppercase disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-4 bg-gradient-to-tr from-[#4a91e2] to-[#92b6e2] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] rounded-md transition-all duration-300"
      >
        Log In
      </button>
      <div className="text-gray-600 my-4 font-medium">Or Continue With:</div>
      <div className="flex space-x-4">
        {/* Login via google */}
        <SocialMediaLink handleClick={handleGoogleLogin} socialMedia="google" />
        {/* rest of the code */}
        {/* Login via github */}
        <SocialMediaLink handleClick={handleGoogleLogin} socialMedia="github" />
        {/* Login via linkedin */}
        <SocialMediaLink
          handleClick={handleGoogleLogin}
          socialMedia="linkedin"
        />
      </div>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LogInForm;
