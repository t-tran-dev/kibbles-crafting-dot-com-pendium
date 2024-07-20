import rawItemData from "./data.json";
import {
  CraftingItem,
  InventoryItem,
  ItemData,
  RawItem,
  RecipeItem,
} from "./types";
import { RARITY_OPTIONS, School, SCHOOL_OPTIONS } from "./types/filterOptions";

const rawItems = rawItemData as RawItem[];

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const lookUpMaterialId = (material: InventoryItem): number => {
  return rawItems.findIndex((item) => {
    item.name.toLowerCase() === material.name.toLowerCase();
  });
};

const extractRecipesAndSchools = (recipes: RecipeItem[]) => {
  const schools: School[] = [];

  const modifiedRecipes: RecipeItem[] = recipes.map((recipe) => {
    schools.push(recipe.school);

    const { materials, ...rest } = recipe;

    const modifiedMaterials = materials.map((material) => {
      const materialId = lookUpMaterialId(material);
      return { ...material, ...{ id: materialId } };
    });

    const modfiedRecipe = {
      ...rest,
      ...{ materials: modifiedMaterials },
    } satisfies RecipeItem;

    return modfiedRecipe;
  });

  return { recipes: modifiedRecipes, schools };
};

const getItemData = () => {
  const items = rawItems.map((rawItem) => {
    const { name: rawItemName, recipes: rawItemRecipes, ...rest } = rawItem;
    const name = capitalizeString(rawItemName);
    const { recipes, schools } = extractRecipesAndSchools(rawItemRecipes);

    const modifiedItem = {
      recipes: recipes,
      schools: schools,
      name: name,
      ...rest,
    } satisfies CraftingItem;

    return modifiedItem;
  });

  return items;
};

export const itemData: ItemData = {
  usedFor: SCHOOL_OPTIONS,
  rarity: RARITY_OPTIONS,
  itemList: getItemData(),
};
