/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        large: ["2.125rem", { lineHeight: "140%", fontWeight: "700" }],
        t1: ["1.75rem", { lineHeight: "140%", fontWeight: "700" }],
        t2: ["1.5rem", { lineHeight: "140%", fontWeight: "700" }],
        t3: ["1.25rem", { lineHeight: "140%", fontWeight: "700" }],
        headline: ["1.125rem", { lineHeight: "140%", fontWeight: "600" }],
        b1: ["1.125rem", { lineHeight: "150%", fontWeight: "500" }],
        b2: ["1rem", { lineHeight: "150%", fontWeight: "500" }],
        b3: ["0.875rem", { lineHeight: "150%", fontWeight: "500" }],
        footnote: ["0.8125rem", { lineHeight: "150%", fontWeight: "400" }],
        cap1: ["0.75rem", { lineHeight: "120%", fontWeight: "500" }],
        cap2: ["0.6875rem", { lineHeight: "120%", fontWeight: "500" }],
        btn1: ["1.125rem", { lineHeight: "100%", fontWeight: "600" }],
        btn2: ["1rem", { lineHeight: "100%", fontWeight: "600" }],
        btn3: ["0.875rem", { lineHeight: "100%", fontWeight: "500" }],
      },
      colors: {
        green: {
          light: "#EAFAF4",
          DEFAULT: "#2AD18E",
          hover: "#26BC80",
          active: "#22A772",
        },
        gray: {
          1: "#F9F9F9",
          2: "#E5E5E5",
          3: "#C3C3C3",
          4: "#8C8C8C",
          5: "#5E5E5E",
        },
        white: "#FFFFFF",
        black: "#222222",
        red: "#F36563",
        yellow: "#FEE500",
      },
    },
    boxShadow: {
      "custom-gray": "0px 1px 4px 0px rgba(85, 85, 85, 0.20)"
    }
  },

  plugins: [],
};
