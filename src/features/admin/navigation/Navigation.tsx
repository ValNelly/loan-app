import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminRoutNames } from "./route";
import { AddLoanFormScreen } from "../screen";

const Stack = createNativeStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const AuthNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={AdminRoutNames.ADD_LOAN_FORM_SCREEN}
        component={AddLoanFormScreen}
        options={{ headerTitle: "Register" }}
      />
    </Navigator>
  );
};

export default AuthNavigation;
