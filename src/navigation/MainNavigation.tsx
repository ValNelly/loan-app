import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from "../features/auth/navigation/Navigation";
import { MainRouteName } from "./route";


const Stack = createNativeStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const MainNavigation = () => {
//   const { token } = useUserContext();
//   const isLoggedIn = Boolean(token);
  const isLoggedIn = false;
  return (
    <Navigator>
      {isLoggedIn ? (
        <Screen
          name={MainRouteName.COMMON_NAVIGATION}
          component={MainNavigation}
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