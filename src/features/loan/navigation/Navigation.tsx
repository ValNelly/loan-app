import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ApplyLoanFormScreen from "../screen/ApplyLoanFormScreen";
import { LoanRoutNames } from "./route";

const Stack = createNativeStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const LoanNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={LoanRoutNames.APPLY_LOAN_FORM_SCREEN}
        component={ApplyLoanFormScreen}
        options={{ headerTitle: "Apply loan" }}
      />
    </Navigator>
  );
};

export default LoanNavigation;
