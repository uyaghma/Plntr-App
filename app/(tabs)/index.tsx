import { Text, View } from "react-native";
import PlantScreen from "@/components/PlantScreen";
import { Link } from "expo-router";
import HomeScreen from "@/components/HomeScreen";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <HomeScreen />
    </View>
  );
}
