import { useRef, useEffect, useState } from "react";

const features = [
	{
		title: "SAFE",
		heading: "PRIVATE SENIOR\nAI CODE ENGINEER",
		desc: "Your code never leaves your cloud. Everything runs locally on your machine, with zero data passing through our servers.",
		img: "/assets/images/feature1.svg",
	},
	{
		title: "PRIVATE",
		heading: "YOUR OWN CODE\nAND FILES",
		desc: "Add your own documents, source code, and reference material into each project.",
		img: "/assets/images/feature2.svg",
	},
	{
		title: "ORGANIZED",
		heading: "PROJECT-BASED\nWORKFLOWS",
		desc: "Add your own documents, source code, and reference material into each project.",
		img: "/assets/images/feature3.svg",
	},
	{
		title: "INTELLIGENT",
		heading: "DEEP CONTEXT\nAWARENESS",
		desc: "Each project space is self-contained, with its own files and context, allowing the AI to stay focused and precise—especially useful for complex, multi-layered development work.",
		img: "/assets/images/feature4.svg",
	},
	{
		title: "SECURE",
		heading: "",
		desc: "",
		img: "/assets/images/feature5.svg",
	},
];

function FeaturesSection() {
	const sectionRef = useRef(null);
	const cardsRef = useRef(null);
	const [scroll, setScroll] = useState(0);

	// Card and layout constants
	const cardWidth = 340;
	const gap = 0;
	const visibleCards = 2.5; // How many cards are visible at start

	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current || !cardsRef.current) return;
			const section = sectionRef.current;
			const cards = cardsRef.current;
			const sectionRect = section.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const totalCards = features.length + 1; // +1 for yellow card
			const totalWidth = totalCards * cardWidth;
			const scrollable = totalWidth - section.offsetWidth + 64; // 64 for padding

			// Where the sticky section starts and ends
			const start = section.offsetTop - windowHeight * 0.15;
			const end = start + scrollable;

			// Clamp scroll
			const y = window.scrollY;
			if (y < start) {
				setScroll(0);
			} else if (y > end) {
				setScroll(scrollable);
			} else {
				setScroll(y - start);
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	// Scale cards based on their distance from the left edge (as they move out, they shrink)
	const getScale = (i) => {
		const left = i * cardWidth - scroll;
		const center = (window.innerWidth - cardWidth) / 2;
		const dist = Math.abs(left - center);
		// Shrink more as they move out of view
		return Math.max(0.85, 1 - dist / 1200);
	};

	// Section height: enough to scroll all cards horizontally
	const totalCards = features.length + 1;
	const scrollableWidth = totalCards * cardWidth;
	const sectionHeight = scrollableWidth + 600;

	return (
		<section
			ref={sectionRef}
			className="relative w-full bg-[#DDDDDD] py-16"
			style={{
				height: `${sectionHeight}px`,
			}}
		>
			<div className="sticky top-0 left-0 w-full h-[520px] bg-[#DDDDDD] z-10 overflow-hidden">
				<h2 className="font-mono text-2xl md:text-3xl font-bold text-gray-900 mb-8 px-8 pt-8">
					BY DEVELOPERS FOR DEVELOPERS AND
					<br />FOCUSED ON THE WORKFLOW
				</h2>
				<div
					ref={cardsRef}
					className="flex gap-0 absolute left-0 top-32 px-8"
					style={{
						transform: `translateX(-${scroll}px)`,
						transition: "transform 0.1s",
						willChange: "transform",
					}}
				>
					{[...features, { title: "", heading: "", desc: "", img: "", isFinal: true }].map((f, i) => {
						// Calculate how far we've scrolled in "cards"
						const progress = scroll / cardWidth;
						// If this card index is less than progress, it's collapsed and stacked
						const isCollapsed = i < progress;
						// The currently open card
						const isActive = Math.floor(progress) === i;
						// The last card (yellow)
						const isFinal = f.isFinal;

						// Collapsed cards stack at the left, open card slides in, others follow
						let x = 0;
						if (isCollapsed) {
							x = i * 60; // collapsed width (adjust as needed)
						} else {
							x = progress * 60 + (i - progress) * cardWidth;
						}

						// Scale and zIndex
						const scale = isCollapsed ? 0.7 : isActive ? 1 : 0.92;
						const zIndex = isActive ? 20 : 10 - i;

						return (
							<div
								key={i}
								className={`border flex flex-col transition-all duration-300 ${isFinal ? "" : "bg-[#DDDDDD] border-gray-300"} ${isFinal ? "" : ""}`}
								style={{
									width: cardWidth,
									minHeight: 400,
									position: "absolute",
									left: `${x}px`,
									top: 0,
									zIndex,
									transform: `scale(${scale})`,
									opacity: 1,
									background: isFinal ? "#D2F944" : undefined,
									boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.08)" : "none",
									transition: "all 0.3s",
								}}
							>
								<div className="p-6 flex flex-col h-full items-center justify-center">
									{isFinal ? (
										<>
											<div className="font-mono text-2xl font-bold mb-4 text-gray-900 text-center">
												GET STARTED
											</div>
											<button
												className="rounded px-6 py-3 font-mono font-semibold text-base transition-colors border border-gray-900"
												style={{ backgroundColor: "#191919", color: "#D2F944" }}
											>
												START NOW →
											</button>
										</>
									) : (
										<>
											<div className="text-xs font-mono mb-2">{f.title}</div>
											<div className="font-mono text-2xl whitespace-pre-line mb-4">{f.heading}</div>
											{f.img && (
												<img src={f.img} alt="" className="mb-4 w-24 h-24 object-contain" />
											)}
											<div className="text-sm text-gray-700 font-mono mt-auto">{f.desc}</div>
										</>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default FeaturesSection;