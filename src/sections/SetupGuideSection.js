import steps from '../data/guideSteps';

export default function SetupGuideSection() {
  return (
    <section className="bg-white py-44 px-4 md:px-8">
      <div className="mx-auto">
        <h2 className="text-3xl md:text-5xl text-gray-900 mb-40 max-w-6xl pr-16">
          START EXPLORING THE PRODUCT AND VALIDATE ITS PERFORMANCE, SECURITY,
          AND RELIABILITY FIRSTHAND
        </h2>
        <div className="text-2xl md:text-3xl mb-8">SET UP GUIDE:</div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex-1 pt-8 border-t-2 border-gray-300 relative ${
                idx === 1 ? "px-0 md:px-8" : "px-0"
              }`}
            >
              {/* Black bar for the first step */}
              {idx === 0 && (
                <div
                  className="absolute left-0 top-0 h-0.5 bg-black"
                  style={{
                    width: "30%",
                    transform: "translateY(-2px)",
                  }}
                />
              )}
              <div className={`flex gap-8 ${idx === 0 ? "items-center" : "items-start"  }`}>
                <span
                  className={`text-8xl font-normal leading-[0.9] ${
                    idx === 0 ? "" : "text-gray-400"
                  }`}
                >
                  {step.number}
                </span>
                <div>
                  <div
                    className={`text-4xl font-normal ${
                      idx === 0 ? "" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
              <div className="mt-6 text-xl text-gray-700 max-w-md ">{step.content}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
