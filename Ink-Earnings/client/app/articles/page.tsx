"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import TextField from "@mui/material/TextField";
import ReadingCards from "../components/Reading-Cards";
import ExploreSkeleton from "../components/skeletons/explore";

// Define the type for your article data
interface Article {
  imageUrl?: string;
  heading: string;
  description: string;
  date: string;
  likeCount: number;
  commentsCount: number;
  id: string;
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Article[]>([]); // Use the Article type for the state

  useEffect(() => {
    fetch("http://localhost:8001/articles")
      .then((response) => response.json())
      .then((data: Article[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <ExploreSkeleton />
      </div>
    );
  }

  return (
    <main className="w-[99vw] h-[100vh] overflow-hidden">
      <Navbar />

      <div className="w-[99vw] mt-2 flex flex-col lg:flex-row bg-slate-00 lg:w-[85%] h-[90%]">
        <div className="h-full lg:border-e-gray-100 lg:border-r-2 p-4 lg:w-[30%] mt-2 mx-3">
          <div>
            <TextField
              className="rounded-md"
              fullWidth
              id="outlined-textarea"
              label="Search"
              placeholder="Placeholder"
              multiline
              color="info"
            />
          </div>
        </div>
        <div className="lg:w-[70%] my-2 px-2">
          <div className="w-full h-[90vh] flex-col overflow-y-auto pb-16 lg:pb-0">
            {data.map((item) => (
              // I want the imageUrl to be passed conditionally - it should be neccesary
              //if it exists then good but if it doesnt then good as well how can I do that?
              <ReadingCards
                key={item.id}
                imageUrl={item.imageUrl}
                heading={item.heading}
                description={item.description}
                date={item.date}
                likeCount={item.likeCount}
                commentsCount={item.commentsCount}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
