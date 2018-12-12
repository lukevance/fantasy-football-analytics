const initialState = {
  leagueId: "286565",
  teams: []
};

export default (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TEAM":
        console.log(action);
        // action correctly contains team data
        return Object.assign({}, state, {
          teams: [
            ...state.teams,
            action.team
          ]
        })
      default:
        return state;
    }
  };
  