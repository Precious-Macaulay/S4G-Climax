import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
// add submission to firebase
import auth from "../core/firebase";
import { updateProfile } from 'firebase/auth';

const questions = [
  {
    question: "Car Make",
    options: [
      "ACURA",
      "ALFA ROMEO",
      "ASTON MARTIN",
      "AUDI",
      "BENTLEY",
      "BMW",
      "BUICK",
      "CADILLAC",
      "CHEVROLET",
      "CHRYSLER",
      "DODGE",
      "FIAT",
      "FORD",
      "GMC",
      "HONDA",
      "HYUNDAI",
      "INFINITI",
      "JAGUAR",
      "JEEP",
      "KIA",
      "LAMBORGHINI",
      "LAND ROVER",
      "LEXUS",
      "LINCOLN",
      "MASERATI",
      "MAZDA",
      "MERCEDES-BENZ",
      "MINI",
      "MITSUBISHI",
      "NISSAN",
      "PORSCHE",
      "RAM",
      "ROLLS-ROYCE",
      "SCION",
      "SMART",
      "SRT",
      "SUBARU",
      "TOYOTA",
      "VOLKSWAGEN",
      "VOLVO",
      "GENESIS",
      "BUGATTI",
    ],
  },
  {
    question: "Vehicle Class",
    options: [
      "COMPACT",
      "SUV - SMALL",
      "MID-SIZE",
      "TWO-SEATER",
      "MINICOMPACT",
      "SUBCOMPACT",
      "FULL-SIZE",
      "STATION WAGON - SMALL",
      "SUV - STANDARD",
      "VAN - CARGO",
      "VAN - PASSENGER",
      "PICKUP TRUCK - STANDARD",
      "MINIVAN",
      "SPECIAL PURPOSE VEHICLE",
      "STATION WAGON - MID-SIZE",
      "PICKUP TRUCK - SMALL",
    ],
  },
  {
    question: "Engine Size",
    type: "number",
    min: 0.9,
    max: 8.4,
  },
  {
    question: "Cylinders",
    type: "number",
    min: 3,
    max: 16,
  },
  {
    question: "Fuel Consumption City (L/100 km)",
    type: "number",
    min: 4.2,
    max: 30.6,
  },
  {
    question: "Fuel Consumption Hwy (L/100 km)",
    type: "number",
    min: 4,
    max: 20.6,
  },
  {
    question: "Transmission",
    options: [
      "A = automatic",
      "AM = automated manual",
      "AS = automatic with select shift",
      "AV = continuously variable",
      "M = manual",
    ],
  },
  {
    question: "Number of gears",
    type: "number",
    min: 1,
    max: 10,
  },
  {
    question: "Fuel Type",
    options: [
      "X = regular gasoline",
      "Z = premium gasoline",
      "D = diesel",
      "E = ethanol (E85)",
      "N = natural gas",
    ],
  },
];

const PaginationForm = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => setCurrentPage(currentPage + 1);

  const handlePrevPage = () => setCurrentPage(currentPage - 1);

  function convertObject(obj) {
    return {
      Make: obj["Car Make"],
      vehicle_class: obj["Vehicle Class"],
      engine_size: obj["Engine Size"],
      Cylinders: obj["Cylinders"],
      Transmission: obj["Transmission"].split(" ")[0],
      fuel_type: obj["Fuel Type"][0],
      fuel_cons_city: obj["Fuel Consumption City (L/100 km)"],
      fuel_cons_hwy: obj["Fuel Consumption Hwy (L/100 km)"],
      "Number of gears": obj["Number of gears"],
    };
  }

  const handleSubmit = async (values) => {
    console.log("values", values);
    // send to api to get prediction
    const data = convertObject(values);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/javascript");
    var raw = JSON.stringify(data, null, 3);

    console.log("raw", raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://carbon4cars.azurewebsites.net/predict", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result", result);
        // add to firebase
        updateProfile(auth.currentUser, { carbonFootprint: result });
        navigation.navigate("Dashboard");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Formik
      initialValues={{
        "Car Make": null,
        "Vehicle Class": null,
        "Engine Size": null,
        Cylinders: null,
        "Fuel Consumption City (L/100 km)": null,
        "Fuel Consumption Hwy (L/100 km)": null,
        Transmission: null,
        "Number of gears": null,
        "Fuel Type": null,
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, setValues, values }) => (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            {questions[currentPage].options ? (
              <>
                <Text>{questions[currentPage].question}</Text>
                <Picker
                  selectedValue={values[questions[currentPage].question]}
                  onValueChange={(value) => {
                    console.log("value", value);
                    setValues((values) => ({
                      ...values,
                      [questions[currentPage].question]: value,
                    }));
                  }}
                >
                  <Picker.Item label="Select an option" value="" />
                  {questions[currentPage].options.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                  ))}
                </Picker>
                <View style={styles.buttonContainer}>
                  {currentPage > 0 && (
                    <Button onPress={handlePrevPage}>Previous</Button>
                  )}
                  {currentPage < questions.length - 1 && (
                    <Button onPress={handleNextPage}>Next</Button>
                  )}
                  {currentPage === questions.length - 1 && (
                    // submit the form
                    <Button onPress={handleSubmit}>Submit</Button>
                  )}
                </View>
              </>
            ) : questions[currentPage].type === "number" ? (
              <>
                <TextInput
                  label={questions[currentPage].question}
                  mode="outlined"
                  keyboardType="numeric"
                  placeholder={`${questions[currentPage].min} - ${questions[currentPage].max}`}
                  value={values[questions[currentPage].question]}
                  onChangeText={(value) => {
                    if (
                      value >= questions[currentPage].min &&
                      value <= questions[currentPage].max &&
                      value !== ""
                    ) {
                      setValues((values) => ({
                        ...values,
                        [questions[currentPage].question]: value,
                      }));
                    } else {
                      alert("Please enter a valid value");
                      setValues((values) => ({
                        ...values,
                        [questions[currentPage].question]:
                          questions[currentPage].min,
                      }));
                    }
                  }}
                />
                <View style={styles.buttonContainer}>
                  {currentPage > 0 && (
                    <Button onPress={handlePrevPage}>Previous</Button>
                  )}
                  {currentPage < questions.length - 1 && (
                    <Button onPress={handleNextPage}>Next</Button>
                  )}
                  {currentPage === questions.length - 1 && (
                    <Button onPress={handleSubmit}>Submit</Button>
                  )}
                </View>
              </>
            ) : (
              <>
                <TextInput
                  label={questions[currentPage].question}
                  mode="outlined"
                  keyboardType={questions[currentPage].type}
                  onChangeText={(value) =>
                    setValues((values) => ({
                      ...values,
                      [questions[currentPage].question]: value,
                    }))
                  }
                />
                <View style={styles.buttonContainer}>
                  {currentPage > 0 && (
                    <Button onPress={handlePrevPage}>Previous</Button>
                  )}
                  {currentPage < questions.length - 1 && (
                    <Button onPress={handleNextPage}>Next</Button>
                  )}
                  {currentPage === questions.length - 1 && (
                    <Button onPress={handleSubmit}>Submit</Button>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  formContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default PaginationForm;
