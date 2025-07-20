import { useRef, useEffect, useState } from "react";
import features from "../data/features";

function FadingDescription({ text, progress }) {
  const pRef = useRef(null);

  const descriptionOpacity = Math.max(0, 1 - progress * 2);

  return (
    <div className="overflow-hidden flex items-start" style={{ height: "150px" }}>
      <p
        ref={pRef}
        className="text-sm md:text-lg text-gray-700"
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

  const startScrollBuffer = 150;
  const endScrollBuffer = 150;
  const scrollDurationMultiplier = 2; 

  const allCards = [
    ...features,
    { title: "GET STARTED", heading: "Final Card", isFinal: true },
  ];

  const minWidth = 0.15;
  const maxWidth = 0.3;

  const [collapseStep, setCollapseStep] = useState(0);
  const [totalCollapse, setTotalCollapse] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(window.innerHeight);

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
      <div className="h-[100px] bg-[#DDDDDD]"></div>
      <section
        ref={sectionRef}
        className="relative w-full bg-[#DDDDDD]"
        style={{ height: sectionHeight }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 left-0 w-full h-[100vh] bg-[#DDDDDD] z-10 overflow-hidden pt-20"
        >
          <h2 className="text-2xl md:text-5xl text-gray-900 mb-12 md:mb-28 px-4">
            BY DEVELOPERS FOR DEVELOPERS AND
            <br />
            FOCUSED ON THE WORKFLOW
          </h2>
          <div
            className={`flex items-stretch justify-start gap-0 ${
              mobile ? "flex-col" : "flex-row"
            }`}
            style={{ height: "76%", width: "100%" }}
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
                const width = getCardWidth(i);
                cardStyle = {
                  width: `${width * 100}vw`,
                  minWidth: `${minWidth * 100}vw`,
                  maxWidth: `${maxWidth * 100}vw`,
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
                          <p className="text-xs mb-2">{f.title}</p>
                          <h2 className="text-2xl md:text-3xl font-mono mb-0">{f.heading}</h2>
                        </div>
                        {f.svg && (
                          <div className="w-24 flex items-center justify-center">
                            <span dangerouslySetInnerHTML={{ __html: f.svg }} />
                          </div>
                        )}
                      </div>
                      <div className="w-full p-4 pt-0">
                        <p className="text-sm md:text-lg text-gray-700">{f.desc}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-full w-full">                      
                      <div
                        style={{
                          visibility: progress < 0.5 ? "visible" : "hidden",
                        }}
                        className="absolute inset-0 p-4 flex flex-col justify-between h-full"
                      >
                        <div className="flex justify-between items-start gap-8">
                          <div>
                            <p className="text-xs mb-2">{f.title}</p>
                            <h2 className="text-2xl md:text-3xl font-mono mb-0">{f.heading}</h2>
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
                        className="absolute inset-0 p-4 flex flex-col justify-between h-full items-center"
                      >
                        <p className="text-xs">{f.title}</p>
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
        </div>
      </section>
    </>
  );
}

export default FeaturesSection;