import { useRef, useEffect, useState } from "react";
import features from "../data/features";

function FadingDescription({ text, progress }) {
  const pRef = useRef(null);
  const descriptionOpacity = Math.max(0, 1 - progress * 2);

  return (
    <div className="overflow-hidden flex items-start" style={{ height: "110px", width: "350px" }}>
      <p
        ref={pRef}
        className="text-md md:text-md text-[#252525] tracking-normal"
        style={{ opacity: descriptionOpacity }}
      >
        {text}
      </p>
    </div>
  );
}

function FeaturesSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0); 

  const startScrollBuffer = 150;
  const endScrollBuffer = 150;
  const scrollDurationMultiplier = 2;

  const allCards = [
    ...features,
    { title: "GET STARTED", heading: "Final Card", isFinal: true },
  ];

  const minWidth = 0.1  ;
  const maxWidth = 0.3;

  const [collapseStep, setCollapseStep] = useState(0);
  const [totalCollapse, setTotalCollapse] = useState(0);
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
    const updateSizes = () => {
      const newCollapseStep =
        window.innerWidth * (maxWidth - minWidth) * scrollDurationMultiplier;
      const newTotalCollapse = (allCards.length - 1) * newCollapseStep;
      setCollapseStep(newCollapseStep);
      setTotalCollapse(newTotalCollapse);
      setSectionHeight(
        newTotalCollapse + window.innerHeight + startScrollBuffer + endScrollBuffer
      );
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [allCards.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !sectionRef.current) return;
      const stickyStart = sectionRef.current.offsetTop;
      const y = window.scrollY;
      const animationStartPoint = stickyStart + startScrollBuffer;

      let localScroll = 0;
      if (y < animationStartPoint) {
        localScroll = 0;
      } else if (y > animationStartPoint + totalCollapse) {
        localScroll = totalCollapse;
      } else {
        localScroll = y - animationStartPoint;
      }
      setScroll(localScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionHeight, totalCollapse]);

  const getCardWidth = (i) => {
    const cardStart = i * collapseStep;
    const cardEnd = (i + 1) * collapseStep;
    if (scroll < cardStart) return maxWidth;
    if (scroll > cardEnd) return minWidth;
    const progress = (scroll - cardStart) / collapseStep;
    return maxWidth - (maxWidth - minWidth) * progress;
  };

  const mobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <section className="h-[150px] bg-[#DDDDDD]" id="features"></section>
      <section
        ref={sectionRef}
        className="relative w-full bg-[#DDDDDD]"
        style={{ height: sectionHeight }}
      >
        <section
          ref={stickyRef}
          className="sticky left-0 w-full bg-[#DDDDDD] z-10 overflow-hidden"
          style={{
            height: `calc(100vh - ${headerHeight}px)`, 
            top: `${headerHeight}px`, 
          }}
        >
          <h2 className="text-1xl md:text-[42px] text-[#252525] mb-12 md:mb-28 px-4 max-w-4xl tracking-normal">
            BY DEVELOPERS FOR DEVELOPERS AND FOCUSED ON THE WORKFLOW
          </h2>
          <div
            className={`flex items-stretch justify-start gap-0 ${
              mobile ? "flex-col" : "flex-row"
            }`}
            style={{ height: "66.7vh", width: "100%" }}
          >
            {allCards.map((f, i) => {
              let cardStyle;
              if (mobile) {
                cardStyle = {
                  width: "100%",
                  height: 370,
                  marginBottom: 16,
                };
              } else {
                const width = f.isFinal ? 0.5 : getCardWidth(i); 
                cardStyle = {
                  width: `${width * 100}vw`,
                  minWidth: `${minWidth * 100}vw`,                  
                  height: "100%",
                  transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
                  flex: "0 0 auto",
                  background: f.isFinal ? "#D2F944" : "#DDDDDD",
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "5px",
                };
              }

              const progress = mobile
                ? 0
                : Math.min(
                    1,
                    Math.max(0, (scroll - i * collapseStep) / collapseStep)
                  );

              return (
                <div
                  key={i}
                  className={`border flex flex-col transition-all duration-500 ${
                    f.isFinal ? "" : "border-gray-300"
                  }`}
                  style={cardStyle}
                >
                  {mobile ? (
                    <div className="flex flex-col h-full w-full justify-between">
                      <div className="flex flex-row w-full items-start justify-between p-4 pb-0">
                        <div>
                          <p className="text-xs mb-2 text-[#252525] tracking-normal">{f.title}</p>
                          <h2 className="text-2xl md:text-3xl font-mono mb-0 text-[#252525] tracking-normal">{f.heading}</h2>
                        </div>
                        {f.svg && (
                          <div className="w-24 flex items-center justify-center">
                            <span dangerouslySetInnerHTML={{ __html: f.svg }} />
                          </div>
                        )}
                      </div>
                      <div className="w-full p-4 pt-0">
                        <p className="text-sm md:text-lg text-[#252525] tracking-normal">{f.desc}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-full w-full">
                      <div
                        style={{
                          visibility: progress < 0.5 ? "visible" : "hidden",
                        }}
                        className="absolute inset-0 p-5 flex flex-col justify-between h-full"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="max-w-xs">
                            <p className="text-md mb-2 text-[#252525] tracking-normal">{f.title}</p>
                            <h2 className="text-[28px] md:text-[28px] mb-0 text-[#252525] tracking-tight">{f.heading}</h2>
                          </div>  
                          {f.svg && (
                            <div className="w-24 flex items-center justify-center">
                              <span dangerouslySetInnerHTML={{ __html: f.svg }} />
                            </div>
                          )}
                        </div>
                        <FadingDescription text={f.desc} progress={progress} />
                      </div>
                      <div
                        style={{
                          visibility: progress >= 0.5 ? "visible" : "hidden",
                        }}
                        className="absolute inset-0 p-5 flex flex-col justify-between h-full items-center"
                      >
                        <p className="text-md">{f.title}</p>
                        {f.svg && (
                          <div className="flex items-center justify-center pb-8">
                            <span dangerouslySetInnerHTML={{ __html: f.svg }} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </>
  );
}

export default FeaturesSection;