import React, {useState, useEffect} from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import style from "../style/style";

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;
const WINNING_POINTS = 23;

export default Gameboard = () => {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    //const [nbrOfWins, setNbrOfWins] = useState(0);
    const [sum, setSum] = useState(0);
    //const [status, setStatus] = useState('');

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      row.push(
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50} 
          color={"steelblue"}>
        </MaterialCommunityIcons>
      );
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

    return (
        <View style={style.gameboard}>
            <View style={style.flex}>{row}</View>
            <Text>testings</Text>

            <Pressable style={style.button}
                onPress={() => throwDices()}>
                <Text style={style.buttonText}>
                Throw dices
                </Text>
            </Pressable>

        </View>
    )
}