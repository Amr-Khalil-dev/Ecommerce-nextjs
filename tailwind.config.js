/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"dark-bg": "#1f263a",//
				"dark-blue": "#0e121e",
				"dark": "#00000024",
				"light": "#ffffff24",
				"light-darkblue": "#222b46",
				"brand-color": "#bcd767"
			}
		},
	},
	plugins: [],
};
