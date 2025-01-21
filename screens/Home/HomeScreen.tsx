import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { itemService } from "../../services/ItemService";
import { useEffect, useState } from "react";
import { ItemView } from "../../components/Item/ItemView";
import { ItemResponse } from "../../models/ItemResponse";
import { Item } from "../../models/Item";

export const HomeScreen = () => {
  const [data, setData] = useState<ItemResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await itemService.getItemData();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Item }) => <ItemView item={item} />;

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data.data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  contentContainer: {
    gap: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
