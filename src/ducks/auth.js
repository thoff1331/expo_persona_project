import axios from "axios";

const initialState = {
  username: "",
  email: "",
  password: "",
  admin: false
};

const SIGN_UP = "SIGN_UP";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export function signUp(username, email, password) {
  return {
    type: SIGN_UP,
    payload: axios.post("/auth/signup", { username, email, password })
  };
}
export function login(username, password) {
  return {
    type: LOGIN,
    payload: axios.post("/auth/login", { username, password })
  };
}
export function logout() {
  return {
    type: LOGOUT,
    payload: axios.get("/auth/logout")
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SIGN_UP}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        username: action.payload.data.username
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data.username
      };
    case `${LOGOUT}_PENDING`:
      return {
        username: "",
        password: ""
      };
    case `${LOGOUT}_FULFILLED`:
      return {
        username: "",
        password: ""
      };
    case `${LOGOUT}_REJECTED`:
      return {
        username: "",
        password: ""
      };

    default:
      return state;
  }
}
