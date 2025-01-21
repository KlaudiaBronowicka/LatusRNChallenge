import { ItemResponse } from "../models/ItemResponse";
import { itemService } from "./ItemService";

describe("ItemService", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should return valid item data", async () => {
    jest.mock("../assets/data/item_data.json", () => ({
      data: [
        {
          from: "2018-01-20T12:00Z",
          to: "2018-01-20T12:30Z",
          intensity: {
            forecast: 266,
            actual: 263,
            index: "moderate",
          },
        },
        {
          from: "2018-01-20T12:30Z",
          to: "2018-01-20T13:00Z",
          intensity: {
            forecast: 267,
            actual: 265,
            index: "high",
          },
        },
      ],
    }));

    const expectedData: ItemResponse = {
      data: [
        {
          from: new Date("2018-01-20T12:00Z"),
          to: new Date("2018-01-20T12:30Z"),
          intensity: {
            forecast: 266,
            actual: 263,
            index: "moderate",
          },
        },
        {
          from: new Date("2018-01-20T12:30Z"),
          to: new Date("2018-01-20T13:00Z"),
          intensity: {
            forecast: 267,
            actual: 265,
            index: "high",
          },
        },
      ],
    };

    const data = await itemService.getItemData();
    expect(data).toEqual(expectedData);
  });

  it("should throw an error when the JSON structure is invalid", async () => {
    jest.mock("../assets/data/item_data.json", () => ({
      data: [
        {
          invalid: "structure",
          missing: "required fields",
        },
      ],
    }));

    await expect(itemService.getItemData()).rejects.toThrow(
      "Error loading item data: Invalid JSON structure"
    );
  });

  it("should throw an error when intensity data is invalid", async () => {
    jest.mock("../assets/data/item_data.json", () => ({
      data: [
        {
          from: "2018-01-20T12:00Z",
          to: "2018-01-20T12:30Z",
          intensity: {
            forecast: "not a number",
            actual: "not a number",
            index: "invalid index",
          },
        },
      ],
    }));

    await expect(itemService.getItemData()).rejects.toThrow(
      "Error loading item data: Invalid JSON structure"
    );
  });

  it("should throw an error when dates are invalid", async () => {
    jest.mock("../assets/data/item_data.json", () => ({
      data: [
        {
          from: "invalid date",
          to: "invalid date",
          intensity: {
            forecast: 266,
            actual: 263,
            index: "moderate",
          },
        },
      ],
    }));

    await expect(itemService.getItemData()).rejects.toThrow(
      "Error loading item data: Invalid JSON structure"
    );
  });

  it("should throw an error when data array is missing", async () => {
    jest.mock("../assets/data/item_data.json", () => ({
      notData: [],
    }));

    await expect(itemService.getItemData()).rejects.toThrow(
      "Error loading item data: Invalid JSON structure"
    );
  });
});
