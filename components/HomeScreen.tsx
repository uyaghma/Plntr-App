import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import PlantCard from "@/components/PlantCard"; // Adjust the import path as necessary
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import PlantScreen from "./PlantScreen";

interface Plant {
  id: string;
  name: string;
  type: string;
  wateringFrequency: string;
  lightRequirement: string;
}

const HomeScreen: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("Loading...");
  const [weatherDesc, setWeatherDesc] = useState<string>("Loading...");
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: "1",
      name: "Aloe Vera",
      type: "Succulent",
      wateringFrequency: "Every week",
      lightRequirement: "Indirect sunlight",
    },
    {
      id: "2",
      name: "Peace Lily",
      type: "Flowering",
      wateringFrequency: "Every 1-2 weeks",
      lightRequirement: "Low light",
    },
    // Additional plants can be added here
  ]);

  // Fetch weather data from OpenWeather API
  const fetchWeatherData = async () => {
    const API_KEY = "3f327b93b600e8db6672dd52e703f83f"; // Replace with your OpenWeather API key
    const CITY_NAME = "Edmonton"; // Replace with your city name
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      setTemperature(`${Math.round(data.main.temp)}°C`);
      setWeatherDesc(
        data.weather[0].description.charAt(0).toUpperCase() +
          data.weather[0].description.slice(1)
      ); // Capitalize the first letter
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setTemperature("Error");
      setWeatherDesc("Unable to fetch weather data");
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const formattedTime = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(`${formattedDate}, ${formattedTime}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    fetchWeatherData(); // Fetch weather data when the component mounts

    return () => clearInterval(interval);
  }, []);

  const RenderPlantPage = ({ id, name }) => {
    <PlantScreen id={id} name={name} />;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Welcome and Weather Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcome}>Welcome!</Text>
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherText}>{temperature}</Text>
            <Text style={styles.weatherText}>{weatherDesc}</Text>
          </View>
        </View>
        <Text style={styles.date}>{currentTime}</Text>

        {/* Alert Section */}
        <View style={styles.alertCard}>
          <Text style={styles.alertHeader}>Alert!</Text>
          <Text style={styles.alertText}>
            Remember to water your plants today!
          </Text>
        </View>

        {/* Plants List */}
        <Text style={styles.sectionHeader}>My Plants</Text>
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlantCard
              name={item.name}
              wateringFrequency={item.wateringFrequency}
              lightRequirement={item.lightRequirement}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  welcome: {
    fontSize: 32,
    fontWeight: "bold",
  },
  weatherContainer: {
    alignItems: "flex-end",
  },
  weatherText: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#555",
    marginBottom: 20,
  },
  alertHeader: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
  },
  alertCard: {
    padding: 15,
    backgroundColor: "#f9c2ff",
    borderRadius: 8,
    marginBottom: 15,
  },
  alertText: {
    fontSize: 12,
    color: "#333",
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HomeScreen;
