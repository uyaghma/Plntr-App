import { View, Text } from "react-native";
import { Link } from "expo-router";
import PlantScreen from "@/components/PlantScreen";

export default function PlantPage() {
  return (
    <View style={{ flex: 1, maxWidth: 800 }}>
      <PlantScreen id="1" name="Heirloom Tomato" />
    </View>
  );
}
