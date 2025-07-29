import steps from "../data/guideSteps";

export default function SetupGuideSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-4 md:px-4">
      <div className="mx-auto">
        <h2 className="text-[32px] md:text-[42px] text-[#252525] tracking-tight mb-20 md:mb-40 w-full md:max-w-4xl leading-[1.2] md:leading-none">
          START EXPLORING THE PRODUCT AND VALIDATE ITS PERFORMANCE, SECURITY,
          AND RELIABILITY FIRSTHAND
        </h2>
        <div className="text-[24px] md:text-[32px] text-[#252525] tracking-normal mb-8">
          SET UP GUIDE:
        </div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex-1 pt-8 border-t-2 border-[#A4A4A4] relative ${
                idx === 1 ? "px-0 md:px-8" : "px-0"
              }`}
            >
              {/* Black bar for the first step */}
              {idx === 0 && (
                <div
                  className="absolute left-0 top-0 h-0.5 bg-[#070707]"
                  style={{
                    width: "30%",
                    transform: "translateY(-2px)",
                  }}
                />
              )}
              <div
                className={`flex gap-8 ${
                  idx === 0 ? "items-center" : "items-start"
                }`}
              >
                <span
                  className={`text-[80px] font-normal leading-[0.9] text-[#252525] ${
                    idx === 0 ? "" : "text-[#A4A4A4]"
                  }`}
                >
                  {step.number}
                </span>
                <div>
                  <div
                    className={`text-[28px] font-normal  ${
                      idx === 0 ? "text-[#252525]" : "text-[#A4A4A4]"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
              <div
                className={`mt-6 text-md max-w-sm tracking-normal 
                ${idx === 0 ? "text-[#252525]" : "text-[#A4A4A4]"}
                `}
              >
                {step.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
