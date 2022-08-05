export default function Popup() {
  return (
    <aside className="fixed z-50 flex items-center justify-center px-5 py-3 text-white bg-black rounded-lg bottom-4 right-4">
      <a
        href="/old-site"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium hover:opacity-75"
      >
        👋 Looking for my old site?
      </a>
    </aside>
  );
}
