import axios from "axios";

const initialState = {
  img: "",
  name: "",
  bio: "",
  medium: ""
};

const UPDATE_USER = "UPDATE_USER";
const CHECK_USER = "CHECK_USER";

export function updateUser(img, name, bio, medium) {
  //function updateUser
  return {
    type: UPDATE_USER,
    payload: axios.post("/auth/pageSetup", {
      img,
      name,
      bio,
      medium
    })
  };
}
export function checkUser() {
  console.log("erq");
  return {
    type: CHECK_USER,
    payload: axios.get("/check/user")
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${UPDATE_USER}_FULFILLED`:
      return {
        ...state,
        img: action.payload.data.img,
        name: action.payload.data.name,
        bio: action.payload.data.bio,
        medium: action.payload.data.medium
      };
    case `${CHECK_USER}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        img: action.payload.data.img,
        name: action.payload.data.name,
        bio: action.payload.data.bio,
        medium: action.payload.data.medium
      };
    default:
      return state;
  }
}
