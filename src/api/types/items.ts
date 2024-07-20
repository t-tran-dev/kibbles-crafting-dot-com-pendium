import { ModType, Rarity, School } from "./filterOptions";

export type CraftingItem = RawItem & {
  // id: number;
  // name: string;
  // rarity: Rarity;
  // priceCp: number;
  // usedFor: School;
  // recipes: RecipeItem[];
  schools: School[];
  // type: string;
  // source: string;
};

export type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
};

export type RawItem = {
  id: number;
  name: string;
  rarity: Rarity;
  priceCp: number | null;
  usedFor: string | null;
  recipes: RecipeItem[];
  source: string;
};

export type RecipeItem = {
  id: number;
  school: School;
  checks: number | null;
  dc: number | null;
  notes: string | null;
  materials: InventoryItem[];
  modType: ModType;
};

export type ItemData = {
  itemList: CraftingItem[];
  usedFor: readonly School[];
  rarity: readonly Rarity[];
};

export type InventoryTableItem = Omit<RawItem, "recipes">;
