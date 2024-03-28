import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigation } from "../features/auth/navigation";
import { MainRouteName } from "./route";
import { BottomTabNavigation } from "../features/common/navigation";
import { useContext } from "react";
import UserContext from "../lib/context/user";

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
      {/* <Screen
        name={routes.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      /> */}
    </Navigator>
  );
};

export default MainNavigation;
