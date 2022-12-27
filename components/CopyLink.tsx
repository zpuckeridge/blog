import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function CopyLink() {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button onClick={handleClick} title="Copy URL">
      {copied ? <FiCheck /> : <FiCopy />}
    </button>
  );
}
