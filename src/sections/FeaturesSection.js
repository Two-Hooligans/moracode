import { useRef, useEffect, useState } from "react";
import features from "../data/features";
import { getCollapsedCards } from "../utils/featuresCollapse";

function FeaturesSection() {
	const sectionRef = useRef(null);
	const [scroll, setScroll] = useState(0);

	const allCards = [
		...features,
		{ title: "GET STARTED", isFinal: true }
	];

	const collapseStep = 150;
	const totalCollapse = (allCards.length - 1) * collapseStep;
	const [sectionHeight, setSectionHeight] = useState(totalCollapse + window.innerHeight);

	useEffect(() => {
		const handleResize = () => {
			setSectionHeight(totalCollapse + window.innerHeight);
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, [totalCollapse]);

	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current) return;
			const section = sectionRef.current;
			const start = section.offsetTop;
			const y = window.scrollY;

			let localScroll = 0;
			if (y < start) {
				localScroll = 0;
			} else if (y > start + totalCollapse) {
				localScroll = totalCollapse;
			} else {
				localScroll = y - start;
			}
			setScroll(localScroll);

			if (y > start + totalCollapse && localScroll < totalCollapse) {
				window.scrollTo({ top: start + totalCollapse, behavior: "auto" });
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: false });
		window.addEventListener("resize", handleScroll);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [totalCollapse]);

	const collapsedCards = getCollapsedCards(scroll, collapseStep, allCards.length);

	return (
		<section
			ref={sectionRef}
			className="relative w-full bg-[#DDDDDD] pt-20 md:pt-40"
			style={{
				height: sectionHeight,
			}}
		>
			<div className="sticky top-0 left-0 w-full h-[100vh] bg-[#DDDDDD] z-10 overflow-hidden">
				<h2 className="text-2xl md:text-5xl text-gray-900 mb-12 md:mb-28 px-4">
					BY DEVELOPERS FOR DEVELOPERS AND
					<br />FOCUSED ON THE WORKFLOW
				</h2>
				<div
					className="flex flex-col md:flex-row items-stretch justify-start gap-0"
					style={{
						height: "100%",
					}}
				>
					{allCards.map((f, i) => {
						const isCollapsed = collapsedCards[i];
						const mobile = typeof window !== "undefined" && window.innerWidth < 768;

						const cardStyle = mobile
							? {
								height: isCollapsed ? 60 : 370,
								width: "100%",
								minWidth: "100%",
								maxWidth: "100%",
							}
							: {
								width: f.isFinal ? "30%" : isCollapsed ? "15%" : "30%",
								minWidth: f.isFinal ? "30%" : isCollapsed ? "15%" : "30%",
								maxWidth: f.isFinal ? "30%" : isCollapsed ? "15%" : "30%",
								height: "75vh",
							};

						return (
							<div
								key={i}
								className={`border flex flex-col transition-all duration-500 ${f.isFinal ? "" : "bg-[#DDDDDD] border-gray-300"}`}
								style={{
									...cardStyle,
									flex: "0 0 auto",
									background: f.isFinal ? "#D2F944" : undefined,
									overflow: "hidden",
									alignItems: "center",
									justifyContent: "center",
									transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
									marginRight: 0,
								}}
							>
								<div className="p-4 flex flex-col h-full items-center justify-center w-full">
									{f.isFinal ? (
										<>
											<div className="text-2xl font-bold mb-4 text-gray-900 text-center">
												{f.title}
											</div>
											<button
												className="rounded px-6 py-3 font-semibold text-base transition-colors border border-gray-900"
												style={{ backgroundColor: "#191919", color: "#D2F944" }}
											>
												START NOW →
											</button>
										</>
									) : (
										<div className="flex flex-col h-full items-center justify-between w-full p-2 gap-4">
											{isCollapsed ? (
												<>
													<p className="text-sm mb-4 text-center w-full">{f.title}</p>
													{f.svg && (
														<div className="flex justify-center w-full">
															<div
																className="w-24 flex items-center justify-center"
																dangerouslySetInnerHTML={{ __html: f.svg }}
															/>
														</div>
													)}
												</>
											) : (
												<>
													<div className="flex items-center justify-between mb-4 w-full gap-7">
														<div>
															<p className="text-sm mb-4 text-left w-full">{f.title}</p>
															<h2 className="text-3xl whitespace-pre-line mb-4 text-left w-full">{f.heading}</h2>
														</div>
														<div>
															{f.svg && (
																<div
																	className="w-24  flex items-center justify-center"
																	dangerouslySetInnerHTML={{ __html: f.svg }}
																/>
															)}
														</div>
													</div>
													<div>
														<div className="text-sm md:text-lg text-gray-700 mt-auto text-left w-full">{f.desc}</div>
													</div>
												</>
											)}
										</div>
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