import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "ABOUT", href: "#about" },
  { label: "FEATURES", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerBgColor, setHeaderBgColor] = useState("#DDDDDD");

  useEffect(() => {
    const getEffectiveBackground = (section) => {
      const cs = window.getComputedStyle(section);
      if (
        cs.backgroundColor &&
        cs.backgroundColor !== "rgba(0, 0, 0, 0)" &&
        cs.backgroundColor !== "transparent"
      ) {
        return cs.backgroundColor;
      }
      for (let child of section.children) {
        const childCS = window.getComputedStyle(child);
        if (
          childCS.backgroundColor &&
          childCS.backgroundColor !== "rgba(0, 0, 0, 0)" &&
          childCS.backgroundColor !== "transparent"
        ) {
          return childCS.backgroundColor;
        }
      }
      return cs.backgroundColor || "transparent";
    };

    const getTopSection = () => {
      const allSections = document.querySelectorAll("section");
      let topSection = null;
      let minDist = window.innerHeight;
      for (let s of allSections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          if (Math.abs(rect.top) < minDist) {
            minDist = Math.abs(rect.top);
            topSection = s;
          }
        }
      }

      return topSection;
    };

    const handleHeaderColor = () => {
      const section = getTopSection();
      if (section) {
        const bgColor = getEffectiveBackground(section);
        setHeaderBgColor(bgColor);
      }
    };

    handleHeaderColor();

    window.addEventListener("scroll", handleHeaderColor);
    window.addEventListener("resize", handleHeaderColor);

    return () => {
      window.removeEventListener("scroll", handleHeaderColor);
      window.removeEventListener("resize", handleHeaderColor);
    };
  }, []);

  return (
    <header
      className="w-full flex items-center justify-between px-4 py-3 sticky top-0 z-50"
      style={{
        backgroundColor: headerBgColor,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-lg font-semibold text-[#252525] tracking-wide">
          moracode.io
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-[42px]">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="relative text-[#252525] transition-colors group duration-500 hover:text-gray-700"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3 duration-500">
              {"{"}
            </span>
            <span className="transition-colors">{item.label}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-3 duration-1000">
              {"}"}
            </span>
          </a>
        ))}
      </nav>

      {/* Desktop Login */}
      <div className="hidden md:block">
        <button
          className="rounded-md px-[26px] py-[13px] text-[#252525] border border-[#7e7e7e] button-fill-effect"
          style={{
            backgroundColor: "#D2F944",
          }}
          onClick={() => {
            window.location.href = "https://panel.moracode-dev.com/login";
          }}
          type="button"
          tabIndex={0}
        >
          <span className="flex items-center gap-[10px]">
            LOG IN
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-300"
              style={{
                fill: "#252525",
              }}
            >
              <path d="M14 6C14 6.20053 13.9246 6.37731 13.7738 6.53034L8.76037 11.7784C8.61461 11.9261 8.45127 12 8.27033 12C8.08436 12 7.92856 11.934 7.80291 11.8021C7.67726 11.6755 7.61443 11.5145 7.61443 11.3193C7.61443 11.2243 7.62951 11.1346 7.65967 11.0501C7.68982 10.9604 7.73506 10.8839 7.79537 10.8206L9.48411 9.01583L12.4771 6.15831L12.6279 6.54617L10.2003 6.70449H0.663436C0.467421 6.70449 0.306588 6.63852 0.180937 6.5066C0.0603123 6.37467 0 6.2058 0 6C0 5.7942 0.0603123 5.62533 0.180937 5.4934C0.306588 5.36148 0.467421 5.29551 0.663436 5.29551H10.2003L12.6279 5.45383L12.4771 5.8496L9.48411 2.98417L7.79537 1.17942C7.73506 1.1161 7.68982 1.04222 7.65967 0.957784C7.62951 0.868074 7.61443 0.775726 7.61443 0.680739C7.61443 0.485488 7.67726 0.324538 7.80291 0.197889C7.92856 0.0659631 8.08436 0 8.27033 0C8.3608 0 8.44624 0.0184697 8.52666 0.055409C8.6121 0.0923483 8.69503 0.153034 8.77544 0.237467L13.7738 5.46966C13.9246 5.62269 14 5.79947 14 6Z" />
            </svg>
          </span>
        </button>
      </div>

      {/* Mobile Burger */}
      <button
        className="md:hidden flex items-center justify-center rounded bg-[#D2F944] border border-[#7E7E7E] w-14 h-14"
        style={{ minWidth: 56, minHeight: 56 }}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Open menu"
      >
        {/* Burger icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="7" width="14" height="2" rx="1" fill="#252525" />
          <rect x="5" y="11" width="14" height="2" rx="1" fill="#252525" />
          <rect x="5" y="15" width="14" height="2" rx="1" fill="#252525" />
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
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="#252525"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                  stroke="#252525"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[#252525] text-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div>
              <button
                className="rounded-md px-[26px] py-[13px] text-base border border-[#7e7e7e] button-fill-effect"
                style={{
                  backgroundColor: "#D2F944",
                  color: "#252525",
                }}
                onClick={() => {
                  window.location.href = "https://panel.moracode-dev.com/login";
                }}
                type="button"
                tabIndex={0}
              >
                <span className="flex items-center gap-[10px]">
                  LOG IN
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-colors duration-300"
                    style={{
                      fill: "#252525",
                    }}
                  >
                    <path d="M14 6C14 6.20053 13.9246 6.37731 13.7738 6.53034L8.76037 11.7784C8.61461 11.9261 8.45127 12 8.27033 12C8.08436 12 7.92856 11.934 7.80291 11.8021C7.67726 11.6755 7.61443 11.5145 7.61443 11.3193C7.61443 11.2243 7.62951 11.1346 7.65967 11.0501C7.68982 10.9604 7.73506 10.8839 7.79537 10.8206L9.48411 9.01583L12.4771 6.15831L12.6279 6.54617L10.2003 6.70449H0.663436C0.467421 6.70449 0.306588 6.63852 0.180937 6.5066C0.0603123 6.37467 0 6.2058 0 6C0 5.7942 0.0603123 5.62533 0.180937 5.4934C0.306588 5.36148 0.467421 5.29551 0.663436 5.29551H10.2003L12.6279 5.45383L12.4771 5.8496L9.48411 2.98417L7.79537 1.17942C7.73506 1.1161 7.68982 1.04222 7.65967 0.957784C7.62951 0.868074 7.61443 0.775726 7.61443 0.680739C7.61443 0.485488 7.67726 0.324538 7.80291 0.197889C7.92856 0.0659631 8.08436 0 8.27033 0C8.3608 0 8.44624 0.0184697 8.52666 0.055409C8.6121 0.0923483 8.69503 0.153034 8.77544 0.237467L13.7738 5.46966C13.9246 5.62269 14 5.79947 14 6Z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
