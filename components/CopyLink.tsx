export default function CopyLink() {
  return (
    <button
      className="p-2 rounded-lg bg-gray-200 dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
      onClick={() => navigator.clipboard.writeText(window.location.href)}
    >
      Copy URL
    </button>
  );
}
