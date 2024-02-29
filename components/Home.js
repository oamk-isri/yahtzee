import React, {useState} from "react";
import { Text, View, ScrollView, Pressable, TextInput } from "react-native";
import style from "../style/style";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MAX_SPOT,
    MIN_SPOT,
    BONUS_TRESHOLD,
    BONUS_POINTS,
    PRIMARY_COLOR

} from "../constants/Game";

export default Home = ({navigation}) => {

    const [player, setPlayer] = useState("");
    const [showRules, setShowRules] = useState(false);

    const handleConfirm = () => {
        setShowRules(true);
    }

    return (
    <View style={style.container}>
    <Header />
    <ScrollView style={style.container}>
    <View style={style.innerContainer}>

        <View style ={style.gameinfo}>
            <MaterialCommunityIcons name="information" size={100} color={PRIMARY_COLOR} />
            
            {/* if showRules is true, switch view */}
            { !showRules ? (
            <View>
                <Text style={style.gameinfo}>
                    Enter your name:
                </Text>
                <TextInput
                style={style.inputField}
                value={player}
                onChangeText={setPlayer}
                autoFocus={true}
                />
                <Pressable
                style={style.button}
                onPress={handleConfirm}>
                    <Text style={style.buttonText}>OK</Text>
                </Pressable>
            </View>
            ) : (
            <View>
            <Text style={style.gameinfo}>
                Rules of the game
            </Text>
            <Text>
            THE GAME: Upper section of the classic Yahtzee
            dice game. You have {NBR_OF_DICES} dices and
            for the every dice you have {NBR_OF_THROWS}
            throws. After each throw you can keep dices in
            order to get same dice spot counts as many as
            possible. In the end of the turn you must select
            your points from {MIN_SPOT} to {MAX_SPOT}.
            Game ends when all points have been selected.
            The order for selecting those is free.
            </Text>
            <Text>
            POINTS: After each turn game calculates the sum
            for the dices you selected. Only the dices having
            the same spot count are calculated. Inside the
            game you can not select same points from
            {MIN_SPOT} to {MAX_SPOT} again.
            </Text>
            <Text>
            GOAL: To get points as much as possible.
            {BONUS_TRESHOLD} points is the limit of
            getting bonus which gives you {BONUS_POINTS}
            points more.
            </Text>
            <View style={style.gameinfo}>
            <Pressable
            style={style.button}
            onPress={() => navigation.navigate("Gameboard", {player})}>
                <Text style={style.buttonText}>OK</Text>
            </Pressable>
            </View>
            </View>
            )}
        </View>
    </View>
    </ScrollView>
    <Footer/>
    </View>
    )
}