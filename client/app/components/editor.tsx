"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Dispatch, SetStateAction } from "react";
import { useTheme } from "../context/themeContext";

const initialContent: any = [
  {
    type: "heading",
    content: "Start Writing Yourself From here",
  },
];

interface EditorProps {
  isEditable?: boolean;
  //set default value of content as initial content
  content?: any;
  //*Dispatch:
  //This is a type from React that represents a function used to update state.
  //It’s essentially the type of the function returned by useState for updating state.

  //*SetStateAction:
  //This is a type that can either be a new state value or a function that takes
  //the previous state and returns the new state.
  //It allows for both direct state updates and updates based on the previous state.
  setBlocks: Dispatch<SetStateAction<any[]>>;
}

export default function Editor({
  isEditable = true,
  content = initialContent,
  setBlocks,
}: EditorProps) {
  // Ensure initialContent is correctly structured
  const editor = useCreateBlockNote({ initialContent: content });
  const { theme } = useTheme();
  return (
    <div className="bg-back px-0 lg:px-20 xl:px-56">
      <BlockNoteView
        editable={isEditable}
        editor={editor}
        onChange={() => {
          setBlocks(editor.document as any);
        }}
        theme={theme === "dark" ? "dark" : "light"}
      />
      {/* <pre>{JSON.stringify(editor.document, null, 2)}</pre> */}
    </div>
  );
}
