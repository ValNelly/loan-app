export interface Entity {
  id: string;
  createdAat: string;
  updatedAt: string;
}

export interface User extends Entity {
  name?: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender?: string;
  isStaff: boolean;
}

export interface Loan extends Entity {
  amount: string;
  interestRate: string;
  requests: LoanRequest[];
}
export interface Feed extends Entity {
  name: string;
  unitPrice: string;
  loans: FeedLoan[];
}
export interface FeedLoan extends Entity {
  feedId: string;
  feed: Feed;
  request: LoanRequest;
  requestId: string;
  quantity: string;
}

export interface LoanRequest extends Entity {
  userId: string;
  user: User;
  loandId: string;
  loan: Loan;
  type: "Money" | "Feed";
  amount: Number;
  status: "Pending" | "Aproved" | "Rejected";
  feedsLoan: FeedLoan[];
}
