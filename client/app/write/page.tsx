"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Editor from "../components/editor";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTheme } from "../context/themeContext";

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Why don't skeletons fight each other? They don't have the guts.",
  "What do you call fake spaghetti? An impasta!",
  "Why did the bicycle fall over? Because it was two-tired!",
  "What do you call cheese that isn't yours? Nacho cheese!",
  "Why can't you give Elsa a balloon? Because she will let it go!",
  "What do you get when you cross a snowman and a vampire? Frostbite.",
  "Why did the math book look sad? Because it had too many problems.",
  "Why was the math lecture so long? The professor kept going off on a tangent.",
];

export default function Page() {
  //Initialize blocks as an empty array: This avoids potential issues when accessing blocks
  const [blocks, setBlocks] = useState<any[]>([""]);
  const [user, setUser] = useState<string | null>(null); // State to store user data
  const [isLoaded, setIsLoaded] = useState(false); // State to check if data is loaded
  const router = useRouter();
    const { theme } = useTheme(); 

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8001/user", {
          credentials: "include",
        });
        const data = await response.json();
        setUser(data.userName); // Store user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // When loading draft content from local storage,
    // we handle the case where the item might not exist by providing a default value of an empty array.
    // Load draft content from local storage when the component mounts
    const savedBlocks = JSON.parse(
      localStorage.getItem("draftContent") || "[]"
    );

    if (savedBlocks.length > 0) {
      // console.log(savedBlocks);
      setBlocks(savedBlocks); // Set the loaded blocks to display in the editor
    }
    setIsLoaded(true); // Set isLoaded to true after loading data
  }, []);

  // Save content to local storage as the user writes
  useEffect(() => {
    if (blocks.length > 0) {
      localStorage.setItem("draftContent", JSON.stringify(blocks));
    }
  }, [blocks]);

  const handlePublish = async () => {
    try {
      const userResponse = await fetch("http://localhost:8001/user", {
        credentials: "include",
      });

      if (userResponse.status === 403 || userResponse.status === 401) {
        Swal.fire({
          title: "Log In",
          html: `
            <input type="email" id="email" class="swal2-input" placeholder="Email">
            <input type="password" id="password" class="swal2-input" placeholder="Password">
          `,
          confirmButtonText: "Log In",
          focusConfirm: false,
          confirmButtonColor: "#4A90E2",
          preConfirm: async () => {
            // When accessing elements in the DOM or local storage, there is a possibility that the elements or values might be null.
            // TypeScript helps us catch these potential issues by enforcing type checks.
            // In the Swal.fire function, we access the email and password input fields.
            // To ensure TypeScript knows these elements are not null, we use type assertions.
            // Here, Swal.getPopup()?.querySelector("#email") might return null if the element is not found.
            // By asserting it as HTMLInputElement, we tell TypeScript that we expect this element to be an HTMLInputElement.
            // The optional chaining (?.) ensures that if the element is null, it won’t throw an error.
            const email = (
              Swal.getPopup()?.querySelector("#email") as HTMLInputElement
            )?.value;
            const password = (
              Swal.getPopup()?.querySelector("#password") as HTMLInputElement
            )?.value;
            if (!email || !password) {
              Swal.showValidationMessage(`Please enter email and password`);
              return;
            }
            try {
              const response = await fetch("http://localhost:8001/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
              });

              const data = await response.json();

              if (!response.ok) {
                Swal.showValidationMessage(data.message);
                return;
              }
              return data;
            } catch (error) {
              Swal.showValidationMessage(`Request failed: ${error}`);
            }
          },
        }).then((result) => {
          if (result.isConfirmed) {
            handlePublish();
          }
        });
        return;
      }

      const response = await fetch("http://localhost:8001/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ blocks }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Network response was not ok");
      }

      // Clear local storage draft after successful publish
      localStorage.removeItem("draftContent");
      localStorage.setItem("articlePublished", "true");
      router.push("/articles");
    } catch (error) {
      console.error("Error:", error);
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      Swal.fire({
        icon: "error",
        //'error' is of type 'unknown' - fix this
        title:
          //This tells TypeScript to treat error as an instance of Error,
          //allowing you to access the message property without any type errors.
          (error as Error).message || "Something went wrong. Please try again.",
        showConfirmButton: true,
        confirmButtonText: "Okay",
        confirmButtonColor: "#4A90E2",
        timerProgressBar: true,
        footer: `<p>${randomJoke} Now, go ahead and write something amazing!</p>`,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center h-12 border-b-2 border-b-gray-300 my-1 bg-slate-00 mx-7">
        <p className="text-xs text-gray-500">In Draft: {user ? user : ""}</p>
        <button onClick={handlePublish}>
          <p className="cursor-pointer bg-[#50E3C2] px-2 py-1 text-white rounded-sm text-xs">
            Publish
          </p>
        </button>
      </div>
      {isLoaded && <Editor setBlocks={setBlocks} content={blocks} />}
    </>
  );
}

//---------------------------------------------------------------------------------------------------------------
//*HTMLInputElement
// HTMLInputElement is a built-in TypeScript type that represents an HTML <input> element.
// It extends the HTMLElement interface and provides properties and methods specific to <input> elements,
// such as value, checked, type, etc.

// For example, when you have an <input> element in your HTML: <input type="text" id="email" />
// In TypeScript, you can reference this element and access its properties using the HTMLInputElement type:
// const emailInput = document.getElementById("email") as HTMLInputElement;
// console.log(emailInput.value); // Access the value of the input
//---------------------------------------------------------------------------------------------------------------
//

//
//---------------------------------------------------------------------------------------------------------------
//* Optional Chaining (?.)
//Optional chaining (?.) is a feature in JavaScript and TypeScript that allows you to safely access
//deeply nested properties of an object without having to explicitly check if each reference in the
//chain is null or undefined.

// Without Optional Chaining: Here, you have to check each level of the object to ensure it exists
// before accessing the city property.
//const user = { address: { city: "New Delhi" } };
// const city = user && user.address && user.address.city;
// console.log(city); // "New Delhi"

//With Optional Chaining:
//const user = { address: { city: "New Delhi" } };
// const city = user?.address?.city;
// console.log(city); // "New Delhi"

//With optional chaining, you can simplify the code by using ?. to safely access the city property.
//If any part of the chain is null or undefined, the expression will short-circuit and return
//undefined instead of throwing an error.
//---------------------------------------------------------------------------------------------------------------------------
