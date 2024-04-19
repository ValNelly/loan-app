import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonRoutNames } from "./route";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SettingsScreen, HomeScreen } from "../screen";
import { MyLoansScreen } from "../../loan/screen";
import { useContext } from "react";
import UserContext from "../../../lib/context/user";
import { AdminMenuScreen } from "../../admin/screen";

const Stack = createBottomTabNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

export const BottomTabNavigation = () => {
  const userContext = useContext(UserContext);
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

      {userContext?.user?.isStaff ? (
        <Screen
          component={AdminMenuScreen}
          name={CommonRoutNames.ADMIN_MENU_SCREEN}
          options={{
            headerShown: true,
            title: "Admin Panel",
            tabBarLabel: "Admin",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="shield-account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      ) : (
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
      )}

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
