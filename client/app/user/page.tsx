"use client";
import React, { useEffect, useState } from "react";

interface UserInfo {
  username: string;
  email: string;
}

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8001/userinfo", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data: UserInfo = await response.json();
          setUserInfo(data);
          console.log("User Info:", data);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>User Information</h1>
      {userInfo ? (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserInfo;
