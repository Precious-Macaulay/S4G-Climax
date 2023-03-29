import { Text, View, StyleSheet } from "react-native";
import { OnboardFlow } from "react-native-onboard";

export default function App() {
  return (
    <OnboardFlow
      pages={[
        {
          title: "Welcome to my S4G Climax app!",
          subtitle: "Answer a few questions to get started",
          imageUri:
            "https://llep.org.uk/app/uploads/2021/09/Net-Zero-Green-low-carbon-skyline-800x0-c-default.jpg",
        },
        // question need to calculate the carbon footprint
        {
          title: "Do you have a car?",
          type: "multipleChoice",
          primaryButtonTitle: "Next",
          props: {
            fields: [
              {
                type: "radio",
                id: "car",
                title: "Yes",
                value: "yes",
              },
              {
                type: "radio",
                id: "car",
                title: "No",
                value: "no",
              },
            ],
          },
        },
        {
          title: "What is the make and model of your car?",
          type: "multipleChoice",
          primaryButtonTitle: "Next",
          props: {
            fields: [
              { type: "radio", id: "carMake", title: "Acura", value: "Acura" },
              {
                type: "radio",
                id: "carMake",
                title: "Alfa Romeo",
                value: "Alfa Romeo",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Aston Martin",
                value: "Aston Martin",
              },
              { type: "radio", id: "carMake", title: "Audi", value: "Audi" },
              {
                type: "radio",
                id: "carMake",
                title: "Bentley",
                value: "Bentley",
              },
              { type: "radio", id: "carMake", title: "BMW", value: "BMW" },
              { type: "radio", id: "carMake", title: "Buick", value: "Buick" },
              {
                type: "radio",
                id: "carMake",
                title: "Cadillac",
                value: "Cadillac",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Chevrolet",
                value: "Chevrolet",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Chrysler",
                value: "Chrysler",
              },
              { type: "radio", id: "carMake", title: "Dodge", value: "Dodge" },
              { type: "radio", id: "carMake", title: "Fiat", value: "Fiat" },
              { type: "radio", id: "carMake", title: "Ford", value: "Ford" },
              { type: "radio", id: "carMake", title: "GMC", value: "GMC" },
              { type: "radio", id: "carMake", title: "Honda", value: "Honda" },
              {
                type: "radio",
                id: "carMake",
                title: "Hyundai",
                value: "Hyundai",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Infiniti ",
                value: "Infiniti",
              },
              {
                type: "radio",
                id: "carMake ",
                title: "Jaguar ",
                value: "Jaguar",
              },
              { type: "radio ", id: "carMake ", title: "Jeep ", value: "Jeep" },
              { type: "radio ", id: "carMake ", title: "Kia ", value: "Kia" },
              {
                type: "radio ",
                id: "carMake ",
                title: "Lamborghini ",
                value: "Lamborghini",
              },
              {
                type: "radio ",
                id: "carMake ",
                title: "Land Rover ",
                value: "Land Rover",
              },
              {
                type: "radio ",
                id: "carMake ",
                title: "Lexus ",
                value: "Lexus",
              },
              {
                type: "radio ",
                id: "carMake ",
                title: "Lincoln ",
                value: "Lincoln",
              },
              {
                type: "radio ",
                id: "carMake ",
                title: "Maserati ",
                value: "Maserati",
              },
              {
                type: "radio ",
                id: "carMake ",
                title: "Mazda ",
                value: "Mazda",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Mercedes-Benz",
                value: "Mercedes-Benz",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Mini",
                value: "Mini",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Mitsubishi",
                value: "Mitsubishi",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Nissan",
                value: "Nissan",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Porsche",
                value: "Porsche",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Ram",
                value: "Ram",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Rolls-Royce",
                value: "Rolls-Royce",
              },
              { type: "radio", id: "carMake", title: "Scion", value: "Scion" },
              { type: "radio", id: "carMake", title: "Smart", value: "Smart" },
              { type: "radio", id: "carMake", title: "SRT", value: "SRT" },
              {
                type: "radio",
                id: "carMake",
                title: "Subaru",
                value: "Subaru",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Toyota",
                value: "Toyota",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Volkswagen",
                value: "Volkswagen",
              },
              {
                type: "radio",
                id: "carMake ",
                title: "Volvo ",
                value: "Volvo",
              },
              {
                type: "radio ",
                id: "carMake ",
                title: "Genesis ",
                value: "Genesis",
              },
              {
                type: "radio ",
                id: "carMake ",
                title: "Bugatti ",
                value: "Bugatti",
              },
              {
                type: "radio",
                id: "carMake",
                title: "Other",
                value: "Other",
              },
            ],
          },
        },
      ]}
      textAlign="center"
      type="fullscreen" // Change to either 'fullscreen', 'bottom-sheet', or 'inline'
    />
  );
}
