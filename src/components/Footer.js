import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#252525] py-16 px-4">
      <div className="mx-auto md:flex items-center justify-between flex-column">
        {/* Left */}
        <div className="font-bold text-white text-lg font-sans mb-4 md:mb-0">
          moracode.io
        </div>
        {/* Center */}
        <nav className="flex flex-col md:flex-row gap-1 md:gap-12 mb-5 md:mb-0">
          <Link href="#about" className="text-white text-xs hover:underline">
            About
          </Link>
          <Link href="#features" className="text-white text-xs hover:underline">
            Features
          </Link>
          <Link href="#faq" className="text-white text-xs hover:underline">
            FAQ
          </Link>
        </nav>
        {/* Right */}
        <div className="text-white text-xs">All Rights Reserved</div>
      </div>
    </footer>
  );
}
