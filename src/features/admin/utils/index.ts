import { AdminRoutNames } from "../navigation/route";

export const menuItems = [
  {
    id: 1,
    name: "Feeds",
    route: AdminRoutNames.FEEDS_SCREEN,
    icon: require("../../../../assets/feed.png"),
  },
  {
    id: 2,
    name: "Loans",
    route: AdminRoutNames.LOANS_SCREEN,
    icon: require("../../../../assets/loan.png"),
  },
  {
    id: 3,
    name: "Users",
    route: AdminRoutNames.USERS_SCREEN,
    icon: require("../../../../assets/users.png"),
  },
  {
    id: 4,
    name: "Loan Requests",
    route: AdminRoutNames.LOAN_REQUESTS_SCREEN,
    icon: require("../../../../assets/applicant.png"),
  },
];
