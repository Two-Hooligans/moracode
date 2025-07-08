import { useState } from "react";

const faqs = [
  {
    question: "WHAT IS MORACODE",
    answer:
      "We are revolutionizing code analysis by putting privacy and security first. Our platform empowers developers to leverage AI while maintaining complete control over their code and data.",
  },
  {
    question: "WHAT LANGUAGE MODELS IT PROVIDES?",
    answer:
      "Moracode supports a variety of leading language models for code analysis and generation.",
  },
  {
    question: "HOW DO I SET UP MY API?",
    answer:
      "You can set up your API by following the instructions in our documentation.",
  },
  {
    question: "IS MORACODE TRULY SECURE?",
    answer:
      "Yes, all code analysis runs locally and your code never leaves your machine.",
  },
  {
    question: "IS IT FREE?",
    answer:
      "Moracode offers a free tier with core features. Advanced features may require a subscription.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#DDDDDD] border border-gray-400 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl mb-8">FAQ</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-300">
              <div className="flex items-start justify-between py-4">
                <div className="text-base md:text-lg">
                  {faq.question}
                </div>
                <button
                  className={`ml-4 flex items-center justify-center rounded-full border transition-colors duration-200
                    ${
                      open === i
                        ? "bg-black border-black text-[#D2F944]"
                        : "bg-[#D2F944] border-[#D2F944] text-black"
                    }
                  `}
                  style={{
                    width: 32,
                    height: 32,
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-label={open === i ? "Collapse" : "Expand"}
                >
                  {open === i ? "−" : "+"}
                </button>
              </div>
              {open === i && (
                <div className="text-xs text-gray-800 pb-6 pl-1 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
