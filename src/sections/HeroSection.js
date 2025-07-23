function HeroSection() {
  return (
    <section className="w-full pt-16 md:px-4 px-4 pb-32 md:pb-80 relative bg-[#DDDDDD]" style={{ zIndex: 10 }}>
      <div className="mx-auto flex flex-col gap-8 relative">
        <div>
          <h1 className="text-[42px] md:text-7xl text-[#252525] mb-8 leading-tight tracking-normal">
            MORACODE:<br />
            SECURE AI CODING ASSISTANT
          </h1>
          <p className="text-[18px] md:text-[21px] text-[#252525] mb-8 max-w-[500px] tracking-normal">
            Your code, your AI, your rules—Moracode offers secure, intelligent and private coding assistance with no external data flow.
          </p>
          <div className="flex gap-4">
            <button
              className="rounded-md bg-[#D2F944] px-[26px] py-[13px] text-[#252525] border border-[#7e7e7e] button-fill-effect group"           
              onClick={() => {
                window.location.href = "https://panel.moracode-dev.com/login";
              }}
              type="button"
              tabIndex={0}
            >
              <span className="flex items-center gap-[10px]">
                GET STARTED
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
                  <path
                    d="M14 6C14 6.20053 13.9246 6.37731 13.7738 6.53034L8.76037 11.7784C8.61461 11.9261 8.45127 12 8.27033 12C8.08436 12 7.92856 11.934 7.80291 11.8021C7.67726 11.6755 7.61443 11.5145 7.61443 11.3193C7.61443 11.2243 7.62951 11.1346 7.65967 11.0501C7.68982 10.9604 7.73506 10.8839 7.79537 10.8206L9.48411 9.01583L12.4771 6.15831L12.6279 6.54617L10.2003 6.70449H0.663436C0.467421 6.70449 0.306588 6.63852 0.180937 6.5066C0.0603123 6.37467 0 6.2058 0 6C0 5.7942 0.0603123 5.62533 0.180937 5.4934C0.306588 5.36148 0.467421 5.29551 0.663436 5.29551H10.2003L12.6279 5.45383L12.4771 5.8496L9.48411 2.98417L7.79537 1.17942C7.73506 1.1161 7.68982 1.04222 7.65967 0.957784C7.62951 0.868074 7.61443 0.775726 7.61443 0.680739C7.61443 0.485488 7.67726 0.324538 7.80291 0.197889C7.92856 0.0659631 8.08436 0 8.27033 0C8.3608 0 8.44624 0.0184697 8.52666 0.055409C8.6121 0.0923483 8.69503 0.153034 8.77544 0.237467L13.7738 5.46966C13.9246 5.62269 14 5.79947 14 6Z"
                  />
                </svg>
              </span>
            </button>
            <button
              className="rounded-md bg-transparent px-[26px] py-[13px] text-[#252525] border border border-[#7e7e7e] button-fill-effect"
              type="button"
                onClick={() => {
              window.location.href = "#community";
              }}
            >
              <span className="flex items-center gap-[10px]">COMMUNITY
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
                  <path
                    d="M14 6C14 6.20053 13.9246 6.37731 13.7738 6.53034L8.76037 11.7784C8.61461 11.9261 8.45127 12 8.27033 12C8.08436 12 7.92856 11.934 7.80291 11.8021C7.67726 11.6755 7.61443 11.5145 7.61443 11.3193C7.61443 11.2243 7.62951 11.1346 7.65967 11.0501C7.68982 10.9604 7.73506 10.8839 7.79537 10.8206L9.48411 9.01583L12.4771 6.15831L12.6279 6.54617L10.2003 6.70449H0.663436C0.467421 6.70449 0.306588 6.63852 0.180937 6.5066C0.0603123 6.37467 0 6.2058 0 6C0 5.7942 0.0603123 5.62533 0.180937 5.4934C0.306588 5.36148 0.467421 5.29551 0.663436 5.29551H10.2003L12.6279 5.45383L12.4771 5.8496L9.48411 2.98417L7.79537 1.17942C7.73506 1.1161 7.68982 1.04222 7.65967 0.957784C7.62951 0.868074 7.61443 0.775726 7.61443 0.680739C7.61443 0.485488 7.67726 0.324538 7.80291 0.197889C7.92856 0.0659631 8.08436 0 8.27033 0C8.3608 0 8.44624 0.0184697 8.52666 0.055409C8.6121 0.0923483 8.69503 0.153034 8.77544 0.237467L13.7738 5.46966C13.9246 5.62269 14 5.79947 14 6Z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center relative z-20 mt-4 md:mt-8 h-full">
          <video
            src="/assets/videos/moracode_working.mp4"
            className="rounded-lg overflow-hidden shadow-md object-cover absolute w-[100%] md:w-[70%]"
            style={{              
              height: 'auto',              
            }}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
