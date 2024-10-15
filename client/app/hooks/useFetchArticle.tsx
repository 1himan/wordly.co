//useFetchArticle.tsx
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";

// Define the User type
interface User {
  userId: string;
  username: string;
  // Add other properties as needed
}

// Define the Article type
interface Article {
  author: {
    _id: string;
    username: string;
  };
  content: any[];
  // Add other properties as needed
}

const useFetchArticle = (id: string) => {
  const [data, setData] = useState<Article | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser() as {
    user: User | null;
    setUser: (user: User | null) => void;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleResponse = await fetch(
          `http://localhost:8001/articles/${id}`
        );
        const articleData = await articleResponse.json();
        setData(articleData);
        setBlocks(articleData.content);

        const userResponse = await fetch("http://localhost:8001/user", {
          credentials: "include",
        });

        if (userResponse.status === 401 || userResponse.status === 403) {
          setUser(null);
        } else {
          const userData = await userResponse.json();
          setUser(userData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setUser]);
  return { data, blocks, setBlocks, loading, user };
};

export default useFetchArticle;
