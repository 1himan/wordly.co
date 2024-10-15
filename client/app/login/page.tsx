//login route inside of next.js application's app router 
//login/page.tsx
"use client";
import LogInForm from "../components/LogInForm";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Merriweather } from "next/font/google";
const merriweather = Merriweather({ weight: ["400"], subsets: ["latin"] });

const Page = () => {
  return (
    <div className="w-[100vw] h-[80vh] flex flex-col bg-slate-00  justify-center items-center">
      <div className="flex flex-col items-center bg-slate-00 p-4 outline outline-1 outline-gray-300 rounded-md justify-center">
        <p className={`text-gray-600 md:text-3xl text-xl my-9`}>Welcome Back</p>
        <LogInForm />
        <hr className="w-[80%] my-4" />
        <div className="md:h-full flex justify-center items-center ">
          <div
            className={`font-semibold flex flex-row justify-center items-center bg-slate-00 h-fit w-full `}
          >
            <div className=" text-gray-600 text-center">
              New to our Platform -
            </div>
            &nbsp;
            <Link href="/signin" className="text-[#4A90E2]">
              Sign In
              <KeyboardArrowRightIcon fontSize="small" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
