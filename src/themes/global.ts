export const supply25Theme = {
  white: { hex: "#FFFFFF", rgb: "255,255,255" },
  plum: { hex: "#3d214d", rgb: "61,33,77" },
  aubergine: { hex: "#4c266c", rgb: "76,38,108" },
  darkSlate: { hex: "#373d5c", rgb: "55,61,92" },
  slate: { hex: "#555f8f", rgb: "85,95,143" },
  lightSlate: { hex: "#6670a2", rgb: "102,112,162" },
  hotPink: { hex: "#ff5294", rgb: "255,82,148" },
  candyPink: { hex: "#ff8fff", rgb: "255,143,255" },
  fluoroMint: { hex: "#47ff96", rgb: "71,255,150" },
  aquaBlue: { hex: "#b5ffff", rgb: "181,255,255" },
  powderBlue: { hex: "#7f97ff", rgb: "127,151,255" },
  cornflowerBlue: { hex: "#4166f5", rgb: "65,102,245" },
  mistyBlue: { hex: "#e6eaf9", rgb: "230,234,249" },
  lightMistyBlue: { hex: "#f7f9fd", rgb: "247,249,253" },
  burntOrange: { hex: "#FF6212", rgb: "255,95,18" },
  seashell: { hex: "#FFF3ED", rgb: "255,243,277" },
  shadow: { hex: "#323247", rgb: "50,50,71" },
};

type ColourNames = keyof typeof supply25Theme;

export const getHex = (colour: ColourNames): string => {
  return supply25Theme[colour]?.hex;
};

export const getRgb = (colour: ColourNames): string => {
  return supply25Theme[colour]?.rgb;
};
