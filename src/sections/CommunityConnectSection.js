import { useRef, useEffect, useState } from "react";
import communityConnectItems from "../data/communityConnectItems";

export default function CommunityConnectSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0); 
  const minBoxHeight = 100;
  const maxBoxHeight = 425;
  const scrollPerItem = 550;

  const [totalAnimationHeight, setTotalAnimationHeight] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(window.innerHeight);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };

    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);

    return () => window.removeEventListener("resize", calculateHeaderHeight);
  }, []);

  useEffect(() => {
    const totalHeight = scrollPerItem * communityConnectItems.length;
    setTotalAnimationHeight(totalHeight);
    setSectionHeight(
      totalHeight + window.innerHeight - (maxBoxHeight - minBoxHeight)
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const raw = window.scrollY - sectionTop;
      const clamped = Math.max(0, Math.min(raw, totalAnimationHeight));
      setScroll(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [totalAnimationHeight]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{ height: sectionHeight }}
    >
      <div
        ref={stickyRef}
        className="sticky left-0 w-full z-10 overflow-hidden"
        style={{ top: `${headerHeight}px` }}
      >
        <div className="flex flex-col justify-start h-full mx-auto pt-4 w-full">
          {communityConnectItems.map((item, i) => {
            const start = i * scrollPerItem;
            const end = (i + 1) * scrollPerItem;
            const progress = Math.max(
              0,
              Math.min(1, (scroll - start) / (end - start))
            );

            const boxHeight =
              maxBoxHeight - (maxBoxHeight - minBoxHeight) * progress;
            const textOpacity = 1 - progress;

            return (
              <div
                key={i}
                className="flex items-center border-b border-gray-300 last:border-b-0 py-4 px-4 flex-col md:flex-row gap-4"
              >
                {/* Left: Info & Button */}
                <div
                  className={`flex flex-col justify-between ${
                    textOpacity === 0 ? "" : "self-stretch"
                  } w-full md:w-2/5`}
                >
                  <div
                    style={{
                      opacity: textOpacity,
                      display: textOpacity === 0 ? "none" : "block",
                    }}
                    className="transition-opacity duration-100"
                  >
                    <div className="text-[32px] mb-1">
                      {item.title}
                    </div>
                    <div className="text-md text-gray-600">{item.desc}</div>
                  </div>
                  <div>
                  <button
                    className="rounded-md px-[26px] py-[13px] text-base border border-[#7e7e7e] button-fill-effect group"
                    style={{
                      backgroundColor: "#D2F944",
                      color: "#191919",
                    }}
                    onClick={() => {
                      window.location.href = "https://panel.moracode-dev.com/login";
                    }}
                    type="button"
                    tabIndex={0}
                  >
                    <span className="flex items-center gap-[10px]">
                      {item.button}
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

                {/* Right: Collapsing Box */}
                <div
                  className="bg-gray-100 rounded-xl flex items-center justify-center w-full"
                  style={{
                    height: `${boxHeight}px`,
                    transition: "height 0.1s linear",
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}