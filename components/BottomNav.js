import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Gameboard from './Gameboard';
import Scoreboard from './Scoreboard';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';

const Tab = createBottomTabNavigator();

const HOME = "Home";
const GAMEBOARD = "Gameboard";
const SCOREBOARD = "Scoreboard";
const icons = {
    [HOME]: "home",
    [GAMEBOARD]: "message1",
    [SCOREBOARD]: "setting"
}

export default function BottomNav() {
    return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name={HOME} component={Home} />
            <Tab.Screen name={GAMEBOARD} component={Gameboard} />
            <Tab.Screen name={SCOREBOARD} component={Scoreboard} />
            
        </Tab.Navigator>
    </NavigationContainer>    
    )
}
