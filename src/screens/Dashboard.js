import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";
import firebas from "../core/firebase";
import { collection, getDocs } from "firebase/firestore";
import Button from "../components/Button";
import BackgroundGeolocation from "react-native-background-geolocation";

const Dashboard = ({ navigation }) => {
  useEffect(() => {
    BackgroundGeolocation.ready(
      {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        stopTimeout: 1,
        debug: true,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false,
        startOnBoot: true,
      },
      (state) => {
        console.log(
          "- BackgroundGeolocation is configured and ready: ",
          state.enabled
        );

        if (!state.enabled) {
          ////
          // 3. Start tracking!
          //
          BackgroundGeolocation.start(function () {
            console.log("- Start success");
          });

          BackgroundGeolocation.onLocation((location) => {
            console.log(
              "- [js]location: ",
              location.latitude,
              location.longitude
            );
            setTotalDistance(
              calculateDistance(location.latitude, location.longitude)
            );
            console.log("totalDistance", totalDistance);
          });

          BackgroundGeolocation.onMotionChange((event) => {
            console.log(
              "- [js]motionchanged: ",
              event.isMoving,
              event.location
            );
          });
        }
      }
    );
  }, []);

  const [carbonEmission, setCarbonEmission] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [user, setUser] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);

  const { db, auth } = firebas;

  // retrieve user data from firestore
  const getCarbonEmission = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.id === auth.currentUser.uid) {
        setCarbonEmission(doc.data().prediction);
      }
    });
  };

  const calculateDistance = (latitude, longitude) => {
    const R = 6371e3; // metres
    const φ1 = latitude * (Math.PI / 180); // φ, λ in radians
    const φ2 = 1.3521 * (Math.PI / 180);
    const Δφ = (1.3521 - latitude) * (Math.PI / 180);
    const Δλ = (103.8198 - longitude) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

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

    if (auth.currentUser) {
      setUser(auth.currentUser);
      getCarbonEmission();
      console.log("carbonEmission", carbonEmission);
    } else {
      console.log("No user");
      navigation.navigate("Login");
    }
  }, [carbonEmission]);

  console.log("carbonEmission", typeof carbonEmission);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          source={{
            uri: "https://png.pngtree.com/element_our/20190603/ourlarge/pngtree-spring-green-trees-illustration-image_1459774.jpg",
          }}
          style={styles.avatar}
        /> */}
        <View>
          <Text style={styles.name}>
            HI,
            {user ? user.displayName.toUpperCase() : "USER"}
          </Text>
          <Text style={styles.greeting}>Good {timeOfDay}!</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.circle}>
          <Text style={styles.dashtext}>CO2</Text>
          <Text style={styles.dashtext}>so far is</Text>
          <Text style={styles.totalEmission}>
            {carbonEmission.toFixed()} {carbonEmission === 1 ? "kg" : "kgs"}
          </Text>
        </View>
      </View>
      <Button title="Stop Tracking" onPress={""}>
        Stop Tracking
      </Button>
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
    backgroundColor: "#fff",
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
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
  circle: {
    height: "90%",
    width: "80%",
    backgroundColor: "#003333",
    borderRadius: 500,
    shadowColor: "black",
    justifyContent: "center",
    alignContent: "center",
    padding: 30,
  },
  dashtext: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
  totalEmission: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Dashboard;
