import { Intensity } from "../models/Intensity";
import { IntensityIndex } from "../models/IntensityIndex";
import { Item } from "../models/Item";
import { ItemResponse } from "../models/ItemResponse";

class ItemService {
  private isValidDate(date: any): date is Date {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private isValidIntensityLevel(index: any): index is IntensityIndex {
    return ["very low", "low", "moderate", "high", "very high"].includes(index);
  }

  private isValidIntensity(intensity: any): intensity is Intensity {
    return (
      intensity &&
      typeof intensity === "object" &&
      typeof intensity.forecast === "number" &&
      typeof intensity.actual === "number" &&
      this.isValidIntensityLevel(intensity.index)
    );
  }

  private isValidItem(item: any): item is Item {
    if (!item || typeof item !== "object") return false;

    const fromDate = new Date(item.from);
    const toDate = new Date(item.to);

    return (
      this.isValidDate(fromDate) &&
      this.isValidDate(toDate) &&
      this.isValidIntensity(item.intensity)
    );
  }

  private isValidItemResponse(data: any): data is ItemResponse {
    return (
      data &&
      typeof data === "object" &&
      Array.isArray(data.data) &&
      data.data.every((item: any) => this.isValidItem(item))
    );
  }

  private async loadJsonFile(): Promise<ItemResponse> {
    try {
      const data = require("../assets/data/item_data.json");

      if (!this.isValidItemResponse(data)) {
        throw new Error("Invalid JSON structure");
      }

      return {
        data: data.data.map((item) => ({
          ...item,
          from: new Date(item.from),
          to: new Date(item.to),
        })),
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error loading item data:", error.message);
        throw new Error(`Error loading item data: ${error.message}`);
      } else {
        console.error("Error loading item data: Unknown error type");
        throw new Error("Error loading item data: Unknown error");
      }
    }
  }

  async getItemData(): Promise<ItemResponse> {
    return await this.loadJsonFile();
  }
}

export const itemService = new ItemService();
