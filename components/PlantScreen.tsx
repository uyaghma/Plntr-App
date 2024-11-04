import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import SensorDataCard from "./SensorDataCard";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  waterLevel: number;
}

interface PlantInfo {
  id: string;
  name: string;
}

const PlantScreen: React.FC<PlantInfo> = ({ id, name }) => {
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    waterLevel: 0,
  });

  useEffect(() => {
    fetch("http://192.168.1.79/sensor_data")
      .then((response) => response.json())
      .then((data: SensorData) => setSensorData(data))
      .catch((error) => console.error("Error fetching sensor data: ", error));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.parent}>
        <Text style={styles.header}>{name}</Text>
        <View style={styles.container}>
          <SensorDataCard
            label="Temperature"
            value={sensorData.temperature}
            unit="°C"
          />
          <SensorDataCard
            label="Humidity"
            value={sensorData.humidity}
            unit="%"
          />
          <SensorDataCard
            label="Soil Moisture"
            value={sensorData.soilMoisture}
            unit="%"
          />
          <SensorDataCard
            label="Water Level"
            value={sensorData.waterLevel}
            unit="mL"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  parent: {
    flexDirection: "column",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
});

export default PlantScreen;
