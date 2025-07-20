import { useRef, useEffect, useState } from "react";
import communityConnectItems from "../data/communityConnectItems";

export default function CommunityConnectSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0); 
  const minBoxHeight = 100;
  const maxBoxHeight = 350;
  const scrollPerItem = 450;

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
      totalHeight + window.innerHeight - (maxBoxHeight - minBoxHeight) - 200
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
                    <div className="text-xl mb-1 font-semibold">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-600">{item.desc}</div>
                  </div>
                  <a
                    href={item.link}
                    className="inline-block rounded px-6 py-3 font-semibold text-base border border-gray-900 transition-colors w-fit mt-2 md:mt-0"
                    style={{
                      background: item.buttonColor,
                      color: "#191919",
                    }}
                  >
                    {item.button} <span aria-hidden>→</span>
                  </a>
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