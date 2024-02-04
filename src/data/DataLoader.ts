import {CraftingItem, RecipeItem} from "./data-classes/CraftingItem";
import axios from "axios";
import {InventoryItem} from "./data-classes/InventoryItem";

const usedForOptions = [
    "All",
    "Alchemy",
    "Blacksmithing",
    "Cooking",
    "Enchanting",
    "Engineering",
    "Jewelcrafting",
    "Leatherworking",
    "Poisoncraft",
    "Runecarving",
    "Scrollscribing",
    "Tinkering",
    "Wandwhittling",
    "Woodcarving"
]
const rarityOptions = [
    "All",
    "trivial",
    "common",
    "uncommon",
    "rare",
    "very rare",
    "legendary"
]

function populateMaterialIds(material: InventoryItem): number {
    let id = -1;

    for (let i = 0; i < itemData.itemList.length; i++) {
        const item = itemData.itemList[i];
        if (material.name.toLowerCase() == item.name.toLowerCase()) {
            id = item.id;
            i = itemData.itemList.length;
        }
    }
    return id;
}
export async function importItemData() {
    try {
        await axios
            .get<CraftingItem[]>("json/data.json")
            .then((res) => res.data)
            .then((data: CraftingItem[]) => {
                itemData.itemList = data;
                for(let i = 0; i < data.length; i++) {
                    itemData.itemList[i].id = i;
                }
                let garbo: CraftingItem[] =[];//= genGarbo();
                return garbo;
            }).then((garbo) => {
                itemData.itemList = itemData.itemList.concat(garbo);

                //Populate recipe data
                itemData.itemList.forEach( (item, itemIndex) => {
                    // took a ride with the devil
                    // he took me down to his level
                    item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);

                    let school = ""
                    if (!!item.recipes) {
                        item.recipes.forEach((recipe, recipeIndex) => {
                            school+= recipe.school + ", ";

                            recipe.materials.forEach((material, materialIndex) => {
                                    itemData.itemList[itemIndex].recipes[recipeIndex].materials[materialIndex].id = populateMaterialIds(material);
                                }
                            )
                        })
                    }
                    itemData.itemList[item.id].school = school;
                })
            });

    } catch (error) {
        console.error(error)
    }
}
interface ItemData {
    itemList: CraftingItem[];
    usedFor: string[];
    rarity: string[];
}

export const itemData: ItemData = {usedFor: usedForOptions, rarity: rarityOptions, itemList: []};