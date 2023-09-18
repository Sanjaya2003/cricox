import { createContext, useReducer } from "react";
import { AuthReducer } from "../context/AuthReducer";

const INITIAL_STATE = {
  user:  {"_id": "64f47009c859ba3328ddae53",
  "username": "sanju",
  "email": "sanju@gmail.com",
  "password": "$2b$10$GEqilCIOqvD7NtuiXfZ7r.kwnJO25pzKF2aSiAaUJwly/I7fh9G3G",
  "profilepicture": " ",
  "coverpicture": " ",
  "followers": [
      "64f4701bc859ba3328ddae55"
  ],
  "followings": [
      "64f4701bc859ba3328ddae55"
  ],
  "isadmin": false,
  "createdAt": "2023-09-03T11:37:45.774Z",
  "updatedAt": "2023-09-05T18:21:45.574Z",
  "__v": 0,
  "desc": "hey its my updated desc",
  "city": "jajpur",
  "from": "odisha",
  "relationship": 1},
  isfetching: false,
  error: false
};

export const Authcontext = createContext(INITIAL_STATE);

export const Authcontextprovider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); // Use Authreducer as the first argument

  return (
    <Authcontext.Provider value={{ user: state.user, isfetching: state.isfetching , error: state.error, dispatch, }}>
      {children}
    </Authcontext.Provider>
  );
};
