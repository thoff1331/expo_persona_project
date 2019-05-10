import axios from "axios";

const initialState = {
  works: []
};

const ADD_WORK = "ADD_WORK";
const GET_WORK = "GET_WORK";
const DELETE_WORK = "DELETE_WORK";

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
    type: GET_WORK,
    payload: axios.get("/api/portfolio")
  };
}
export function deleteWork(id) {
  return {
    type: DELETE_WORK,
    payload: axios.delete(`/api/portfolio/${id}`)
  };
}
export default function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case `${ADD_WORK}_FULFILLED`:
      return {
        ...state,
        works: action.payload.data
      };
    case `${GET_WORK}_FULFILLED`:
      return {
        ...state,
        works: action.payload.data
      };
    case `${DELETE_WORK}_FULFILLED`:
      return {
        ...state,
        works: action.payload.data
      };
    default:
      return state;
  }
}
