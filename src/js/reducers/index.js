const initialState = {
  leagueId: "286565",
  teams: [],
  members: []
};

export default (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TEAM":
        // console.log(action);
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
      default:
        return state;
    }
  };
  