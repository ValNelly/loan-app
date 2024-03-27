
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import { CommonRoutNames } from './route';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import SettingsScreen from '../screen/SettingsScreen';


const Stack = createBottomTabNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const AuthNavigation = () => {
  return (
    <Navigator>
      <Screen
        component={HomeScreen}
        name={CommonRoutNames.HOME_SCREEN}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Screen
        component={SettingsScreen}
        name={CommonRoutNames.SETTINGS_SCREEN}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
};

export default AuthNavigation;