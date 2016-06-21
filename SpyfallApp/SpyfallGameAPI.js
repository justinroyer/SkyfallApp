var useMockData = true;

//TODO: Change to spyfall
var spyfallGameApi = {
    getGames: function () {
        if (useMockData) {
            return [
            {
                gameId: 'abcd1234',
                dateStarted: new Date(2015, 4, 20, 0, 0, 0, 0),
                numberOfPlayers: 5,
                numberOfVotes: 0,
                status: 'MissionNominatingState',
                listOfPlayers: [
                    {
                        userName: "leader",
                        playerRole: "Spy",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/spy.jpg'
                    },
                    {
                        userName: "justin",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/red.jpg'
                    },
                    {
                        userName: "ben",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/red.jpg'
                    },
                    {
                        userName: "felix",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/red.jpg'
                    },
                    {
                        userName: "penny",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/red.jpg'
                    }
                ],

                getVote: function (playerName) {
                    return null;
                }
            },
            {
                gameId: 'efgh5678',
                dateStarted: new Date(2015, 4, 20, 0, 0, 0, 0),
                numberOfPlayers: 8,
                numberOfVotes: 0,
                status: 'SetupState',
                listOfPlayers: [
                    {
                        userName: "leader",
                        playerRole: "Spy",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/spy.jpg'
                    },
                    {
                        userName: "justin",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/blue.jpg'
                    },
                    {
                        userName: "ben",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/blue.jpg'
                    },
                    {
                        userName: "felix",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/blue.jpg'
                    },
                    {
                        userName: "penny",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/blue.jpg'
                    },
                    {
                        userName: "jake",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/blue.jpg'
                    },
                    {
                        userName: "stephen",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/blue.jpg'
                    },
                    {
                        userName: "jacob",
                        playerRole: "Citizen",
                        gameId: "abcd1234",
                        cardUrl: '/Graphics/blue.jpg'
                    }
                ],

                getVote: function (playerName) {
                    return null;
                }
            }
            ];
        } else {
            $.ajax({
                type: "GET",
                url: "Game/ViewActiveGames",
                data: {},
                success: function (response) {
                    var listOfGames = [];
                    response.forEach(function (item) {
                        var activeGame = {
                            gameId: item.gameId,
                            dateStarted: item.dateStarted,
                            numberOfPlayers: item.numberOfPlayers,
                            numberOfVotes: item.numberOfVotes,
                            round: item.round,
                            playersNeededForMission: item.playersNeededForMission,
                            missionOutcomes: item.missionOutcomes,
                            status: item.status,
                            leader: item.leader,
                            points: item.points,
                            listOfPlayers: item.listOfPlayers,
                            getVote: item.getVote
                        };
                        listOfGames.push(activeGame);
                    });
                    return listOfGames;
                }
            });
        }

    },

    play: function () {

    },

    joinGame: function (gameId, playerName) {
        console.log('join game!');
        if (useMockData) {
            return {
                userName: playerName,
                playerRole: "Unassigned",
                gameId: gameId,
                cardUrl: ''
            }
        } else {
            $.ajax({
                type: "GET",
                url: "Game/JoinGame.html",
                data: {
                    playerName: playerName,
                    gameID: gameId
                },
                success: function (jsonPlayer) {
                    console.log(jsonPlayer);
                }
            });
        }
    },

    getGameById: function (gameId) {
        if (useMockData) {
            var listOfGames = this.getGames();
            console.log(listOfGames);
            var myGame;
            listOfGames.filter(function (value) {
                if (value.gameId === gameId) {
                    myGame = value;
                }
            });
            return myGame;
        } else {
            $.ajax({
                url: "",
                data: {},
                success: function () {

                }
            });
        }
    },

    viewPlayers: function (gameId, sendingPlayer) {

    },

    vote: function () {

    },

    pickMissionMembers: function (sendingPlayer, missionMembers) {

    },

    showSpies: function (sendingPlayer) {

    },

    createGame: function (numberOfPlayers) {
        console.log('create game');
        if (useMockData) {
            return {
                gameId: 'NEWGAME',
                dateStarted: new Date(2015, 5, 20, 0, 0, 0, 0),
                numberOfPlayers: numberOfPlayers,
                numberOfVotes: 0,
                status: 'SetupState',
                listOfPlayers: [],

                getVote: function(playerName) {
                    return null;
                }
            };
        } else {
            $.ajax({
                type: "GET",
                url: "Game/CreateGame.html",
                data: {
                    numberOfPlayers: numberOfPlayers
                },
                success: function (jsonPlayer) {
                    console.log(jsonPlayer);
                }
            });
        }
    },

    addGameToGameList: function(gameToAdd) {
        
    },

    updateGame: function (gameId) {

    }
}