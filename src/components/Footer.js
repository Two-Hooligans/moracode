export default function Footer() {
  return (
    <footer className="bg-[#262626] border-t border-gray-400 py-6 px-4">
      <div className="max-w-7xl mx-auto md:flex items-center justify-between flex-column">
        {/* Left */}
        <div className="font-bold text-white text-lg font-sans mb-4 md:mb-0">moracode.io</div>
        {/* Center */}
        <nav className="flex flex-col md:flex-row gap-1 md:gap-12 mb-5 md:mb-0">
          <a href="#about" className="text-white text-xs hover:underline">About</a>
          <a href="#features" className="text-white text-xs hover:underline">Features</a>
          <a href="#faq" className="text-white text-xs hover:underline">FAQ</a>
        </nav>
        {/* Right */}
        <div className="text-white text-xs">All Rights Reserved</div>
      </div>
    </footer>
  );
}