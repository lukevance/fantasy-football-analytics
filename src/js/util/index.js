const baseURL = process.env.API_BASE_URL

module.exports = {
    getTeamsWeeklyStats: async (leagueId, teamId, week) => {
        const url = `${baseURL}/team-weekly-stats`;
        const options = {
            method: 'GET',
        };
        const data = await fetch(url, options);
        const json = await data.json();
        return json;
    }
}