const initialState = {
  leagueId: "286565",
  teams: [],
  members: [],
  // currentWeek: 1
};

export default (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TEAM":
        // action correctly contains team data
        return Object.assign({}, state, {
          teams: [
            ...state.teams,
            action.team
          ]
        });
      case "ADD_MEMBER":
        return Object.assign({}, state, {
          members: [
            ...state.members,
            action.member
          ]
        });
      // case "UPDATE_CURR_WEEK":
      //   return Object.assign({}, state, {
      //     currentWeek: action.weekId
      //   });  n
      default:
        return state;
    }
  };
  