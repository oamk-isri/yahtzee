import React from "react";
import { View } from "react-native";
import style from "./style/style";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <View style={style.container}>
      <BottomNav/>
    </View>
  )
}