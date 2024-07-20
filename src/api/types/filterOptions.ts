export const SCHOOL_OPTIONS = [
  "Alchemy",
  "Blacksmithing",
  "Cooking",
  "Enchanting",
  "Engineering",
  "Jewelcrafting",
  "Runecarving",
  "Scrollscribing",
  "Tinkering",
  "Wandwhittling",
  "Woodcarving",
] as const;

export type School = (typeof SCHOOL_OPTIONS)[number];

export const RARITY_OPTIONS = [
  "trivial",
  "common",
  "uncommon",
  "rare",
  "very rare",
  "legendary",
] as const;

export type Rarity = (typeof RARITY_OPTIONS)[number];

export const MOD_TYPES = ["Weapon", "Armor", "Alchemy", "Woodcarving"] as const;

export type ModType = (typeof MOD_TYPES)[number];
