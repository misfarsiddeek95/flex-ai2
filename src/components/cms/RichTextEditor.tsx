"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useMemo, useEffect, useState } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const registerModules = async () => {
            // Register the image resize module on the client side only
            if (typeof window !== "undefined") {
                try {
                    const { default: ReactQuill } = await import("react-quill-new");
                    const Quill = ReactQuill.Quill;
                    // @ts-expect-error - Type definition might be missing for this module
                    const { default: ImageResize } = await import("quill-image-resize-module-react");

                    // Only register if not already registered
                    if (Quill && !Quill.imports["modules/imageResize"]) {
                        Quill.register("modules/imageResize", ImageResize);
                    }
                    setIsLoaded(true);
                } catch (error) {
                    console.error("Failed to load Quill modules:", error);
                    // Even if it fails, we should load the editor without the module
                    setIsLoaded(true);
                }
            }
        };
        registerModules();
    }, []);

    // Custom toolbar configuration
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    // Heading levels
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    // Font size
                    [{ size: ["small", false, "large", "huge"] }],

                    // Text formatting
                    ["bold", "italic", "underline", "strike"],

                    // Text color and background
                    [{ color: [] }, { background: [] }],

                    // Lists
                    [{ list: "ordered" }, { list: "bullet" }],

                    // Indentation
                    [{ indent: "-1" }, { indent: "+1" }],

                    // Text alignment
                    [{ align: [] }],

                    // Links and images
                    ["link", "image"],

                    // Code block and blockquote
                    ["blockquote", "code-block"],

                    // Clear formatting
                    ["clean"],
                ],
            },
            // Only include imageResize if we are sure it's registered (though we wait for isLoaded anyway)
            imageResize: {
                modules: ["Resize", "DisplaySize"],
            },
            clipboard: {
                matchVisual: false,
            },
        }),
        []
    );

    const formats = [
        "header",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "list",
        "indent",
        "align",
        "link",
        "image",
        "blockquote",
        "code-block",
    ];

    if (!isLoaded) {
        return (
            <div className="flex h-[300px] w-full items-center justify-center rounded-lg border border-gray-300 bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-300">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className="rich-text-editor"
                placeholder="Start writing your content here..."
            />
            <style jsx global>{`
                .rich-text-editor .ql-container {
                    min-height: 300px;
                    font-size: 16px;
                }
                
                .rich-text-editor .ql-editor {
                    min-height: 300px;
                }
                
                .rich-text-editor .ql-toolbar {
                    background-color: #f9fafb;
                    border-bottom: 1px solid #e5e7eb;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                }
                
                .rich-text-editor .ql-container {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                }
                
                .rich-text-editor .ql-editor.ql-blank::before {
                    color: #9ca3af;
                    font-style: normal;
                }
                
                /* Ensure images are responsive */
                .rich-text-editor .ql-editor img {
                    max-width: 100%;
                    height: auto;
                    cursor: pointer;
                }
                
                /* Image resize handles */
                .rich-text-editor .ql-editor img.img-resizing {
                    cursor: nwse-resize;
                }
            `}</style>
        </div>
    );
}
