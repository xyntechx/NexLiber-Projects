const FIXED_COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
];

let SCRAMBLED_COLORS: string[] = [];
while (SCRAMBLED_COLORS.length !== 7) {
    const color = FIXED_COLORS[Math.floor(Math.random() * 7)];
    if (!SCRAMBLED_COLORS.includes(color)) SCRAMBLED_COLORS.push(color);
}

const COLORS = {
    fixed: FIXED_COLORS,
    scrambled: SCRAMBLED_COLORS,
};

export default COLORS;
