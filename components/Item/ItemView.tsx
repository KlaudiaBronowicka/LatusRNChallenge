import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Card } from "../Card/Card";
import { IntensityIndex } from "../../models/IntensityIndex";
import { Item } from "../../models/Item";

type ItemViewProps = {
  item: Item;
};

const getIntensityColor = (index: IntensityIndex): string => {
  switch (index) {
    case "very low":
      return "#00BFFF";
    case "low":
      return "#3CB371";
    case "moderate":
      return "#5E9EA0";
    case "high":
      return "#FF6347";
    case "very high":
      return "#8B0100";
    default:
      return "#666666";
  }
};

export const ItemView = ({ item }: ItemViewProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const intensityColor = getIntensityColor(item.intensity.index);

  return (
    <Card>
      <View testID="ItemContainer" style={styles.container}>
        <Text testID="TimeDisplay" style={styles.time}>
          {formatDate(item.from)} - {formatDate(item.to)}
        </Text>
        <View style={styles.intensityContainer}>
          <View style={styles.propertyColumn}>
            <Feather
              testID="ForecastIcon"
              name="trending-up"
              size={36}
              color="#00BFFF"
            />
            <Text testID="ForecastValue" style={styles.label}>
              {item.intensity.forecast}
            </Text>
          </View>
          <View style={styles.propertyColumn}>
            <Feather testID="ActualIcon" name="eye" size={36} color="#3CB371" />
            <Text testID="ActualValue" style={styles.label}>
              {item.intensity.actual}
            </Text>
          </View>
          <View style={styles.propertyColumn}>
            <Feather
              testID="IntensityIcon"
              name="bar-chart-2"
              size={36}
              color={intensityColor}
            />
            <Text testID="IntensityValue" style={[styles.label, styles.index]}>
              {item.intensity.index}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
    flex: 1,
  },
  time: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  intensityContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },
  propertyColumn: {
    alignItems: "center",
    gap: 8,
    width: 70,
  },
  label: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  index: {
    textTransform: "capitalize",
  },
});
