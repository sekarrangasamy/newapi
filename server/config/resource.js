'use strict';


module.exports = {


	"usergames": [{
		path: "user",
		populate: [{
			path: "level"
		}, {
			path: "connected_friends.user"
		}, {
			path: "country"
		}, {
			path: "achievements"
		}, {
			path: "level"
		}]
	}, {
		path: "game",
		populate: {
			path: 'level'
		}
	}, {
		path: 'level'
	},{
		path: "challenge.suggested_games"
	}, {
		path: "challenge.opponent"
	},{
		path: "challenge.rounds.user"
	},{
		path: "challenge.rounds.game"
	}],
	"users": [{
		path: "level"
	}, {
		path: "current_game",
		populate: {
			path: 'level',
			select: "name"
		}
	}, {
		path: "connected_friends.user"
	},{
		path: "connected_friends.req_by"
	}, {
		path: "country"
	}, {
		path: "achievements"
	}],
	"games": {
		path: "level"
	},


}