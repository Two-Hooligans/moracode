import { useRef, useEffect, useState, createRef } from "react";
import communityConnectItems from "../data/communityConnectItems";

export default function CommunityConnectSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const scrollRef = useRef(0); 
  
  const itemRefs = useRef([]);
  itemRefs.current = communityConnectItems.map((_, i) => itemRefs.current[i] ?? createRef());
  
  const [headerHeight, setHeaderHeight] = useState(0);
  
  const minItemHeight = 175;
  const maxItemHeight = 425;
  const scrollPerItem = 550;

  const [totalAnimationHeight, setTotalAnimationHeight] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(window.innerHeight);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const headerElement = document.querySelector("header");
      if (headerElement) setHeaderHeight(headerElement.offsetHeight);
    };
    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);
    return () => window.removeEventListener("resize", calculateHeaderHeight);
  }, []);

  useEffect(() => {
    const itemCount = communityConnectItems.length;
    const totalAnimHeight = scrollPerItem * itemCount;
    setTotalAnimationHeight(totalAnimHeight);
    const finalContentHeight = itemCount * minItemHeight;
    setSectionHeight(totalAnimHeight + finalContentHeight);
  }, []); 
  
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!sectionRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      const sectionTop = sectionRef.current.offsetTop;
      const rawScroll = window.scrollY - sectionTop;
      scrollRef.current = Math.max(0, Math.min(rawScroll, totalAnimationHeight));

      itemRefs.current.forEach((ref, i) => {
        const itemEl = ref.current;
        if (!itemEl) return;
        
        const textEl = itemEl.querySelector(".text-to-fade");
        
        const start = i * scrollPerItem;
        const end = start + scrollPerItem;
        const progress = Math.max(0, Math.min(1, (scrollRef.current - start) / (end - start)));

        const newHeight = maxItemHeight - (maxItemHeight - minItemHeight) * progress;
        const newOpacity = 1 - progress * 1.5;
        
        itemEl.style.height = `${newHeight}px`;
        if (textEl) {
          textEl.style.opacity = newOpacity;
          textEl.style.display = newOpacity <= 0 ? 'none' : 'block';
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [totalAnimationHeight]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
      id="community"
      style={{ height: `${sectionHeight}px` }}
    >
      <section
        ref={stickyRef}
        className="sticky left-0 w-full z-10 overflow-hidden bg-white"
        style={{ top: `${headerHeight}px` }}
      >
        <div className="flex flex-col justify-start h-full mx-auto w-full">
          {communityConnectItems.map((item, i) => (
            <div
              key={i}
              ref={itemRefs.current[i]}
              className="flex items-stretch border-b border-gray-300 last:border-b-0 px-4 py-6 flex-col md:flex-row gap-4 overflow-hidden"
              style={{ height: `${maxItemHeight}px` }}
            >
              <div className="flex flex-col w-full md:w-2/5 py-4 justify-center">
                <div className="text-to-fade flex-grow">
                  <div className="text-[32px] mb-1 text-[#252525]">{item.title}</div>
                  <div className="text-md text-[#252525]">{item.desc}</div>
                </div>
                <div>
                  <button
                    className="rounded-md px-[26px] py-[13px] text-[#252525] bg-[#D2F944] border border-[#7e7e7e] button-fill-effect group"
                  >
                    <span className="flex items-center gap-[10px]">{item.button}
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ fill: "#252525" }}><path d="M14 6c0 .2-.08.38-.23.53l-5 5.25c-.15.15-.31.22-.49.22-.18 0-.34-.07-.47-.2a.64.64 0 0 1-.19-.48c0-.1.01-.19.04-.27.03-.09.08-.16.14-.22l1.69-1.8L12.48 6.16l.15.39-2.43.16H.66a.9.9 0 0 1-.48-.13.85.85 0 0 1-.18-.54c0-.2.06-.37.18-.5a.6.6 0 0 1 .48-.14h9.54l2.43.16-.15.39-3-2.85-1.69-1.8c-.06-.06-.11-.13-.14-.22a.49.49 0 0 1-.04-.27c0-.2.06-.36.19-.48.13-.13.29-.2.47-.2.09 0 .18.02.26.05.09.04.17.1.26.19l5 5.24c.15.15.23.33.23.53Z"/></svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="bg-gray-100 rounded-xl w-full h-full self-center"></div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}