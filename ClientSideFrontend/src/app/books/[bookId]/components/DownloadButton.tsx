"use client";
import React from "react";

const DownloadButton = ({ fileLink }: { fileLink: string }) => {
  const handleDownload = () => {
    window.open(fileLink, "_blank");
  };
  return (
    <button
      type="button"
      className="text-white bg-primary-500 px-4 py-2 rounded-md mt-5"
      onClick={handleDownload}
    >
      Download Now
    </button>
  );
};

export default DownloadButton;
