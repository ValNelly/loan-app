import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import WelcomeScreen from "../screen/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthRoutNames } from "./route";

const Stack = createNativeStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const AuthNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={AuthRoutNames.WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={AuthRoutNames.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
      <Screen
        name={AuthRoutNames.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
    </Navigator>
  );
};

export default AuthNavigation;
