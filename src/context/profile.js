import React, {createContext, useContext, useReducer} from 'react';

const ProfileContext = createContext();
const initialState = {isLoggedIn: false, user: ''};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LoginSuccess':
      return {isLoggedIn: true, user: action.user};
    case 'UpdateSuccess':
      return {isLoggedIn: true, user: action.user};
    case 'VerifySMS':
      return {isLoggedIn: false, user: action.user};
    case 'SignOut':
      return {isLoggedIn: false, user: ''};
    default:
      throw new Error(`Unhandled action type: ${action.user}`);
  }
};

export const ProfileProvider = ({children}) => {
  const [profile, setProfile] = useReducer(reducer, initialState);

  return (
    <ProfileContext.Provider value={{profile, setProfile}}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
