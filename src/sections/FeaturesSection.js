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
    { title: "GET STARTED", heading: "Every feature is practical, every detail respects your workflow.", isFinal: true },
  ];

  const minWidth = 0.1;
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
                  className={`border flex flex-col transition-all duration-500`}
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
                    f.isFinal ? (
                      <>
                      <div className="bg-[#D2F944] flex flex-col w-full">
                          <div className="p-5 flex items-start justify-start mb-20 max-w-xs">                       
                            <h2 className="text-[112px] text-[#252525] leading-[1]">{f.title}</h2>                            
                          </div>
                          <div className="flex flex-col max-w-xs self-center">
                            <p className="text-lg text-left text-[#252525] mt-2 mb-6">{f.heading}</p>                           
                            <button
                                className="self-left rounded-md bg-transparent px-[26px] py-[13px] text-[#252525] border border border-[#7e7e7e]"
                                type="button"
                                  onClick={() => {
                                window.location.href = "https://panel.moracode-dev.com/login";
                                }}
                              >
                                <span className="flex items-center gap-[10px]">LOG IN
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
                      </>
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
                    )
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