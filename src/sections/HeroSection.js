function HeroSection() {
  return (
    <section className="w-full pt-16 px-8 pb-80" style={{ backgroundColor: '#DDDDDD', position: 'relative', zIndex: 10 }}>
      <div className=" mx-auto flex flex-col gap-8 relative">
        <div>
          <h1 className="text-4xl md:text-5xl  text-gray-900 mb-4 leading-tight">
            MORACODE:<br />
            SECURE AI CODING ASSISTANT
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl">
            Your code, your AI, your rules—Moracode offers secure, intelligent and private coding assistance with no external data flow.
          </p>
          <div className="flex gap-4">
            <button
              className="rounded px-5 py-2 font-semibold text-base transition-colors"
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
              GET STARTED →
            </button>
            <button
              className="rounded px-5 py-2 font-semibold text-base border border-gray-900 transition-colors"
              style={{ backgroundColor: '#fff', color: '#191919' }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#D2F944';
                e.currentTarget.style.color = '#191919';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#191919';
              }}
            >
              COMMUNITY →
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center relative z-20" style={{ height: '100%', top: '64px' }}>
          <img
            src="/assets/images/code_editor.png"
            alt="Code Editor"
            className="rounded-lg overflow-hidden border border-gray-300 shadow-md object-cover absolute"
            style={{
              width: '100%',              
              height: 'auto',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            }}
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
