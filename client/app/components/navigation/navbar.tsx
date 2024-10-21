import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "../UI/ThemeSwitcher";
import { useTheme } from "../../context/themeContext";
import ProfileDropdown from "./ProfileDropdown"; // Import ProfileDropdown

interface User {
  userId: string;
  userName: string;
  userPfp: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8001/user", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav
      className={`h-12 w-full outline outline-1 outline-gray-300 flex ${
        theme === "dark" ? " text-white outline-gray-600" : ""
      }`}
    >
      <ThemeSwitcher />
      <div className="flex h-full w-full justify-between items-center">
        <Link href="/">
          <div className="flex flex-row items-center gap-2 w-fit">
            <div
              className={`${
                theme === "dark" ? "darkthemcolor" : "lightthemecolor"
              }`}
            >
              <Image
                className="ml-3"
                src="/pencil-icon.png"
                width={35}
                height={30}
                alt="icon"
              />
            </div>
            <div>
              <p
                className={`cursor-pointer text-xs ${
                  theme === "dark" ? "" : "text-[#4A90E2]"
                }`}
              >
                Wordly
              </p>
            </div>
          </div>
        </Link>

        <div className="text-sm text-gray-500 w-fit min-w-40 flex gap-7 items-center justify-end mr-6">
          <Link
            href="/articles"
            className={`text-xs ${
              pathname.includes("article")
                ? "text-[#2D5B92] underline underline-offset-4"
                : ""
            }`}
          >
            <p className="cursor-pointer">Read</p>
          </Link>

          <Link
            href="/write"
            className={`text-xs ${
              pathname.includes("write")
                ? "text-[#2D5B92] underline underline-offset-4"
                : ""
            }`}
          >
            <p className="cursor-pointer">Write</p>
          </Link>

          {user ? (
            <div className="cursor-pointer rounded-full">
              {/* Pass userId and userPfp to ProfileDropdown */}
              <ProfileDropdown
                imageUrl={user.userPfp}
                alt={"VM"}
                userId={user.userId}
              />
            </div>
          ) : (
            <Link
              href="/login"
              className={`text-xs ${
                pathname.includes("login")
                  ? "text-[#2D5B92] underline underline-offset-4"
                  : ""
              }`}
            >
              <p className="cursor-pointer">Log In</p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
