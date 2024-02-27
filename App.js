import React from "react";
import { View } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gameboard from "./components/Gameboard";
import style from "./style/style";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <View style={style.container}>
      <BottomNav/>
    </View>
  )
}