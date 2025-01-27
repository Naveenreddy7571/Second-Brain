import React, { useState } from "react";
import Button from "../../Ui/Button";
import CopyIcon from "../../assets/CopyIcon"; 

interface ShareableLinkProps {
  sharedLink: string;
  handleDisableSharing: () => void;
}

function ShareableLink({ sharedLink, handleDisableSharing }: ShareableLinkProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sharedLink);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <p className="text-sm text-gray-700 mb-2 text-start">Your Shareable Link:</p>
      <div className="flex items-center gap-2 ">
      <p className="text-blue-500 underline break-all text-sm overflow-hidden overflow-y-auto scroll-auto border border-black rounded-lg max-h-8 p-1">
  {sharedLink}
</p>
    <Button
        title={isCopied ? "Copied!" : "Copy"}
        styleType="primary"
        size="sm"
        onClick={handleCopy}
      />
      </div>
      <span className="flex flex-col mt-4">
      <Button
        title="Disable Sharing"
        styleType="primary"
        size="sm"
        onClick={handleDisableSharing}
      />
      </span>
    </div>
  );
}

export default ShareableLink;
