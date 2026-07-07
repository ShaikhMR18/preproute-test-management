import { useEffect, useRef } from "react";
import Quill from "quill";
import { Trash2 } from "lucide-react";

import "quill/dist/quill.snow.css";

type RichTextEditorProps = {
  title?: string;
  value?: string;
  placeholder?: string;
  showDelete?: boolean;
  showToolbar?: boolean;
  minHeight?: number;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  showDeleteIcon?: boolean;
};

const RichTextEditor = ({
  title,
  value = "",
  placeholder = "Type here...",
  showDelete = true,
  showToolbar = true,
  minHeight = 220,
  readOnly = false,
  onChange,
  onDelete,
  showDeleteIcon = true,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      readOnly,
      placeholder,
      modules: {
        toolbar:
          !readOnly && showToolbar
            ? [
                ["italic", "bold", "underline", "strike", "link"],
                [{ color: [] }, { background: [] }],
                [
                  { align: "" },
                  { align: "center" },
                  { align: "right" },
                  { align: "justify" },
                ],
                ["image"],
                ["formula"],
              ]
            : false,
      },
    });

    quillRef.current.root.innerHTML = value;

    quillRef.current.on("text-change", () => {
      onChange?.(quillRef.current!.root.innerHTML);
    });

    quillRef.current.root.style.minHeight = `${minHeight}px`;
  }, []);

  // Update value from parent
  useEffect(() => {
    if (!quillRef.current) return;

    const current = quillRef.current.root.innerHTML;

    if (current !== value) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  useEffect(() => {
    if (!showToolbar && editorRef.current) {
      const toolbar =
        editorRef.current.parentElement?.querySelector(".ql-toolbar");

      if (toolbar instanceof HTMLElement) {
        toolbar.style.display = "none";
      }
    }
  }, [showToolbar]);

  const handleDelete = () => {
    if (!quillRef.current) return;

    quillRef.current.setText("");

    onChange?.("");

    onDelete?.();
  };

  return (
    <div className="w-full">
      {title && (
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#2E3446]">{title}</h3>
        </div>
      )}
      {showDelete && (
        <button
          type="button"
          onClick={handleDelete}
          className="flex cursor-pointer items-center gap-2 text-sm text-[#FF6B6B] transition hover:opacity-80 mb-1"
        >
          <Trash2 size={16} />
          Delete All Edits
        </button>
      )}
      {/* Editor */}
      <div className="relative overflow-hidden rounded-xl border border-[#D9E2F2] bg-white shadow-sm">
        {showDeleteIcon && (
          <button
            type="button"
            onClick={handleDelete}
            className="absolute right-4 top-12 z-20 cursor-pointer text-[#C5CAD5] transition hover:text-[#FF5B5B]"
          >
            <Trash2 size={20} />
          </button>
        )}

        <div ref={editorRef} />
      </div>
    </div>
  );
};

export default RichTextEditor;
