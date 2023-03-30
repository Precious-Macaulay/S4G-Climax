import React from "react";
import { OnboardFlow } from "react-native-onboard";
import auth from "../core/firebase";

const Onboarding = ({ navigation }) => {

  console.log("user", auth.currentUser);
  return (
    <OnboardFlow
      pages={[
        {
          title: "Welcome to S4G Climax",
          subtitle: "The easiest way to way to calculate your carbon emission.",
          imageUri:
            "https://llep.org.uk/app/uploads/2021/09/Net-Zero-Green-low-carbon-skyline-800x0-c-default.jpg",
        },
        {
          title: "Track your carbon footprint",
          subtitle:
            "Track your carbon footprint and see how you can reduce it.",
          imageUri: "https://imagetolink.com/ib/jroUcy0zjl.jpg",
        },
        {
          title: "Let Us Help You Reduce Your Carbon Footprint",
          subtitle:
            "Answer the questions and we will give you tips on how to reduce your carbon footprint.",
          imageUri: "https://imagetolink.com/ib/jroUcy0zjl.jpg",
        },
      ]}
      type={"fullscreen"}
      textAlign="center"
      onDone={() => navigation.navigate("PaginationForm")}
    />
  );
};

export default Onboarding;



