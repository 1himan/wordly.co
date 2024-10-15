"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import ReadingCards from "../components/ArticleCard";
import ExploreSkeleton from "../components/skeletons/articles";
import Swal from "sweetalert2";
import debounce from "lodash.debounce";
import { useTheme } from "../context/themeContext";

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
  const [data, setData] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    fetch("http://localhost:8001/articles")
      .then((response) => response.json())
      .then((data: Article[]) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });

    const articlePublished = localStorage.getItem("articlePublished");
    if (articlePublished) {
      Swal.fire({
        toast: true,
        position: "bottom-right",
        icon: "success",
        title: "Your article has been published.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: 580,
      });
      localStorage.removeItem("articlePublished");
    }
  }, []);

  const fetchResults = async (query: string) => {
    const response = await fetch(`http://localhost:8001/search?q=${query}`);
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  const debouncedFetchResults = debounce(fetchResults, 300);

  useEffect(() => {
    if (query.length > 0) {
      debouncedFetchResults(query);
    } else {
      fetch("http://localhost:8001/articles")
        .then((response) => response.json())
        .then((data: Article[]) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [query]);

  if (loading) {
    return <ExploreSkeleton />;
  }

  // Define styles based on the theme
  const textFieldStyles = {
    borderRadius: "50px", // Rounded corners for pill effect
    "& .MuiInputLabel-root": {
      color: theme === "dark" ? "white" : "default", // Label color based on the theme
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme === "dark" ? "white" : "default", // Label color when focused
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px", // Ensure the border-radius applies to the input container
      "& fieldset": {
        borderColor: theme === "dark" ? "white" : "default", // Border color based on the theme
      },
      "&:hover fieldset": {
        borderColor: theme === "dark" ? "white" : "default", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: theme === "dark" ? "white" : "default", // Border color when focused
      },
      "& .MuiInputBase-input": {
        color: theme === "dark" ? "white" : "default", // Text color based on the theme
      },
      "& .MuiInputBase-input::placeholder": {
        color: theme === "dark" ? "white" : "default", // Placeholder color based on the theme
      },
    },
  };

  return (
    <main className="w-[100vw] h-[93vh] bg-slate-00 overflow-hidden">
      <div className="h-fit md:w-full mt-2 flex flex-col lg:flex-row bg-slate-00">
        <div className="lg:h-[100vh] h-full lg:border-r-2 lg:border-e-gray-200 bg-gray-00 p-4 lg:w-[40%] mt-2 mx-3">
          <div>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Search"
              placeholder="Search articles..."
              multiline
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={textFieldStyles}
            />
          </div>
        </div>
        <div className="lg:w-[60%] px-2 bg-slate-00 lg:border-r-2 lg:border-e-gray-200">
          <div className="w-full h-[90vh] flex-col overflow-y-auto pb-16 lg:pb-0 bg-slate-0 flex items-center">
            <p className="text-center mb-4 mx-24 text-gray-600 text-lg">
              Search Results
            </p>
            {data.map((item) => (
              <ReadingCards
                key={item.id}
                imageUrl={item.imageUrl || ""}
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
        <div className="bg-slate-00 2xl:w-[50%] xl:w-[30%] hidden lg-xl:w-[40%] xl:block">
          <p className="text-center mb-4 mx-24 text-gray-600 text-lg">
            Recommended
          </p>
        </div>
      </div>
    </main>
  );
}
