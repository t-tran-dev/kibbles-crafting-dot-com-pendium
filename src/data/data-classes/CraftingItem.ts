import {InventoryItem} from "./InventoryItem";

export interface RecipeItem {
    id: number
    school: string;
    checks: number;
    dc: number;
    materials: InventoryItem[];
}

export interface CraftingItem {
    id: number;
    name: string;
    rarity: string;
    priceCp: number;
    usedFor: string;
    recipes: RecipeItem[];
    school: string;
}