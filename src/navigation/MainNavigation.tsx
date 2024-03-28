import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainRouteName } from "./route";
import { useContext } from "react";
import UserContext from "../lib/context/user";
import { BottomTabNavigation } from "../features/common/navigation/Navigation";
import LoanNavigation from "../features/loan/navigation/Navigation";
import AuthNavigation from "../features/auth/navigation/Navigation";

const Stack = createNativeStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const MainNavigation = () => {
  const userContext = useContext(UserContext);

  const isLoggedIn = Boolean(userContext?.token);
  // const isLoggedIn = true;
  return (
    <Navigator>
      {isLoggedIn ? (
        <Screen
          name={MainRouteName.BOTTOM_TAB_NAVIGATION}
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <Screen
          name={MainRouteName.AUTH_NAVIGATION}
          component={AuthNavigation}
          options={{ headerShown: false }}
        />
      )}
      <Screen
        name={MainRouteName.LOANS_NAVIGATION}
        component={LoanNavigation}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default MainNavigation;
