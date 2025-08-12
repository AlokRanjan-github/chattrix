import { isValidUsername } from "6pp";

export const usernameValidators = (username) => {
  if (!isValidUsername(username)) {
    return {
      isValid: false,
      errorMessage: "Username is Invalid",
    };
  }
};
