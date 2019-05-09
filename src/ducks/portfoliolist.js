import axios from "axios";

const initialState = {
  works: []
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
export function getWork(img, title, artist, date, description) {
  return {
    type: ADD_WORK,
    payload: axios.get("/api/portfolio", {
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
        works: action.payload.data
      };
    default:
      return state;
  }
}
