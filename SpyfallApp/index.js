$(window).load(function () {
    $('.loader').fadeOut('slow');
    getGames();
});

//properites
var gameModel;
var userModel;
var gameState = "SetupState";

//methods
function handleJoinSubmit(event) {
    event.preventDefault();
    var gamePicked = document.querySelector('input[name="gamePicked"]:checked') ? document.querySelector('input[name="gamePicked"]:checked').value : "";
    var userName = document.getElementById('name-input').value;
    var numberOfPlayers = document.getElementById('numberOfPlayers').value;
    if ((gamePicked === 'newGame' || gamePicked === "") && (userName !== null || userName !== "")) {
        this.gameModel = spyfallGameApi.createGame(numberOfPlayers);
        this.userModel = spyfallGameApi.joinGame(this.gameModel.gameId, userName);
    }
    else if ((userName !== null || userName !== "")) {
        this.userModel = spyfallGameApi.joinGame(gamePicked, userName);
        this.gameModel = spyfallGameApi.getGameById(gamePicked);
    }
    enterGameAndWaitForSetupToComplete();
}

function isGameInSetupState(game) {
    return game.status === "SetupState";
}

function enterGameAndWaitForSetupToComplete() {
    
}

function getGames() {
    var listOfGames = spyfallGameApi.getGames().filter(isGameInSetupState);
    var $gameList = $('#game-list ul');
    listOfGames.forEach(function (item) {
        $gameList.append('<li><input type="radio" name="gamePicked" id="gamePicked" value=' + item.gameId + '>' + item.gameId + '</input>');
    });
}

function populatePlayersList() {
    var listOfPlayerModels = this.gameModel.listOfPlayers;
    var isCurrentPlayerSpy = this.userModel.playerRole === 'Spy';
    var $playerList = $('#players-list');
    $playerList.empty();

    listOfPlayerModels.forEach(function (user) {
        var text = document.createTextNode(user.userName);
        var playerToAppend = document.createElement('li');

        playerToAppend.appendChild(text);
        $playerList.append(playerToAppend);
    });
}

function viewPlayers() {
    $('#players-list').toggle();
}

function getUserCard() {
    var $userCard = $('#card-image');
    $userCard.append('<img src=' + this.userModel.cardUrl + '>');
}

function setVotingView() {
    var isMissionVote = this.gameModel.status === 'MissionVotingState';
    if (isMissionVote) {
        $('#voting-view').prepend('<h3>Mission Vote</h3>');
    } else {
        $('#voting-view').prepend('<h3>Nomination Vote</h3>');
    }
}
