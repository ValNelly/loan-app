import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminRoutNames } from "./route";
import {
  LoanFormScreen,
  FeedsScreen,
  LoanRequestScreens,
  LoansScreen,
  UsersScreen,
  FeedsFormScreen,
  LoanRequestDetail,
} from "../screen";
import { LoanRequest } from "../../../lib/entities";

const Stack = createNativeStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const AdminNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={AdminRoutNames.LOAN_FORM_SCREEN}
        component={LoanFormScreen}
        options={({ route }) => ({
          headerTitle: route.params ? "Update Loan" : "Add Loan",
        })}
      />
      <Screen
        name={AdminRoutNames.LOAN_REQUEST_DETAIL_SCREEN}
        component={LoanRequestDetail}
        options={({ route }) => {
          const request = route.params as LoanRequest;
          return {
            headerTitle: `${request.user.name ?? request.user.username}'s Ksh.${
              request.amount
            } Loan`,
          };
        }}
      />
      <Screen
        name={AdminRoutNames.FEEDS_FORM_SCREEN}
        component={FeedsFormScreen}
        options={({ route }) => ({
          headerTitle: route.params ? "Update Feed" : "Add Feed",
        })}
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
