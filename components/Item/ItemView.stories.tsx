import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { ItemView } from "./ItemView";
import { IntensityIndex } from "../../models/IntensityIndex";

const meta = {
  title: "ItemView",
  component: ItemView,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ItemView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VeryLow: Story = {
  args: {
    item: {
      from: new Date("2018-01-20T14:00:00Z"),
      to: new Date("2018-01-20T14:30:00Z"),
      intensity: {
        forecast: 225,
        actual: 220,
        index: "very low" as IntensityIndex,
      },
    },
  },
};

export const Low: Story = {
  args: {
    item: {
      from: new Date("2018-01-20T13:30:00Z"),
      to: new Date("2018-01-20T14:00:00Z"),
      intensity: {
        forecast: 245,
        actual: 240,
        index: "low" as IntensityIndex,
      },
    },
  },
};

export const Moderate: Story = {
  args: {
    item: {
      from: new Date("2018-01-20T12:00:00Z"),
      to: new Date("2018-01-20T12:30:00Z"),
      intensity: {
        forecast: 266,
        actual: 263,
        index: "moderate" as IntensityIndex,
      },
    },
  },
};

export const High: Story = {
  args: {
    item: {
      from: new Date("2018-01-20T12:30:00Z"),
      to: new Date("2018-01-20T13:00:00Z"),
      intensity: {
        forecast: 267,
        actual: 265,
        index: "high" as IntensityIndex,
      },
    },
  },
};

export const VeryHigh: Story = {
  args: {
    item: {
      from: new Date("2018-01-20T13:00:00Z"),
      to: new Date("2018-01-20T13:30:00Z"),
      intensity: {
        forecast: 280,
        actual: 285,
        index: "very high" as IntensityIndex,
      },
    },
  },
};
