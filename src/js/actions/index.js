// these are really just actionCreators

module.exports = {
    addTeam: (team) => {
        return {
            type: "ADD_TEAM",
            team
        }
    }
}