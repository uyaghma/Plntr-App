import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PlantCardProps {
  name: string;
  wateringFrequency: string;
  lightRequirement: string;
}

const PlantCard: React.FC<PlantCardProps> = ({
  name,
  wateringFrequency,
  lightRequirement,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.plantName}>{name}</Text>
      <Text style={styles.plantDetail}>Watering: {wateringFrequency}</Text>
      <Text style={styles.plantDetail}>Light: {lightRequirement}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    marginBottom: 10,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "600",
  },
  plantDetail: {
    fontSize: 14,
    color: "#777",
  },
});

export default PlantCard;
