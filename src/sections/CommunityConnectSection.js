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
			const rect = sectionRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const collapseStep = 100;

			// Start collapsing earlier by increasing the multiplier
			let scrollY =
				window.scrollY + windowHeight * 0.6 - sectionRef.current.offsetTop;
			let newCollapsed = [false, false, false];
			if (scrollY > 0) newCollapsed[0] = scrollY > collapseStep * 1;
			if (scrollY > collapseStep) newCollapsed[1] = scrollY > collapseStep * 2;
			if (scrollY > collapseStep * 2) newCollapsed[2] = scrollY > collapseStep * 3;
			setCollapsed(newCollapsed);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section
			ref={sectionRef}
			className="bg-white border border-gray-400 py-0 px-0"
		>
			<div className="max-w-6xl mx-auto">
				{items.map((item, i) => (
					<div
						key={i}
						className={`flex items-center border-b border-gray-400 last:border-b-0 transition-all duration-500`}
						style={{
							minHeight: 180,
							padding: "32px 0",							
						}}
					>
						{/* Left: Info & Button */}
						<div className="w-1/3 flex flex-col justify-between px-4">
							{!collapsed[i] && (
								<div>
									<div className="font-mono text-xl mb-1">{item.title}</div>
									<div className="text-xs font-mono mb-6">{item.desc}</div>
								</div>
							)}
							<a
								href={item.link}
								className="inline-block mt-2 rounded px-6 py-3 font-mono font-semibold text-base border border-gray-900 transition-colors"
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
						{/* Right: Box (photo placeholder, always full width) */}
						<div
							className={`transition-all duration-500 bg-gray-200 rounded-xl flex items-center justify-center`}
							style={{
								width: "100%",
								height: 120,
								marginLeft: 32,
								marginRight: 16,
								minWidth: 120,
								maxWidth: "100%",
								minHeight: 60,
								fontSize: 22,
								color: "#888",
								fontFamily: "monospace",
								letterSpacing: 2,								
							}}
						>
							PHOTO
						</div>
					</div>
				))}
			</div>
		</section>
	);
}