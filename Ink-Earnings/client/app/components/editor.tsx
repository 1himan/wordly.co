"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

// Define the correct type for the initial content
const initialContent: any = [
  {
    type: "heading",
    content: "Start Writing Yourself From here",
  },
];

export default function Editor({
  isEditable = true,
  content = initialContent,
  setBlocks,
}) {
  const editor = useCreateBlockNote({ initialContent: content });

  return (
    <div>
      <BlockNoteView
        editable={isEditable}
        editor={editor}
        onChange={() => {
          setBlocks(editor.document as any);
        }}
        theme={"light"}
      />
      {/* <pre>{JSON.stringify(editor.document, null, 2)}</pre> */}
    </div>
  );
}
