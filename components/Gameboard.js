import React, {useState, useEffect} from "react";
import { Text, View, Pressable, Alert, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import style from "../style/style";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MAX_SPOT,
  BONUS_TRESHOLD,
  BONUS_POINTS,
  PRIMARY_COLOR,
  SECONDARY_COLOR
} from "./Constants";
import Footer from "./Footer";
import Header from "./Header";

let board = [];

export default Gameboard = ({navigation, route}) => {
    
  const [player, setPlayer] = useState(route.params.player);

  const [statusText, setStatusText] = useState("Throw dices.");
  const [totalPoints, setTotalPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bonusAdded, setBonusAdded] = useState(false);

  // dice states
  const [firstThrow, setFirstThrow] = useState(false);
  const [throwsLeft, setThrowsLeft] = useState(NBR_OF_THROWS);
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false));

  // spot states
  const [spotsLeft, setSpotsLeft] = useState(MAX_SPOT);
  const [selectedSpots, setSelectedSpots] = 
      useState(new Array(MAX_SPOT).fill(false));
  const [spotTotals, setSpotTotals] =
      useState(new Array(MAX_SPOT).fill(0));

  useEffect(() => {

    if (totalPoints >= BONUS_TRESHOLD) {
      setBonusAdded(true);
    }
      
    if (spotsLeft === 0) {
      if (bonusAdded) {
        setTotalPoints(totalPoints + BONUS_POINTS);
      }
      setGameOver(true);
    }
  }, [spotTotals]);
    
  const resetGame = () => {

    // reset states to originals
    setStatusText("Throw Dices.");
    setTotalPoints(0);
    setFirstThrow(false);
    setThrowsLeft(NBR_OF_THROWS);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setSpotsLeft(MAX_SPOT);
    setSelectedSpots(new Array(MAX_SPOT).fill(false));
    setSpotTotals(new Array(MAX_SPOT).fill(0));
    setGameOver(false);
  }

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

  const Spot = ({index}) => {
    return(
      <Pressable 
          key={"row" + index}
          onPress={() => selectSpots(index)}>
        <Text>{spotTotals[index-1]}</Text>
        <MaterialCommunityIcons
          name={"numeric-" + index + "-circle"}
          key={"row" + index}
          size={50} 
          color={getSpotColor(index)}>
        </MaterialCommunityIcons>
      </Pressable>
    )
  }

  const diceRow = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    diceRow.push(
      <Dice key={i} index={i}/>
    );
  }

  const spotRow = [];
  for (let i = 1; i <= MAX_SPOT; i++) {
    spotRow.push(
      <Spot key={i} index={i}/>
    );
  }

  function getDiceColor(i) {
    return selectedDices[i] ? PRIMARY_COLOR : SECONDARY_COLOR;
  }

  const selectDice = (i) => {
    
    // don't allow selecting before first throw
    if (throwsLeft == NBR_OF_THROWS) {
      setStatusText("You must throw before selecting!")
      return;
    }

    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  const throwDices = () => {

    if (!firstThrow) {
      setFirstThrow(true)
    }

    if (throwsLeft == 0) {
      setStatusText("No throws left, you must set points first!")
      return;
    }

    for (let i = 0; i < NBR_OF_DICES; i++) {
      
      // check if dice is selected, if not, throw it
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
      }
        
    }
    setThrowsLeft(throwsLeft - 1);
  }

    

  function getSpotColor(i) {
    return selectedSpots[i] ? PRIMARY_COLOR : SECONDARY_COLOR;
  }

  const selectSpots = (i) => {

    if (throwsLeft > 0) {
      setStatusText("Throw " + throwsLeft + " before setting points!")
      return;
    }

    let spots = [...selectedSpots];

    // if spot isn't selected yet
    if (!spots[i]) {
      spots[i] = selectedSpots[i] ? false : true;
      setSelectedSpots(spots);
      let points = calculateSpotPoints(i);
      
      const newSpotTotals = [...spotTotals];
      newSpotTotals[i-1] = points;
      setSpotTotals(newSpotTotals);
      
      calculateTotalPoints(newSpotTotals);
      setSpotsLeft(spotsLeft - 1)
      setThrowsLeft(3);
      setSelectedDices(new Array(NBR_OF_DICES).fill(false))
    }

    // if spot is selected already
    else {
      setStatusText("Spot " + i + " is selected already!")
    }
      
  }

  const calculateSpotPoints = (spotValue) => {
    let currentDices = [...board];
    const diceCount = currentDices.filter(dice => {
      
      // board has icon names, extract the dice values
      const num = parseInt(dice.split('-')[1]);
      return num === spotValue;
    });

    return diceCount.length * spotValue
  }

  const calculateTotalPoints = (totals) => {
    let sum = totals.reduce((acc, curr) => acc + curr)
    setTotalPoints(sum);
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
    <View>
      <Header/>
      {!gameOver ? (
        <View style={style.gameboard}>

          {!firstThrow ? (
            <MaterialCommunityIcons name="dice-multiple" size={125} color={PRIMARY_COLOR} />
          ) : (
            <View style={style.flex}>{diceRow}</View>
          )}
          
          
          
          <Text>Throws left: {throwsLeft}</Text>
          <Text style={style.statusText}>{statusText}</Text>
          <Pressable style={style.button}
            onPress={() => throwDices()}>
            <Text style={style.buttonText}>
            Throw dices
            </Text>
          </Pressable>
          <Text style={style.bigText}>Total: {totalPoints}</Text>
          {!bonusAdded ? (
            <Text>You are {BONUS_TRESHOLD - totalPoints} points away from bonus</Text>
          ) : (
            <Text>Congrats! Bonus points will be added.</Text>
          )}
          
          <View style={style.flex}>{spotRow}</View>
          <Text>Player: {player}</Text>
        </View>
      ) : (
        <View style={style.gameboard}>
          <MaterialCommunityIcons name="dice-multiple" size={125} color={SECONDARY_COLOR} />
          <Text style={style.bigText}>Game Over!</Text>

          {!bonusAdded ? (
            <Text>You did not get any bonus points.</Text>
          ) : (
            <Text>You got bonus of {BONUS_POINTS} points!</Text>
          )}

          <Text style={style.bigText}>Final points: {totalPoints}</Text>
          <Pressable style={style.button}
            onPress={() => resetGame()}>
            <Text style={style.buttonText}>
            Play Again!
            </Text>
          </Pressable>
        </View>
      )}
      <Footer/>
  </View>
  
  )
}