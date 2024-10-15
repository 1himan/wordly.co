"use client";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/app/components/editor";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ArticleActions from "@/app/components/ArticleActions";
import useFetchArticle from "@/app/hooks/useFetchArticle";
import { useUser } from "@/app/context/UserContext";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Avatar,
} from "@mui/material";
import Image from "next/image";

// Define the User type
interface User {
  userId: string;
  username: string;
}

// Define the Article type
interface Article {
  author: {
    _id: string;
    username: string;
  };
}

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  // Ensure id is a string
  const articleId = Array.isArray(id) ? id[0] : id;

  const { data, blocks, setBlocks, loading } = useFetchArticle(articleId);
  const { user } = useUser() as { user: User };
  const [isEditable, setIsEditable] = useState(false);
  const [comment, setComment] = useState("");

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handlePublish = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/articles/${articleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blocks }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsEditable(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/articles/${articleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      router.push("/articles");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Submit comment logic
  const handleCommentSubmit = async () => {
    if (!comment) return;

    try {
      // what is fetch? explain its syntax as well.
      const response = await fetch(
        `http://localhost:8001/articles/${articleId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment, userId: user.userId }), // Include user ID
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      setComment(""); // Clear the comment input after successful submission
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return <p>Article not found</p>;
  }

  const isAuthor = user && data && user.userId === data.author._id;

  return (
    <div className="overflow-x-hidden">
      <div className="my-2 mx-4 py-2 border-b-2 border-b-gray-300">
        <div className="flex justify-between items-center bg-slate-00 mx-3">
          <p className="text-xs text-gray-500">
            Written By: {data.author.username}
          </p>
          {user && isAuthor && (
            <ArticleActions
              isEditable={isEditable}
              handleEditClick={handleEditClick}
              handleDelete={handleDelete}
              handlePublish={handlePublish}
            />
          )}
        </div>
      </div>
      <Editor isEditable={isEditable} content={blocks} setBlocks={setBlocks} />
      <div className="w-full flex justify-center">
        <div className="flex px-7 justify-start bg-slate-00 text-center gap-5 border-t border-b border-gray-400 py-3 xl:w-[65%] lg:w-[70%] md:w-[80%] w-[100%] ">
          <div className="flex gap-2">
            <Image
              src="/message.svg"
              alt="comments"
              width={23}
              height={30}
              className=""
            />
            <p className="text-gray-500">{data.commentCount}</p>
          </div>
          <div className="flex">
            <Image
              src="/like.svg"
              alt="like"
              width={23}
              height={40}
              className="mb-[2px]"
            />
            <p className="ml-1 text-gray-500">{data.likeCount}</p>
          </div>
        </div>
      </div>

      {/* Comment input and submission */}
      <div className="w-full flex justify-center ">
        <FormControl
          sx={{ m: 1 }}
          variant="outlined"
          className="flex flex-col gap-4  xl:w-[65%] lg:w-[70%] md:w-[80%] w-[100%]"
        >
          <OutlinedInput
            multiline
            id="outlined-adornment-comment"
            startAdornment={
              <InputAdornment position="start" className="">
                <Avatar />
              </InputAdornment>
            }
            placeholder="Leave a comment"
            className="w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            id="outlined-adornment-comment"
            className="w-full text-sm h-12"
            variant="outlined"
            onClick={handleCommentSubmit}
            sx={{
              color: "#4b5563",
              borderColor: "#d1d5db",
              backgroundColor: "#e5e7eb",
              "&:hover": {
                color: "#4b5563",
                borderColor: "#d1d5db",
                backgroundColor: "#d1d5db",
              },
            }}
          >
            Post
          </Button>
        </FormControl>
      </div>

      {/* Render comments */}
      <div className="comments-section px-0 lg:px-20 xl:px-56 mt-6">
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        {data.comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          data.comments.map((comment, index) => (
            <div
              key={index}
              className="comment-item bg-gray-100 p-4 rounded-lg mb-2"
            >
              <p className="font-semibold">
                {comment.user?.username || "Anonymous"}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(comment.date).toLocaleDateString()}
              </p>
              <p className="mt-2">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}