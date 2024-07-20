import { InventoryItem } from "./types";
import { CraftingItem } from "./types/items";
import { ImportExportData } from "./types/importExportData";
import { itemData } from "./api";

export function cookifyInventory(
  inventory: Map<string, InventoryItem>
): number[][] {
  let invData: number[][] = [];

  if (inventory) {
    inventory.forEach((item) => {
      invData.push([item.id, item.quantity]);
    });
  }

  return invData;
}

export function parseInventory(
  invData: number[][]
): Map<string, InventoryItem> {
  let inventory = new Map<string, InventoryItem>();

  if (invData) {
    try {
      invData.forEach((inv) => {
        let item = itemData.itemList[inv[0]];

        inventory.set(item.name.toLowerCase(), {
          name: item.name,
          id: item.id,
          quantity: inv[1],
        });
      });
    } catch (e) {
      console.log("Error with inventory data: " + invData);
    }
  }

  return inventory;
}

export function cookifyProjWishlist(craftingList: CraftingItem[]): number[] {
  let data: number[] = [];

  if (craftingList) {
    craftingList.forEach((item) => {
      data.push(item.id);
    });
  }

  return data;
}

export function parseProjWishList(data: number[]): CraftingItem[] {
  let craftingList: CraftingItem[] = [];

  if (data) {
    try {
      data.forEach((da) => {
        let item = itemData.itemList[da];

        craftingList.push(item);
      });
    } catch (e) {
      console.log("Error with wishlist or active project data: " + data);
    }
  }
  return craftingList;
}

export function exportCraftingData(
  wishlist: number[],
  active: number[],
  inventory: number[][]
): string {
  const exportData: ImportExportData = {
    inventory: inventory,
    wishlist: wishlist,
    active: active,
  };

  return JSON.stringify(exportData);
}

export function importCraftingData(data: string): ImportExportData {
  return JSON.parse(data);
}
