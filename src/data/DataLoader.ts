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





function createCraftingItem(
    id: number,
    name: string,
    rarity: string,
    priceCp: number,
    usedFor: string,
    recipes: RecipeItem[]
): CraftingItem {
    return {
        id,
        name,
        rarity,
        priceCp,
        usedFor,
        school: "",
        recipes
    }
}

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


function genGarbo() {
    let garbo: CraftingItem[] = [];
    for(let i = itemData.itemList.length; i < 4000; i++) {
        let rar = Math.floor(Math.random() * 7);
        let scho = Math.floor(Math.random() * 14);
        let use = Math.floor(Math.random() * 14);
        let price = Math.floor(Math.random() * 2000);

        let material = Math.floor(Math.random() * 4000);

        let rec: RecipeItem = {id: 0,school: usedForOptions[scho], dc: 10, checks: 2, materials: [{id: -1, name: material.toString(), quantity: rar+1}]}
        garbo.push(createCraftingItem(i, i.toString(), rarityOptions[rar], price, usedForOptions[use], [rec]))
    }
    return garbo;
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