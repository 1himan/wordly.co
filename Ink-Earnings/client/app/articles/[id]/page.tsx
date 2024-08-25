"use client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import "@blocknote/mantine/style.css";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import Editor from "@/app/components/editor";
import Navbar from "@/app/components/navbar";

export default function Page() {
  const { id } = useParams();
  const router = useRouter(); // Initialize useRouter
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`http://localhost:8001/articles/${id}`, { signal })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setBlocks(data.content);
      })
      .catch((error) => {
        console.error("This is the Phrikin Error:", error);
      });

    return () => {
      controller.abort(); // Cancel the fetch request
    };
  }, [id]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handlePublish = async () => {
    try {
      const response = await fetch(`http://localhost:8001/articles/${id}`, {
        method: "PUT",
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
      setIsEditable(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8001/articles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Redirect to the /articles page after successful deletion
      router.push("/articles");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div
        //  border-b-2 border-b-gray-100 border-t-2 border-t-gray-100
        className="my-2 mx-2 py-2"
      >
        <div className="flex justify-between items-center bg-slate-00 mx-3">
          <p className="text-xs text-gray-500">Written By: Himanshu</p>
          <div>
            <div className="flex gap-4">
              {!isEditable && (
                <button onClick={handleEditClick}>
                  <p className="flex gap-1 cursor-pointer text-green-900 rounded-md text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                    Edit
                  </p>
                </button>
              )}
              {!isEditable && (
                <button onClick={handleDelete}>
                  <p className="flex gap-1 cursor-pointer text-red-600 rounded-md text-xs">
                    Delete
                  </p>
                </button>
              )}
            </div>

            {isEditable && (
              <button onClick={handlePublish}>
                <p className="cursor-pointer bg-[#50E3C2] px-2 py-1 text-white rounded-sm text-xs">
                  Done
                </p>
              </button>
            )}
          </div>
        </div>
      </div>

      <Editor isEditable={isEditable} content={blocks} setBlocks={setBlocks} />
    </div>
  );
}
