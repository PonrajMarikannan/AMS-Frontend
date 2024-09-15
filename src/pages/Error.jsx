import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";


const ShapeOne = () => {
	return (
		<svg
			className="absolute top-0 left-0 hidden lg:block text-[#fffaea] dark:text-[#1e2735] -z-[1]"
			width="414"
			height="460"
			viewBox="0 0 414 460"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<ellipse
				cx="79.5"
				cy="131.487"
				rx="334.5"
				ry="328.306"
				fill="currentColor"
			/>
		</svg>
	);
};

const ShapeTwo = () => {
	return (
		<svg
			className="absolute bottom-0 right-0 none lg:block text-[#fffaea] dark:text-[#1e2735] -z-[1]"
			width="355"
			height="363"
			viewBox="0 0 355 363"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<ellipse
				cx="334.5"
				cy="328.599"
				rx="334.5"
				ry="328.306"
				fill="currentColor"
			/>
		</svg>
	);
};

const ShapeThree = () => {
	return (
		<img
			src="https://cdn.easyfrontend.com/pictures/httpcodes/five-shape-three.svg"
			alt=""
			className="absolute bottom-0 left-0 -z-[1]"
		/>
	);
};

const ShapeFour = () => {
	return (
		<img
			src="https://cdn.easyfrontend.com/pictures/httpcodes/five-shape-four.svg"
			alt=""
			className="absolute bottom-0 left-36 hidden lg:block -z-[1]"
		/>
	);
};

const ShapeFive = () => {
	return (
		<img
			src="https://cdn.easyfrontend.com/pictures/httpcodes/five-shape-five.svg"
			alt=""
			className="absolute bottom-12 right-12 hidden lg:block -z-[1]"
		/>
	);
};

const ShapeSix = () => {
	return (
		<svg
			className="absolute top-12 right-12 -z-[1]"
			width="189"
			height="190"
			viewBox="0 0 189 190"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M32.423 0.460938L189 157.038C145.769 200.269 75.6536 200.269 32.423 157.038C-10.8077 113.807 -10.8077 43.7139 32.423 0.460938Z"
				fill="#6B9BA5"
				fillOpacity="0.25"
			/>
		</svg>
	);
};


const Error = () => {
	return (
		<section className="ezy__httpcodes5 light py-28 md:py-48 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-[1]">
			<ShapeOne />
			<ShapeTwo />
			<ShapeThree />
			<ShapeFour />
			<ShapeFive />
			<ShapeSix />

			<div className="container px-4 mx-auto">
				<div className="text-center">
					<div className="text-8xl md:text-8xl">
						<FontAwesomeIcon icon={faFrown} />
					</div>
					<h2 role="no" className="font-bold text-8xl leading-none md:text-[160px] mb-6">
						404
					</h2>
					<p role="notfound" className="text-5xl mb-2">Page not Available!</p>
				</div>
				

			</div>
		</section>
	);
};


export default Error