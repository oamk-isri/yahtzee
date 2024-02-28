import React, {useState, useEffect} from "react";
import { Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import style from "../style/style";

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;
const WINNING_POINTS = 23;

export default Gameboard = ({navigation, route}) => {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    //const [nbrOfWins, setNbrOfWins] = useState(0);
    const [sum, setSum] = useState(0);
    //const [status, setStatus] = useState('');
    const [player, setPlayer] = useState(route.params.player);
    const [selectedDices, setSelectedDices] = 
        useState(new Array(NBR_OF_DICES).fill(false));


    const Dice = ({index}) => {
      return(
        <Pressable 
            key={"row" + index}
            onPress={() => selectDice(index)}>
          <MaterialCommunityIcons
            name={board[index]}
            key={"row" + index}
            size={50} 
            color={getDiceColor(index)}>
          </MaterialCommunityIcons>
        </Pressable>
      )
    }

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      row.push(
        <Dice key={i} index={i}/>
      );
    }

    function getDiceColor(i) {
      if (board.every((val, i, arr) => val === arr[0])) {
        return "orange";
      }
      else {
        return selectedDices[i] ? "black" : "steelblue";
      }
    }

    const selectDice = (i) => {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    }

    const throwDices = () => {
      let sum = 0;
      for (let i = 0; i < NBR_OF_DICES; i++) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
        sum += randomNumber;
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
      setSum(sum);
    }

    const storeScore = async () => {
      try {
        const playerScore = {
          //player: player,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(), 
          points: sum
        }

        await AsyncStorage.setItem("@scoreboard", JSON.stringify(playerScore));
      }
      
      catch(err) {
        console.log(err)
    }
  }

  return (
    <View style={style.gameboard}>
      <View style={style.flex}>{row}</View>
      <Text>{sum}</Text>
      <Pressable style={style.button}
        onPress={() => throwDices()}>
        <Text style={style.buttonText}>
        Throw dices
        </Text>
      </Pressable>

      <Text>{player}</Text>
    </View>
  )
}