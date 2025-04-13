/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include your React components
    "./.storybook/**/*.{js,jsx,ts,tsx}", // Include Storybook files
    "./stories/**/*.{js,jsx,ts,tsx}", // Include any additional story files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

