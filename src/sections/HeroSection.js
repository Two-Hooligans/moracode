function HeroSection() {
  return (
    <section className="w-full pt-16 px-8 pb-28 md:pb-80" style={{ backgroundColor: '#DDDDDD', position: 'relative', zIndex: 10 }}>
      <div className=" mx-auto flex flex-col gap-8 relative">
        <div>
          <h1 className="text-5xl md:text-7xl  text-gray-900 mb-8 leading-tight">
            MORACODE:<br />
            SECURE AI CODING ASSISTANT
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl">
            Your code, your AI, your rules—Moracode offers secure, intelligent and private coding assistance with no external data flow.
          </p>
          <div className="flex gap-4">
            <button
              className="rounded px-5 py-2 text-base border border-gray-400 button-fill-effect"
              style={{
                backgroundColor: '#D2F944',
                color: '#191919',                
              }}
              type="button"
            >
              <span>GET STARTED →</span>
            </button>
            <button
              className="rounded px-5 py-2 text-base border border-gray-400 button-fill-effect"
              style={{
                backgroundColor: 'transparent',
                color: '#191919',                
              }}
              type="button"
            >
              <span>COMMUNITY →</span>
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center relative z-20 mt-4 md:mt-8 h-full">
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
