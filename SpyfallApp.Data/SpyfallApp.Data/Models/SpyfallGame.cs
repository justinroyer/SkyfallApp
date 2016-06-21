using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SpyfallApp.Data.Models.Enum;
using SpyfallApp.Data.Models.GameStates;

namespace SpyfallApp.Data.Models
{
    public class SpyfallGame
    {
        public Guid GameID { get; set; }

        public DateTime DateStarted { get; set; }

        GameContext Context;

        public int NumberOfPlayers
        {
            get { return Context.NumberOfPlayers; }
        }

        public GameStatus Status
        {
            get { return Context.Status; }
        }

        public SpyfallGame(GameState state)
        {
            Context = new GameContext(state, 5);
        }

        public SpyfallGame(int numPlayers)
        {
            Context = new GameContext(new SetupState(), numPlayers);
        }

        //Methods
        public void Play()
        {
            Context.Start();
        }

        public Player Join(string playerName)
        {
            Player player = Context.Join(playerName);
            player.GameID = GameID;
            return player;
        }
    }
}