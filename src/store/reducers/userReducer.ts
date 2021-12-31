import { User, UserAction, UserState } from "../../types/user";

const defaultState: UserState = {
  data: {} as User,
  loading: false,
  error: "",
};

const userReducer = (state: UserState = defaultState, action: UserAction) => {
  switch (action.type) {
    case "LOGIN_START":
    case "IS_LOGGED_IN_START":
      return { ...state };
    case "LOGIN_SUCCESS":
    case "IS_LOGGED_IN_SUCCESS":
      return { ...state, loading: true, data: action.payload };
    case "LOGIN_ERROR":
      return { ...state, loading: false, error: "Login Error" };
    case "IS_LOGGED_IN_ERROR":
      return { ...state, loading: false, error: "Token missing or invalid" };
    case "LOGOUT":
      return { ...state,loading:false, data :{} as User, erorr: "" };
    default:
      return state;
  }
};
export default userReducer;
