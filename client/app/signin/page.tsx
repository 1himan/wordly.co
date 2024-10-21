"use client";
import SignInForm from "../components/forms/SignInForm";
import Link from "next/link";
import { Merriweather } from "next/font/google";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const merriweather = Merriweather({ weight: ["400"], subsets: ["latin"] });

const SignInPage = () => {
  return (
    <div className="w-[100vw] h-[80vh] flex flex-col bg-slate-00  justify-center items-center">
      <div className="flex flex-col items-center bg-slate-00 p-4 px-7 outline outline-1 outline-gray-300 rounded-md justify-center">
        <p className={`text-gray-600 md:text-2xl text-xl my-9`}>
          Ready to Join Us
        </p>
        <SignInForm />
        <hr className="w-[80%] my-4" />
        <div className="md:h-full flex justify-center items-center ">
          <div
            className={`font-semibold flex flex-row justify-center items-center bg-slate-00 h-fit w-full `}
          >
            <div className=" text-gray-600 text-center">Not New Here? -</div>
            &nbsp;
            <Link href="/login" className="text-[#4A90E2]">
              Log In
              <KeyboardArrowRightIcon fontSize="small" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
