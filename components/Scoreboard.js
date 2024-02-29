import React, {useState, useEffect} from "react";
import { Text, View, Pressable , Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../style/style";
import Header from "./Header";
import Footer from "./Footer";

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
            <View style={style.innerContainer}>

            <Text>Scoreboard!</Text>

            <Pressable style={style.button}
                onPress={() => setScores("test3")}>
                <Text style={style.buttonText}>
                Set a Score
                </Text>
            </Pressable>

            <Text>contents of scoreboard: {other}</Text>


            
            </View>
            <Footer/>
        </View>
    )
}