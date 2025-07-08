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
		heading: "DEEP CONTEXT\nAWARENESS",
		desc: "Each project space is self-contained, with its own files and context, allowing the AI to stay focused and precise—especially useful for complex, multi-layered development work.",
		img: "/assets/images/feature5.svg",
	},
];

function FeaturesSection() {
	const sectionRef = useRef(null);
	const cardsRef = useRef(null);
	const [scroll, setScroll] = useState(0);

	const cardWidth = 340;
	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current || !cardsRef.current) return;
			const section = sectionRef.current;
			const windowHeight = window.innerHeight;
			const totalCards = features.length + 1; 
			const totalWidth = totalCards * cardWidth;
			const scrollable = totalWidth - section.offsetWidth + 64; 

			const start = section.offsetTop - windowHeight * 0.15;
			const end = start + scrollable;

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
					className="relative mx-auto flex"
					style={{												
						overflow: "scroll",
					}}
				>
					{[...features, { title: "", heading: "", desc: "", img: "", isFinal: true }].map((f, i) => (
						<div
							key={i}
							className={`border flex flex-col ${f.isFinal ? "" : "bg-[#DDDDDD] border-gray-300"}`}
							style={{
								width: cardWidth,
								minHeight: 400,
								flex: "0 0 auto",
								background: f.isFinal ? "#D2F944" : undefined,
							}}
						>
							<div className="p-6 flex flex-col h-full items-center justify-center">
								{f.isFinal ? (
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
					))}
				</div>
			</div>
		</section>
	);
}

export default FeaturesSection;