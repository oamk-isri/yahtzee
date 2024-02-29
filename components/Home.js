import React, {useState} from "react";
import {
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    Alert 
} from "react-native";
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
        if (player == "") {
            Alert.alert("Name cannot be empty!")
            return;
        }
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
            <View style={style.gameinfo}>
            <Text style={style.bigText}>
                Rules of the game
            </Text>
            </View>
            <Text style={[style.gameinfo, style.bold]}>
            THE GAME
            </Text>
            <Text style={style.gameinfo}>
            Upper section of the classic Yahtzee dice game. 
            You have <Text style={style.bold}>{NBR_OF_DICES} dices</Text> and
            for the every dice you
            have <Text style={style.bold}>{NBR_OF_THROWS} throws</Text>. After each 
            throw you can keep dices in
            order to get same dice spot counts as many as
            possible. In the end of the turn you must select
            your points from {MIN_SPOT} to {MAX_SPOT}.
            Game ends when all points have been selected.
            The order for selecting those is free.
            </Text>
            <Text style={[style.gameinfo, style.bold]}>
            POINTS
            </Text>
            <Text style={style.gameinfo}>
            After each turn game calculates the sum
            for the dices you selected. Only the dices having
            the same spot count are calculated. Inside the
            game you can not select same points
            from {MIN_SPOT} to {MAX_SPOT} again.
            </Text>
            <Text style={[style.gameinfo, style.bold]}>
            GOAL
            </Text>
            <Text style={style.gameinfo}>
            To get points as much as
            possible. <Text style={style.bold}>{BONUS_TRESHOLD} points</Text> is
            the limit of getting bonus which gives
            you <Text style={style.bold}>{BONUS_POINTS} points</Text> more.
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