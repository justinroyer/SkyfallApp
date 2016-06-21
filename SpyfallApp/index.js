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
    if ((gamePicked === 'newGame' || gamePicked === "") && (userName !== null || userName !== "")) {
        this.gameModel = spyfallGameApi.createGame(userName);
    }
    else if ((userName !== null || userName !== "")) {
        this.userModel = spyfallGameApi.joinGame(gamePicked, userName);
        this.gameModel = spyfallGameApi.getGameById(gamePicked);
    }
    populatePlayersList();
    getUserCard();
    updateScoreboard();
    setVotingView();
}

function getGames() {
    var listOfGames = spyfallGameApi.getGames();
    var $gameList = $('#game-list ul');
    listOfGames.forEach(function (item) {
        $gameList.append('<li><input type="radio" name="gamePicked" id="gamePicked" value=' + item.gameId + '>' + item.gameId + '</input>')
    });
}

function populatePlayersList() {
    var listOfPlayerModels = this.gameModel.listOfPlayers;
    var isCurrentPlayerSpy = this.userModel.playerRole === 'spy';
    var isNominatingRound = this.gameModel.status === 'MissionNominatingState';
    var isCurrentPlayerLeader = this.gameModel.leader.userName === this.userModel.userName;
    var $playerList = $('#players-list');
    $playerList.empty();

    listOfPlayerModels.forEach(function (user) {
        var text = document.createTextNode(user.userName);
        var playerToAppend = document.createElement('li');

        if (user.playerRole === 'spy' && isCurrentPlayerSpy) {
            playerToAppend.style = 'color: #FF0000';
        }
        playerToAppend.appendChild(text);

        if (isCurrentPlayerLeader && isNominatingRound) {
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'nominate';
            checkbox.value = user.userName;
            playerToAppend.appendChild(checkbox);
        }
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

function updateScoreboard() {
    var $listOfRounds = $('#rounds');
    $listOfRounds.empty();
    var missionResults = this.gameModel.missionOutcomes;
    missionResults.forEach(function (value) {
        console.log(value);
        if (value === 1) {
            //1 = resistance won
            $listOfRounds.append('<li><img src="/Assets/blue-circle.png"></li>');
        } else if (value === 2) {
            //2 = spies won
            $listOfRounds.append('<li><img src="/Assets/red-circle.png"></li>');
        } else {
            $listOfRounds.append('<li><img src="/Assets/empty-circle.png"></li>');
        }
    });
}

function setVotingView() {
    var isMissionVote = this.gameModel.status === 'MissionVotingState';
    if (isMissionVote) {
        $('#voting-view').prepend('<h3>Mission Vote</h3>');
    } else {
        $('#voting-view').prepend('<h3>Nomination Vote</h3>');
    }
}
