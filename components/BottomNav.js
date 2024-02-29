import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Gameboard from './Gameboard';
import Scoreboard from './Scoreboard';
import Home from './Home';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './Constants';

const Tab = createBottomTabNavigator();

const HOME = "Home";
const GAMEBOARD = "Gameboard";
const SCOREBOARD = "Scoreboard";

export default function BottomNav() {
    return (
    <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                    ? 'information'
                    : 'information-outline';
              } else if (route.name === 'Gameboard') {
                iconName = focused
                    ? 'dice-multiple'
                    : 'dice-multiple-outline';
              } else if (route.name === 'Scoreboard') {
                iconName = focused
                    ? 'scoreboard'
                    : 'scoreboard-outline';
              }
  
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: PRIMARY_COLOR,
            tabBarInactiveTintColor: SECONDARY_COLOR,
          })}>
            <Tab.Screen name={HOME} component={Home} />
            <Tab.Screen name={GAMEBOARD} component={Gameboard} />
            <Tab.Screen name={SCOREBOARD} component={Scoreboard} />
            
        </Tab.Navigator>
    </NavigationContainer>    
    )
}
