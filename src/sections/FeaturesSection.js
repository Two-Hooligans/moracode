import { useRef, useEffect, useState, createRef, useMemo } from "react";
import features from "../data/features";

function FadingElement({ text, elementType = "p", className = "" }) {
  const ElementType = elementType;

  return (
    <ElementType className={`fading-description ${className}`}>
      {text}
    </ElementType>
  );
}

function FeaturesSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const scrollRef = useRef(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const startScrollBuffer = 150;
  const endScrollBuffer = 150;
  const scrollDurationMultiplier = 3;

  const allCards = useMemo(
    () => [
      ...features,
      {
        title: "GET STARTED",
        heading:
          "Every feature is practical, every detail respects your workflow.",
        isFinal: true,
      },
    ],
    []
  );

  const cardRefs = useRef([]);
  cardRefs.current = allCards.map((_, i) => cardRefs.current[i] ?? createRef());

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const { minRatio, maxRatio } = useMemo(
    () => ({
      minRatio: isMobile ? 0.06 : 0.1,
      maxRatio: isMobile ? 0.35 : 0.3,
    }),
    [isMobile]
  );

  const [collapseStep, setCollapseStep] = useState(0);
  const [totalCollapse, setTotalCollapse] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const calculateHeaderHeight = () => {
      const headerElement = document.querySelector("header");
      if (headerElement) setHeaderHeight(headerElement.offsetHeight);
    };
    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);
    return () => window.removeEventListener("resize", calculateHeaderHeight);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateSizes = () => {
      const newCollapseStep =
        window.innerWidth * (maxRatio - minRatio) * scrollDurationMultiplier;
      const newTotalCollapse = (allCards.length - 1) * newCollapseStep;
      setCollapseStep(newCollapseStep);
      setTotalCollapse(newTotalCollapse);
      setSectionHeight(
        newTotalCollapse +
          window.innerHeight +
          startScrollBuffer +
          endScrollBuffer
      );
    };
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [allCards.length, maxRatio, minRatio]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      if (!stickyRef.current || !sectionRef.current) return;
      const stickyStart = sectionRef.current.offsetTop;
      const animationStartPoint = stickyStart + startScrollBuffer;
      const y = window.scrollY;

      let localScroll = 0;
      if (y < animationStartPoint) {
        localScroll = 0;
      } else if (y > animationStartPoint + totalCollapse) {
        localScroll = totalCollapse;
      } else {
        localScroll = y - animationStartPoint;
      }
      scrollRef.current = localScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalCollapse]);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (collapseStep <= 0 || typeof window === "undefined") {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      cardRefs.current.forEach((ref, i) => {
        const cardEl = ref.current;
        if (!cardEl || allCards[i].isFinal) return;

        const cardStart = i * collapseStep;
        const progress = Math.min(
          1,
          Math.max(0, (scrollRef.current - cardStart) / collapseStep)
        );

        const minSize = 55;
        const maxSize = 135;
        const size = maxSize - (maxSize - minSize) * Math.min(progress, 1);

        if (isMobile) {
          const newHeight = maxRatio - (maxRatio - minRatio) * progress;
          cardEl.style.height = `${newHeight * 100}vh`;

          const headingEl = cardEl.querySelector(".mobile-heading");
          const fadingDescDiv = cardEl.querySelector(".fading-description");
          const svgContainer = cardEl.querySelector(".mobile-svg-container");

          const contentOpacity = Math.max(0, 1 - progress * 1.5);

          if (headingEl) headingEl.style.opacity = contentOpacity;
          if (fadingDescDiv) fadingDescDiv.style.opacity = contentOpacity;

          if (svgContainer) {
            const verticalOffset = progress * -20;
            svgContainer.style.transform = `rotate(${
              progress * 90
            }deg) translateX(${verticalOffset}px)`;
            svgContainer.style.width = `${size}px`;
            svgContainer.style.height = `${size}px`;
          }
        } else {
          const newWidth = maxRatio - (maxRatio - minRatio) * progress;
          cardEl.style.width = `${newWidth * 100}vw`;

          const fullContentView = cardEl.querySelector(".full-content");
          const collapsedContentView =
            cardEl.querySelector(".collapsed-content");
          const fadingElement = cardEl.querySelectorAll(".fading-description");

          if (fullContentView && collapsedContentView && fadingElement) {
            fullContentView.style.visibility =
              progress < 0.7 ? "visible" : "hidden";
            collapsedContentView.style.visibility =
              progress >= 0.7 ? "visible" : "hidden";
            const elOpacity = Math.max(0, 1 - progress * 1);
            fadingElement.forEach((el) => {
              el.style.opacity = elOpacity;
            });
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [collapseStep, allCards, minRatio, maxRatio, isMobile]);

  function getCardProgress(i) {
    const cardStart = i * collapseStep;
    return Math.min(
      1,
      Math.max(0, (scrollRef.current - cardStart) / collapseStep)
    );
  }

  function getCardSize(i) {
    const minSize = 40;
    const maxSize = 96;
    const progress = getCardProgress(i);
    return maxSize - (maxSize - minSize) * progress;
  }

  function getCardHeight(i) {
    const cardStart = i * collapseStep;
    const cardEnd = (i + 1) * collapseStep;
    if (scrollRef.current < cardStart) return maxRatio;
    if (scrollRef.current > cardEnd) return minRatio;
    const progress = (scrollRef.current - cardStart) / collapseStep;
    return maxRatio - (maxRatio - minRatio) * progress;
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section
        className="md:h-[150px] h-[70px] bg-[#DDDDDD]"
        id="features"
      ></section>
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
          <h2 className="text-[24px] md:text-[42px] text-[#252525] mb-10 md:mb-28 px-4 max-w-4xl tracking-normal md:leading-none leading-[1.2]">
            BY DEVELOPERS FOR DEVELOPERS AND FOCUSED ON THE WORKFLOW
          </h2>
          <div
            className={`flex items-stretch justify-start ${
              isMobile ? "flex-col" : "flex-row"
            }`}
            style={{ height: isMobile ? "82vh" : "71vh", width: "100%" }}
          >
            {allCards.map((f, i) => {
              let cardStyle;
              if (isMobile) {
                cardStyle = {
                  width: "100%",
                  height: f.isFinal ? `43vh` : `${getCardHeight(i) * 100}vh`,
                  transition: "height 0.5s cubic-bezier(.4,0,.2,1)",
                  background: f.isFinal ? "#D2F944" : "#DDDDDD",
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "6px",
                  border: "1px solid #C4C4C4",
                  borderBottom: "0px",
                  flex: "0 0 auto",
                  justifyContent: f.isFinal && "center",
                };
              } else {
                const initialWidth = f.isFinal ? 0.5 : maxRatio;
                cardStyle = {
                  width: `${initialWidth * 100}vw`,
                  minWidth: `${minRatio * 100}vw`,
                  height: "100%",
                  flex: "0 0 auto",
                  background: f.isFinal ? "#D2F944" : "#DDDDDD",
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "6px",
                  border: "1px solid #C4C4C4",
                  borderRight: "0px",
                };
              }
              return (
                <div
                  key={f.title || i}
                  ref={cardRefs.current[i]}
                  className={`border flex flex-col]`}
                  style={cardStyle}
                >
                  {isMobile ? (
                    f.isFinal ? (
                      <div className="bg-[#D2F944] flex flex-col items-center justify-center w-full p-4 text-center mb-6">
                        <div className="flex-grow flex flex-col items-start justify-center w-full">
                          <h2 className="flex flex-col text-[60px] md:text-[80px] font-mono text-left text-[#252525] leading-[0.9 -tracking-wider max-w-xs leading-none">
                            GET STARTED
                          </h2>
                        </div>
                        <div className="flex-shrink-0 w-full">
                          <p className="text-md text-left text-[#252525] mt-5 mb-5 md:max-w-xs w-full mx-auto">
                            {f.heading}
                          </p>
                          <div className="flex items-center justify-start w-full">
                            <button
                              className="rounded-md bg-transparent px-7 py-3 text-[#252525] border border-solid border-[#252525] md:mx-auto self-start"
                              type="button"
                              onClick={() => {
                                window.location.href =
                                  "https://panel.moracode-dev.com/login";
                              }}
                            >
                              <span className="flex items-center gap-[10px] text-md font-medium">
                                LOG IN
                                <svg
                                  width="14"
                                  height="12"
                                  viewBox="0 0 14 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ fill: "#252525" }}
                                >
                                  <path d="M14 6C14 6.20053 13.9246 6.37731 13.7738 6.53034L8.76037 11.7784C8.61461 11.9261 8.45127 12 8.27033 12C8.08436 12 7.92856 11.934 7.80291 11.8021C7.67726 11.6755 7.61443 11.5145 7.61443 11.3193C7.61443 11.2243 7.62951 11.1346 7.65967 11.0501C7.68982 10.9604 7.73506 10.8839 7.79537 10.8206L9.48411 9.01583L12.4771 6.15831L12.6279 6.54617L10.2003 6.70449H0.663436C0.467421 6.70449 0.306588 6.63852 0.180937 6.5066C0.0603123 6.37467 0 6.2058 0 6C0 5.7942 0.0603123 5.62533 0.180937 5.4934C0.306588 5.36148 0.467421 5.29551 0.663436 5.29551H10.2003L12.6279 5.45383L12.4771 5.8496L9.48411 2.98417L7.79537 1.17942C7.73506 1.1161 7.68982 1.04222 7.65967 0.957784C7.62951 0.868074 7.61443 0.775726 7.61443 0.680739C7.61443 0.485488 7.67726 0.324538 7.80291 0.197889C7.92856 0.0659631 8.08436 0 8.27033 0C8.3608 0 8.44624 0.0184697 8.52666 0.055409C8.6121 0.0923483 8.69503 0.153034 8.77544 0.237467L13.7738 5.46966C13.9246 5.62269 14 5.79947 14 6Z" />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-full w-full">
                        <div className="absolute inset-0 p-4 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start gap-4">
                            <div className="max-w-xs">
                              <p className="text-md mb-2 text-[#252525] tracking-normal">
                                {f.title}
                              </p>
                              <h2
                                className="mobile-heading md:text-2xl text-[22px] font-mono mb-0 text-[#252525] tracking-normal"
                                style={{ transition: "opacity 0.2s linear" }}
                              >
                                {f.heading}
                              </h2>
                            </div>
                            {f.svg && (
                              <div
                                className="fs_holder mobile-svg-container"
                                style={{
                                  width: `${getCardSize(i)}px`,
                                  height: `${getCardSize(i)}px`,
                                  transition: "width 0.3s, height 0.3s",
                                }}
                                dangerouslySetInnerHTML={{ __html: f.svg }}
                              />
                            )}
                          </div>
                          <div
                            className="w-full fading-description"
                            style={{ transition: "opacity 0.2s linear" }}
                          >
                            <p className="text-sm text-[#252525] tracking-normal">
                              {f.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  ) : f.isFinal ? (
                    <>
                      <div className="bg-[#D2F944] flex flex-col w-full h-full">
                        <div className="p-5 flex items-start justify-start mb-20 max-w-xs">
                          <h2 className="text-[112px] text-[#252525] leading-[1]">
                            {f.title}
                          </h2>
                        </div>
                        <div className="flex flex-col max-w-xs self-center">
                          <p className="text-lg text-left text-[#252525] mt-2 mb-6">
                            {f.heading}
                          </p>
                          <div className="flex items-start w-full">
                            <button
                              className="self-start rounded-md bg-transparent px-[26px] py-[13px] text-[#252525] border border-solid border-[#7e7e7e]"
                              type="button"
                              onClick={() => {
                                window.location.href =
                                  "https://panel.moracode-dev.com/login";
                              }}
                            >
                              <span className="flex items-center gap-[10px]">
                                LOG IN
                                <svg
                                  width="14"
                                  height="12"
                                  viewBox="0 0 14 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ fill: "#252525" }}
                                >
                                  <path d="M14 6C14 6.20053 13.9246 6.37731 13.7738 6.53034L8.76037 11.7784C8.61461 11.9261 8.45127 12 8.27033 12C8.08436 12 7.92856 11.934 7.80291 11.8021C7.67726 11.6755 7.61443 11.5145 7.61443 11.3193C7.61443 11.2243 7.62951 11.1346 7.65967 11.0501C7.68982 10.9604 7.73506 10.8839 7.79537 10.8206L9.48411 9.01583L12.4771 6.15831L12.6279 6.54617L10.2003 6.70449H0.663436C0.467421 6.70449 0.306588 6.63852 0.180937 6.5066C0.0603123 6.37467 0 6.2058 0 6C0 5.7942 0.0603123 5.62533 0.180937 5.4934C0.306588 5.36148 0.467421 5.29551 0.663436 5.29551H10.2003L12.6279 5.45383L12.4771 5.8496L9.48411 2.98417L7.79537 1.17942C7.73506 1.1161 7.68982 1.04222 7.65967 0.957784C7.62951 0.868074 7.61443 0.775726 7.61443 0.680739C7.61443 0.485488 7.67726 0.324538 7.80291 0.197889C7.92856 0.0659631 8.08436 0 8.27033 0C8.3608 0 8.44624 0.0184697 8.52666 0.055409C8.6121 0.0923483 8.69503 0.153034 8.77544 0.237467L13.7738 5.46966C13.9246 5.62269 14 5.79947 14 6Z" />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="relative h-full w-full">
                      <div
                        className="absolute inset-0 p-5 flex flex-col justify-between h-full full-content"
                        style={{ visibility: "visible" }}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="max-w-xs">
                            <p className="text-md mb-2 text-[#252525] tracking-normal">
                              {f.title}
                            </p>
                            <FadingElement
                              text={f.heading}
                              elementType="h2"
                              className="md:w-[260px] md:text-[28px] text-[22px] font-mono mb-0 text-[#252525] tracking-normal"
                            />
                          </div>
                          {f.svg && (
                            <div className="w-24 flex items-center justify-center">
                              <span
                                dangerouslySetInnerHTML={{ __html: f.svg }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="h-[150px]">
                          <FadingElement
                            text={f.desc}
                            elementType="p"
                            className="md:w-[350px] text-md text-[#252525] tracking-normal"
                          />
                        </div>
                      </div>
                      <div
                        className="absolute inset-0 p-5 flex flex-col justify-between h-full items-center collapsed-content"
                        style={{ visibility: "hidden" }}
                      >
                        <p className="text-md text-left w-full">{f.title}</p>
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
