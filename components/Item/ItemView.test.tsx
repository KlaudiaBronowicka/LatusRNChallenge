import { render, screen } from "@testing-library/react-native";
import { composeStories } from "@storybook/react";

import * as stories from "./ItemView.stories";
const { VeryLow, Low, Moderate, High, VeryHigh } = composeStories(stories);

describe("ItemView", () => {
  it("renders very low intensity correctly", () => {
    render(<VeryLow />);
    expect(screen.getByTestId("ItemContainer")).toBeTruthy();

    const icon = screen.getByTestId("IntensityIcon");
    expect(icon.props.color).toBe("#00BFFF");

    expect(screen.getByText("very low")).toBeTruthy();
  });

  it("renders low intensity correctly", () => {
    render(<Low />);
    expect(screen.getByTestId("ItemContainer")).toBeTruthy();

    const icon = screen.getByTestId("IntensityIcon");
    expect(icon.props.color).toBe("#3CB371");

    expect(screen.getByText("low")).toBeTruthy();
  });

  it("renders moderate intensity correctly", () => {
    render(<Moderate />);
    expect(screen.getByTestId("ItemContainer")).toBeTruthy();

    const icon = screen.getByTestId("IntensityIcon");
    expect(icon.props.color).toBe("#5E9EA0");

    expect(screen.getByText("moderate")).toBeTruthy();
  });

  it("renders high intensity correctly", () => {
    render(<High />);
    expect(screen.getByTestId("ItemContainer")).toBeTruthy();

    const icon = screen.getByTestId("IntensityIcon");
    expect(icon.props.color).toBe("#FF6347");

    expect(screen.getByText("high")).toBeTruthy();
  });

  it("renders very high intensity correctly", () => {
    render(<VeryHigh />);
    expect(screen.getByTestId("ItemContainer")).toBeTruthy();

    const icon = screen.getByTestId("IntensityIcon");
    expect(icon.props.color).toBe("#8B0100");

    expect(screen.getByText("very high")).toBeTruthy();
  });

  it("formats time correctly", () => {
    render(<Moderate />);
    expect(screen.getByTestId("TimeDisplay")).toBeTruthy();

    const timeText = screen.getByTestId("TimeDisplay").props.children.join("");

    // Update regex to match "HH:MM AM/PM - HH:MM AM/PM" format
    expect(timeText).toMatch(
      /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM) - (0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/
    );
  });

  it("displays all required elements", () => {
    render(<Moderate />);

    expect(screen.getByTestId("TimeDisplay")).toBeTruthy();
    expect(screen.getByTestId("ForecastIcon")).toBeTruthy();
    expect(screen.getByTestId("ActualIcon")).toBeTruthy();
    expect(screen.getByTestId("IntensityIcon")).toBeTruthy();
    expect(screen.getByTestId("ForecastValue")).toBeTruthy();
    expect(screen.getByTestId("ActualValue")).toBeTruthy();
    expect(screen.getByTestId("IntensityValue")).toBeTruthy();
  });
});
