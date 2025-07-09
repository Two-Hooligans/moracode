import { useState } from "react";

const NAV_ITEMS = [
  { label: "ABOUT", href: "#about" },
  { label: "FEATURES", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="w-full flex items-center justify-between px-8 py-3 "
      style={{
        backgroundColor: '#DDDDDD'
      }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-lg font-semibold text-gray-900 tracking-wide">
          moracode.io
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="relative text-gray-900 text-base font-medium transition-colors group duration-500 hover:text-gray-700"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3 duration-500">{'{'}</span>
            <span className="transition-colors">{item.label}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-3 duration-1000">{'}'}</span>
          </a>
        ))}
      </nav>
      {/* Desktop Login */}
      <div className="hidden md:block">
        <button
          className="rounded px-5 py-2 text-base border button-fill-effect"
          style={{
            backgroundColor: '#D2F944',
            color: '#191919',
            borderColor: '#DDDDDD',
          }}
          onClick={() => {
            window.location.href = 'https://panel.moracode-dev.com/login';
          }}
          type="button"
          tabIndex={0}
        >
          <span>LOG IN →</span>
        </button>
      </div>

      {/* Mobile Burger */}
      <button
        className="md:hidden flex items-center justify-center rounded bg-[#D2F944] border border-gray-900 w-14 h-14"
        style={{ minWidth: 56, minHeight: 56 }}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Open menu"
      >
        {/* Burger icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="7" width="14" height="2" rx="1" fill="#191919"/>
          <rect x="5" y="11" width="14" height="2" rx="1" fill="#191919"/>
          <rect x="5" y="15" width="14" height="2" rx="1" fill="#191919"/>
        </svg>
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex flex-col items-end md:hidden">
          <div className="bg-white w-64 h-full shadow-lg p-8 flex flex-col gap-8">
            <button
              className="self-end mb-8"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <line x1="6" y1="6" x2="18" y2="18" stroke="#191919" strokeWidth="2" strokeLinecap="round"/>
                <line x1="18" y1="6" x2="6" y2="18" stroke="#191919" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-900 text-lg font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              className="mt-8 rounded px-5 py-2 text-base border button-fill-effect"
              style={{
                backgroundColor: '#D2F944',
                color: '#191919',
                borderColor: '#DDDDDD',
              }}
              onClick={() => {
                window.location.href = 'https://panel.moracode-dev.com/login';
              }}
              type="button"
              tabIndex={0}
            >
              <span>LOG IN →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
