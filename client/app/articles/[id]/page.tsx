"use client";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/app/components/articles/editor";
import LoadingSpinner from "@/app/components/UI/LoadingSpinner";
import ArticleActions from "@/app/components/articles/ArticleActions";
import useFetchArticle from "@/app/hooks/useFetchArticle";
import { useUser } from "@/app/context/UserContext";
import "@blocknote/mantine/style.css";
import { useState, useEffect } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Avatar,
} from "@mui/material";
import Image from "next/image";

// Define types for Article and Comment
interface Comment {
  writer: {
    username: string;
  };
  content: string;
  date: string;
}

interface Article {
  author: {
    _id: string;
    username: string;
  };
}

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const articleId = Array.isArray(id) ? id[0] : id;
  const { data, blocks, setBlocks, loading } = useFetchArticle(articleId);
  const { user } = useUser();
  const [isEditable, setIsEditable] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const handleEditClick = () => setIsEditable(true);

  const handlePublish = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/articles/${articleId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blocks }),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      setIsEditable(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/articles/${articleId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      router.push("/articles");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment) return;
    try {
      const response = await fetch(
        `http://localhost:8001/articles/${articleId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment, writerId: user?.userId }),
        }
      );
      if (!response.ok) throw new Error("Failed to submit comment");
      const { comment: newComment } = await response.json();
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const response = await fetch(
          `http://localhost:8001/articles/${articleId}/comments`
        );
        if (!response.ok) throw new Error("Failed to fetch comments");
        const { comments } = await response.json();
        setComments(comments);
        setLoadingComments(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [articleId]);

  if (loading) return <LoadingSpinner />;
  if (!data) return <p>Article not found</p>;

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
        <div className="flex px-7 justify-start bg-slate-00 text-center gap-5 border-t border-b border-gray-400 py-3 xl:w-[65%] lg:w-[70%] md:w-[80%] w-[100%]">
          <div className="flex gap-2">
            <Image
              src="/icons/message.svg"
              alt="comments"
              width={23}
              height={40}
            />
            {/* Fixed: commentCount exists on data */}
            <p className="text-gray-500">{data.commentCount}</p>
          </div>
          <div className="flex">
            <Image src="/icons/like.svg" alt="like" width={23} height={40} />
            {/* Fixed: likeCount exists on data */}
            <p className="ml-1 text-gray-500">{data.likeCount}</p>
          </div>
        </div>
      </div>
      {/* Comment input and submission */}
      <div className="w-full flex justify-center">
        <FormControl
          sx={{ m: 1 }}
          variant="outlined"
          className="flex flex-col gap-4 xl:w-[65%] lg:w-[70%] md:w-[80%] w-[100%]"
        >
          <OutlinedInput
            multiline
            id="outlined-adornment-comment"
            startAdornment={
              <InputAdornment position="start">
                <Avatar />
              </InputAdornment>
            }
            placeholder="Leave a comment"
            className="w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
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
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={index}
              className="comment-item bg-gray-100 p-4 rounded-lg mb-2"
            >
              <p className="font-semibold">
                {comment.writer?.username || "Anonymous"}
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
