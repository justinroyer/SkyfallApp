using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SpyfallApp.Data.Models.Enum;
using SpyfallApp.Data.Models.GameStates;

namespace SpyfallApp.Data.Models
{
    public class GameContext
    {
        public Player Join(string playername)
        {
            return CurrentState.Join(this, playername);
        }

        public void Start()
        {
            SetState(new ActiveGameState());
        }

        public int MaxPlayers;

        public bool GameFull
        {
            get
            {
                return MaxPlayers == NumberOfPlayers;
            }
        }

        private GameState CurrentState;

        public GameStatus Status
        {
            get
            {
                if (CurrentState is ActiveGameState)
                {
                    return GameStatus.Active;
                }
                if (CurrentState is GameOverState)
                {
                    return GameStatus.GameOver;
                }
                if (CurrentState is SetupState)
                {
                    return GameStatus.Starting;
                }
                if (CurrentState is SpyGuessingState)
                {
                    return GameStatus.SpyGuessing;
                }
                return GameStatus.Starting;
            }
        }

        public void SetState(GameState state)
        {
            CurrentState = state;
            CurrentState.Init(this);
        }

        public GameContext(GameState state, int numPlayers)
        {
            CurrentState = state;
            MaxPlayers = numPlayers;
        }

        //Player Info
        public List<Player> Players;

        public int StartingPlayer { get; private set; }

        public int NumberOfPlayers
        {
            get
            {
                try
                {
                    return Players.Count();
                }
                catch
                {
                    return 0;
                }
            }
        }

        public void AddPlayer(Player player)
        {
            if (Players == null)
                Players = new List<Player>();
            if (Players.Any(m => m.Name == player.Name))
            {
                throw new InvalidOperationException("Sorry, that name has been taken. Please select another.");
            }
            Players.Add(player);
        }

        public Player GetPlayer(string playerName)
        {
            return Players.FirstOrDefault(m => m.Name == playerName);
        }

        public void AssignStartingPlayer(GameState state)
        {
            Random random = new Random();
            int startingPlayer = random.Next(0, NumberOfPlayers);
            StartingPlayer = startingPlayer;
        }
    }
}