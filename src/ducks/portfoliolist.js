import axios from "axios";

const initialState = {
  img: "",
  title: "",
  artist: "",
  date: "",
  description: ""
};

const ADD_WORK = "ADD_WORK";

export function addWork(img, title, artist, date, description) {
  return {
    type: ADD_WORK,
    payload: axios.post("/api/portfolio", {
      img,
      title,
      artist,
      date,
      description
    })
  };
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${ADD_WORK}_FULFILLED`:
      return {
        ...state,
        img: action.payload.data.img,
        title: action.payload.data.title,
        artist: action.payload.data.artist,
        date: action.payload.data.date,
        description: action.payload.data.description
      };
    default:
      return state;
  }
}
