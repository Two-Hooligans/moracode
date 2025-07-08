export default function Footer() {
  return (
    <footer className="bg-[#262626] border-t border-gray-400 py-6 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left */}
        <div className="font-bold text-white text-lg font-sans">moracode.io</div>
        {/* Center */}
        <nav className="flex gap-12">
          <a href="#about" className="text-white text-sm hover:underline">About</a>
          <a href="#features" className="text-white text-sm hover:underline">Features</a>
          <a href="#faq" className="text-white text-sm hover:underline">FAQ</a>
        </nav>
        {/* Right */}
        <div className="text-white text-sm">All Rights Reserved</div>
      </div>
    </footer>
  );
}