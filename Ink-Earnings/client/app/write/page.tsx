"use client";
import { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import Navbar from "../components/navbar";
import Editor from "../components/editor";

export default function Page() {
  const [blocks, setBlocks] = useState<any>([]);

  const handlePublish = async () => {
    try {
      const response = await fetch("http://localhost:8001/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blocks }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center h-12 border-b-2 border-b-gray-300 my-1 bg-slate-00 mx-7">
        <p className="text-xs text-gray-500">In Draft: Himanshu</p>
        <button onClick={handlePublish}>
          <p className="cursor-pointer bg-[#50E3C2] px-2 py-1 text-white rounded-sm text-xs">
            Publish
          </p>
        </button>
      </div>
      {/* this is my editor component */}
      <Editor setBlocks={setBlocks} />
    </>
  );
}
