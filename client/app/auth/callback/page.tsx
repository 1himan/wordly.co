"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Redirect to the desired page
      router.push("/");
    }
  }, [router]);

  return <div>Loading...</div>;
};

export default Callback;
