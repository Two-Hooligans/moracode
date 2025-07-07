function Header() {
  return (
    <header
      className="w-full flex items-center justify-between px-8 h-16"
      style={{ backgroundColor: '#DDDDDD' }}
    >
      <div className="flex items-center">
        <span className="font-mono text-lg font-semibold text-gray-900 tracking-wide">
          moracode.io
        </span>
      </div>
      <nav className="flex gap-8">
        {['ABOUT', 'FEATURES', 'FAQ'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative text-gray-900 font-mono text-base font-medium transition-colors group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3">{'{'}</span>
            <span className="transition-colors">{item}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-3">{'}'}</span>
          </a>
        ))}
      </nav>
      <div>
        <button
          className="rounded px-5 py-2 font-mono font-semibold text-base transition-colors"
          style={{ backgroundColor: '#D2F944', color: '#191919' }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = '#191919';
            e.currentTarget.style.color = '#D2F944';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = '#D2F944';
            e.currentTarget.style.color = '#191919';
          }}
        >
          LOG IN →
        </button>
      </div>
    </header>
  );
}

export default Header;
