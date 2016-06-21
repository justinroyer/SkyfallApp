using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpyfallApp.Data.Models.GameStates
{
    public class ActiveGameState : GameState
    {
        public override void Init(GameContext context)
        {
            context.AssignStartingPlayer(this);
        }
    }
}