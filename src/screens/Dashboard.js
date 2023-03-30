import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";
import {Button} from "react-native-paper";
import auth from "../core/firebase";

const Dashboard = () => {
  const [carbonEmission, setCarbonEmission] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      setTimeOfDay("morning");
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("evening");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://png.pngtree.com/element_our/20190603/ourlarge/pngtree-spring-green-trees-illustration-image_1459774.jpg" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>HI, {auth.currentUser.displayName}</Text>
          <Text style={styles.greeting}>Good {timeOfDay}!</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Animated.View style={styles.circle}>
          <Text style={styles.totalEmission}>{auth.currentUser.carbonFootprint}</Text>
        </Animated.View>
        <Button
          title="Recalculate Emission"
          buttonStyle={styles.button}
          onPress={() => console.log("Recalculating emission...")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003333",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  body: {
    flex: 2,
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  greeting: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  circleBackgroundWrapperStyle: {
    position: "absolute",
  },
  circleBackgroundStyle: {
    borderWidth: 5,
    borderColor: "#e6e6e6",
    borderRadius: 1000,
    padding: 10,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 1000,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  totalEmission: {
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});

export default Dashboard;
