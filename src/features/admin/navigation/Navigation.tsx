import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminRoutNames } from "./route";
import {
  AddLoanFormScreen,
  FeedsScreen,
  LoanRequestScreens,
  LoansScreen,
  UsersScreen,
} from "../screen";

const Stack = createNativeStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const AdminNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={AdminRoutNames.ADD_LOAN_FORM_SCREEN}
        component={AddLoanFormScreen}
        options={{ headerTitle: "Add loan" }}
      />
      <Screen
        name={AdminRoutNames.LOANS_SCREEN}
        component={LoansScreen}
        options={{ headerTitle: "Loans" }}
      />
      <Screen
        name={AdminRoutNames.LOAN_REQUESTS_SCREEN}
        component={LoanRequestScreens}
        options={{ headerTitle: "Loan requests" }}
      />
      <Screen
        name={AdminRoutNames.USERS_SCREEN}
        component={UsersScreen}
        options={{ headerTitle: "Users" }}
      />
      <Screen
        name={AdminRoutNames.FEEDS_SCREEN}
        component={FeedsScreen}
        options={{ headerTitle: "Feeds" }}
      />
    </Navigator>
  );
};

export default AdminNavigation;
