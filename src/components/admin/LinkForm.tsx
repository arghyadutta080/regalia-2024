"use client";

import { linkType } from "@/lib/types/event";
import { useState } from "react";

const LinkForm = ({
  isOpen,
  onClose,
  handleAddLink,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleAddLink: (link: linkType) => void;
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = () => {
    if (title && url) {
        handleAddLink({ title, url });
        setTitle("");
        setUrl("");
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-body text-regalia lg:w-1/5  border-y border-regalia p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Add Link</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="px-2 py-1 rounded-xl bg-transparent font-sans placeholder:font-hollirood text-slate-300 border border-regalia"
              />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
                className=" px-2 py-1 rounded-xl bg-transparent font-sans placeholder:font-hollirood text-slate-300 border border-regalia"
              />
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-transparent text-red-500 border border-red-500 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className=" text-black border border-regalia bg-regalia hover:bg-black hover:text-regalia hover:border-regalia  px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LinkForm;