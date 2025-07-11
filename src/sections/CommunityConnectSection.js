import { useRef, useEffect, useState } from "react";
import communityConnectItems from "../data/communityConnectItems";
import { getCollapsedStates } from "../utils/communityConnectScroll";

export default function CommunityConnectSection() {
  const sectionRef = useRef(null);
  const [collapsed, setCollapsed] = useState(
    Array(communityConnectItems.length).fill(false)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const windowHeight = window.innerHeight;
      const collapseStep = 120;
      const newCollapsed = getCollapsedStates(
        window.scrollY,
        sectionRef.current.offsetTop,
        windowHeight,
        collapseStep,
        communityConnectItems.length
      );
      setCollapsed((prev) => {
        if (JSON.stringify(newCollapsed) !== JSON.stringify(prev)) {
          return newCollapsed;
        }
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white border border-gray-400 py-0 px-4"
    >
      <div className="mx-auto">
        {communityConnectItems.map((item, i) => (
          <div
            key={i}
            className={`flex items-center border-b border-gray-400 last:border-b-0 transition-all duration-500 flex-col-reverse md:flex-row`}
            style={{
              padding: "32px 0",
            }}
          >
            {/* Left: Info & Button */}
            <div className="w-full flex flex-col justify-between px-4 md:w-1/3 mb-4 md:mb-0 mt-3">
              {!collapsed[i] && (
                <div>
                  <div className="text-xl mb-1">{item.title}</div>
                  <div className="text-xs mb-6">{item.desc}</div>
                </div>
              )}
              <a
                href={item.link}
                className={
                  `inline-block rounded px-6 py-3 font-semibold text-base border border-gray-900 transition-colors mt-0 ` +
                  (!collapsed[i] ? "md:mt-4" : "md:mt-0")
                }
                style={{
                  background: item.buttonColor,
                  color: "#191919",
                  fontSize: "15px",
                  padding: "10px 24px",
                  transition: "all 0.3s",
                }}
              >
                {item.button} <span aria-hidden>→</span>
              </a>
            </div>
            {/* Right: Box */}
            <div
              className={
                `transition-all duration-500 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden ` +
                (collapsed[i]
                  ? "h-[100px] md:h-[150px]"
                  : "h-[200px] md:h-[400px]")
              }
              style={{
                width: "100%",
                minWidth: 120,
                maxWidth: "100%",
                minHeight: 60,
              }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}
