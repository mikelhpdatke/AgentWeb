import { homeConstants } from "../_constants";

export const home = (state = { type: "home", message: {} }, action) => {
  let message = JSON.parse(JSON.stringify(state)).message;
  switch (action.type) {
    case homeConstants.ACTIVE:{
      let {key, val} = action.message;
      message[key] = val;
      return {
        type: "home",
        message
      };
    }
    case homeConstants.INACTIVE:{
      let {key, val} = action.message;
      message[key] = val;
      return {
        type: "home",
        message
      };
    }
    default:
      return state;
  }
};
