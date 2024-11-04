import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

interface SensorDataCardProps {
  label: string;
  value: number;
  unit: string;
}

const SensorDataCard: React.FC<SensorDataCardProps> = ({
  label,
  value,
  unit,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {value} {unit}
      </Text>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: "#76D7C4",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: screenWidth * 0.4,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  value: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
});

export default SensorDataCard;
