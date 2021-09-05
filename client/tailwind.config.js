module.exports = {
    purge: ["./src/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            spacing: {
                70: "17.5rem",
            },
        },
    },
    plugins: [],
};
