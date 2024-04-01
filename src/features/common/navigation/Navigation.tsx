import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import { CommonRoutNames } from "./route";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SettingsScreen from "../screen/SettingsScreen";
import MyLoansScreen from "../screen/MyLoansScreen";

const Stack = createBottomTabNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

export const BottomTabNavigation = () => {
  return (
    <Navigator>
      <Screen
        component={HomeScreen}
        name={CommonRoutNames.HOME_SCREEN}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Screen
        component={MyLoansScreen}
        name={CommonRoutNames.MY_LOANS_SCREEN}
        options={{
          title: "My Loans",
          tabBarLabel: "MyLoans",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank" color={color} size={size} />
          ),
        }}
      />
      <Screen
        component={SettingsScreen}
        name={CommonRoutNames.SETTINGS_SCREEN}
        options={{
          headerShown: false,
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Navigator>
  );
};
