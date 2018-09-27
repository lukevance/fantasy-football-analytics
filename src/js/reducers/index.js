export default (state = {}, action) => {
    switch (action.type) {
      case "ADD_TEAMS":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      case "MULTIPLY":
        return state * 2;
      default:
        return state;
    }
  };
  