import { useState } from "react";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2"; // Import SweetAlert2
import SocialMediaLink from "./SocialMediaLink";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const response = await fetch("http://localhost:8001/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    });

    const data = await response.json();
    console.log("This is the data returned from the server", data);

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Sign-In successful",
        html: `
          <button onclick="window.location.href='/articles'" class="swal2-confirm swal2-styled">Explore Articles</button>
          <button onclick="window.location.href='/write'" class="swal2-confirm swal2-styled">Write Article</button>
        `,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Sign-In Failed",
        text: data.message,
      });
    }
  };

  const handleGoogleSignIn = () => {
    window.open("http://localhost:8001/auth/google", "_self");
  };

  const handleGitHubSignIn = () => {
    window.open("http://localhost:8001/auth/github", "_self");
  };

  const handleLinkedInSignIn = () => {
    window.open("http://localhost:8001/auth/linkedin", "_self");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
      <div>
        <TextField
          id="username"
          label="User Name"
          variant="outlined"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          className="w-[90vw] sm:w-72"
        />
      </div>
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
          className="w-[90vw] sm:w-72"
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
          className="w-[90vw] sm:w-72"
        />
      </div>
      <div>
        <TextField
          id="confirm-password"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          className="w-[90vw] sm:w-72"
        />
      </div>
      <button
        type="submit"
        className="font-semibold md:w-[50%] align-middle select-none md:text-xs text-[16px] text-center uppercase disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-4 bg-gradient-to-tr from-[#4a91e2] to-[#92b6e2] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] rounded-md transition-all duration-300"
      >
        Sign In
      </button>
      <div className="text-gray-600 my-4 font-medium">Or Continue With:</div>
      <div className="flex space-x-4">
        <SocialMediaLink
          handleClick={handleGoogleSignIn}
          socialMedia="google"
        />
        <SocialMediaLink
          handleClick={handleGitHubSignIn}
          socialMedia="github"
        />
        <SocialMediaLink
          handleClick={handleLinkedInSignIn}
          socialMedia="linkedin"
        />
      </div>
    </form>
  );
};

export default SignInForm;
