using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SpyfallApp.Data.Helpers;

namespace SpyfallApp.Data.Models.GameStates
{
    public class SetupState : GameState
    {
        public override Player Join(GameContext context, string playerName)
        {
            if (context.GameFull)
            {
                throw new InvalidOperationException("Sorry, this game is full");
            }
            Player player = new Player(playerName);
            context.AddPlayer(player);
            if (context.GameFull)
            {
                AssignRoles(context);
                context.SetState(new ActiveGameState());
            }
            return player;
        }

        protected void AssignRoles(GameContext context)
        {
            Random random = new Random();
            int spy = random.Next(0, context.NumberOfPlayers);
            context.Players[spy].ToSpy();
        }
    }
}