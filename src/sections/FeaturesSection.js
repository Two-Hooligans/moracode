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

function MobileFeatures({ cards }) {
  return (
    <section id="features" className="bg-[#DDDDDD] pt-20 md:hidden">
      <h2 className="px-4 text-[32px] text-[#252525] mb-10 max-w-4xl leading-[1.3]">
        BY DEVELOPERS FOR DEVELOPERS AND FOCUSED ON THE WORKFLOW
      </h2>

      <div className="flex flex-col">
        {cards.map((c, i) =>
          c.isFinal ? (
            <div
              key={i}
              className="bg-[#D2F944] border border-[#C4C4C4] rounded-md py-12 px-4 flex flex-col"
            >
              <h2 className="text-[80px] font-mono text-[#252525] leading-none mb-20">
                {c.title}
              </h2>
              <p className="text-md text-[#252525]">{c.heading}</p>
              <button
                onClick={() =>
                  (window.location.href =
                    "https://panel.moracode-dev.com/login")
                }
                className="mt-6 self-start rounded-md border border-[#252525] px-7 py-3 text-[#252525]"
              >
                LOG IN
              </button>
            </div>
          ) : (
            <div
              key={i}
              className="bg-[#DDDDDD] border border-[#C4C4C4] rounded-md py-8 px-4 flex flex-col gap-[25vw]"
            >
              <div className="flex justify-between items-start gap-8">
                <div>
                  <p className="text-md mb-1 text-[#252525]">{c.title}</p>
                  <h3 className="text-[22px] text-[#252525]">{c.heading}</h3>
                </div>
                {c.svg && (
                  <span
                    className="w-[107px] h-[224px]"
                    dangerouslySetInnerHTML={{ __html: c.svg }}
                  />
                )}
              </div>
              <p className="text-md text-[#252525]">{c.desc}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function DesktopFeatures({ allCards, vw }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const scrollRef = useRef(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const isLaptop = vw < 1440 && vw >= 1024;

  const startScrollBuffer = 150;
  const endScrollBuffer = 150;
  const scrollDurationMultiplier = 3;
  const minRatio = 0.1;
  const maxRatio = 0.3;

  const cardRefs = useRef([]);
  cardRefs.current = allCards.map((_, i) => cardRefs.current[i] ?? createRef());

  const [collapseStep, setCollapseStep] = useState(0);
  const [totalCollapse, setTotalCollapse] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const calcHeader = () => {
      const h = document.querySelector("header");
      if (h) setHeaderHeight(h.offsetHeight);
    };
    calcHeader();
    window.addEventListener("resize", calcHeader);
    return () => window.removeEventListener("resize", calcHeader);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const step =
        window.innerWidth * (maxRatio - minRatio) * scrollDurationMultiplier;
      const total = (allCards.length - 1) * step;
      setCollapseStep(step);
      setTotalCollapse(total);
      setSectionHeight(
        total + window.innerHeight + startScrollBuffer + endScrollBuffer
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [allCards.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      if (!stickyRef.current || !sectionRef.current) return;
      const stickyStart = sectionRef.current.offsetTop;
      const start = stickyStart + startScrollBuffer;
      const y = window.scrollY;

      let local = 0;
      if (y < start) local = 0;
      else if (y > start + totalCollapse) local = totalCollapse;
      else local = y - start;

      scrollRef.current = local;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [totalCollapse]);

  useEffect(() => {
    let id;
    const animate = () => {
      if (collapseStep <= 0 || typeof window === "undefined") {
        id = requestAnimationFrame(animate);
        return;
      }
      cardRefs.current.forEach((ref, i) => {
        const el = ref.current;
        if (!el || allCards[i].isFinal) return;

        const start = i * collapseStep;
        const progress = Math.min(
          1,
          Math.max(0, (scrollRef.current - start) / collapseStep)
        );

        const newW = maxRatio - (maxRatio - minRatio) * progress;
        el.style.width = `${newW * 100}vw`;

        const full = el.querySelector(".full-content");
        const collapsed = el.querySelector(".collapsed-content");
        const fading = el.querySelectorAll(".fading-description");

        if (full && collapsed && fading) {
          full.style.visibility = progress < 0.7 ? "visible" : "hidden";
          collapsed.style.visibility = progress >= 0.7 ? "visible" : "hidden";
          const op = Math.max(0, 1 - progress);
          fading.forEach((e) => (e.style.opacity = op));
        }
      });
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [collapseStep, allCards]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <section className="py-14 bg-[#DDDDDD]" />
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
          <h2 className="md:text-[42px] text-[#252525] mb-10 md:mb-28 px-4 max-w-4xl tracking-normal md:leading-none leading-[1.2]">
            BY DEVELOPERS FOR DEVELOPERS AND FOCUSED ON THE WORKFLOW
          </h2>

          <div
            className="flex flex-row items-stretch justify-start"
            style={{
              height: `${!isLaptop ? "71.2vh" : "68.3vh"}`,
              width: "100%",
            }}
          >
            {allCards.map((f, i) => {
              const initialW = f.isFinal ? 0.5 : maxRatio;
              const style = {
                width: `${initialW * 100}vw`,
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

              return (
                <div
                  key={f.title || i}
                  ref={cardRefs.current[i]}
                  className="border flex flex-col"
                  style={style}
                >
                  {f.isFinal ? (
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
                            onClick={() =>
                              (window.location.href =
                                "https://panel.moracode-dev.com/login")
                            }
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

function FeaturesSection() {
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

  const [vw, setVw] = useState(1024);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw < 768;

  return isMobile ? (
    <MobileFeatures cards={allCards} />
  ) : (
    <DesktopFeatures allCards={allCards} vw={vw} />
  );
}

export default FeaturesSection;
