import { useRef, useEffect, useState } from "react";

const items = [
	{
		title: "OUR DISCORD",
		desc: "Lorem ipsum dolor sit amet",
		button: "JOIN DISCORD",
		buttonColor: "#D2F944",
		link: "#",
	},
	{
		title: "JOIN REDDIT",
		desc: "Lorem Ipsum",
		button: "JOIN REDDIT",
		buttonColor: "#D2F944",
		link: "#",
	},
	{
		title: "GET IN TOUCH DIRECTLY",
		desc: "Lorem ipsum dolor sit amet",
		button: "SEND MESSAGE",
		buttonColor: "#D2F944",
		link: "#",
	},
];

export default function CommunityConnectSection() {
	const sectionRef = useRef(null);
	const [collapsed, setCollapsed] = useState([false, false, false]);

	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current) return;
			const windowHeight = window.innerHeight;
			const collapseStep = 120;

			let scrollY =
				window.scrollY + windowHeight * 0.2 - sectionRef.current.offsetTop;
			let newCollapsed = [false, false, false];
			if (scrollY >= 0) newCollapsed[0] = scrollY >= collapseStep * 1;
			if (scrollY >= collapseStep) newCollapsed[1] = scrollY >= collapseStep * 2;
			if (scrollY >= collapseStep * 2) newCollapsed[2] = scrollY >= collapseStep * 3;

			// Only update if changed
			if (
				newCollapsed[0] !== collapsed[0] ||
				newCollapsed[1] !== collapsed[1] ||
				newCollapsed[2] !== collapsed[2]
			) {
				setCollapsed(newCollapsed);
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [collapsed]);

	return (
		<section
			ref={sectionRef}
			className="bg-white border border-gray-400 py-0 px-0"
		>
			<div className="mx-auto">
				{items.map((item, i) => (
					<div
						key={i}
						className={`flex items-center border-b border-gray-400 last:border-b-0 transition-all duration-500`}
						style={{							
							padding: "32px 0",							
						}}
					>
						{/* Left: Info & Button */}
						<div className="w-1/3 flex flex-col justify-between px-4">
							{!collapsed[i] && (
								<div>
									<div className="text-xl mb-1">{item.title}</div>
									<div className="text-xs mb-6">{item.desc}</div>
								</div>
							)}
							<a
								href={item.link}
								className="inline-block mt-2 rounded px-6 py-3 font-semibold text-base border border-gray-900 transition-colors"
								style={{
									background: item.buttonColor,
									color: "#191919",
									marginTop: !collapsed[i] ? 16 : 0,
									fontSize: "15px",
									padding: "10px 24px",
									transition: "all 0.3s",
								}}
							>
								{item.button} <span aria-hidden>→</span>
							</a>
						</div>
						{/* Right: Box */}
						<div
							className="transition-all duration-500 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden"
							style={{
								width: "100%",
								height: !collapsed[i] ? 400 : 100,
								marginLeft: 32,
								marginRight: 16,
								minWidth: 120,
								maxWidth: "100%",
								minHeight: 100,
							}}
						>						
						</div>
					</div>
				))}
			</div>
		</section>
	);
}