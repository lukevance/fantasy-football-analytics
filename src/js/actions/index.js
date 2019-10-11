// these are really just actionCreators

module.exports = {
    addTeam: (team) => {
        return {
            type: "ADD_TEAM",
            team
        }
    },
    addMember: member => {
        return {
            type: "ADD_MEMBER",
            member
        }
    },
    // updateCurrentWeek: weekId => {
    //     return {
    //         type: "UPDATE_CURR_WEEK",
    //         weekId
    //     }
    // }
}