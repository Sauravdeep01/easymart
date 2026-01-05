/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FF6B6B', // Example color from the image button likely
                secondary: '#f8f9fa',
            }
        },
    },
    plugins: [],
}
