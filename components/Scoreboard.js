import React, {useState, useEffect} from "react";
import { Text, View, ScrollView, Pressable} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../style/style";
import Header from "./Header";
import Footer from "./Footer";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PRIMARY_COLOR } from "../constants/Game";

export default Scoreboard = () => {

    const [scores, setScores] = useState("");
    const [other, setOther] = useState("");

    const getScore = async () => {
        try {
            const jsonObj = await AsyncStorage.getItem("@scoreboard");
            // make sure returned value is null if 'jsonObj' is undefined
            return jsonObj != null ? JSON.parse(jsonObj) : null;

        } catch(err) {
            console.log(err)
            return null;
        }
    }

    useEffect(() => {
        let x = getScore();
        setOther(x.score);

    }, [scores]);

    return (
        <View style={style.container}>
        <Header/>
        <ScrollView style={style.container}>
        <View style={style.innerContainer}>
        
            <View style= {style.gameinfo}>
            <MaterialCommunityIcons name="account-hard-hat" size={125} color={PRIMARY_COLOR} />
            <Text style={style.bigText}>
                No scroreboard here yet!
            </Text>
            </View>

           
        
        </View>
        </ScrollView>
        <Footer/>
        </View>
    )
}