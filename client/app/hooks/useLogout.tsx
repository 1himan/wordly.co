import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8001/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        Cookies.remove("token");
        router.push("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return logout;
};

export default useLogout;
