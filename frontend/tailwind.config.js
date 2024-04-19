/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mulish: ["Mulish", "sans-serif"]
            },
            screens: {
                'max1200px': { 'max': '1200px' },
            }
        },
    },
    plugins: [],
};
