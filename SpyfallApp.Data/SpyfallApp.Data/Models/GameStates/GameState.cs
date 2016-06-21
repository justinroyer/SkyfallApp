using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpyfallApp.Data.Models.GameStates
{
    public abstract class GameState
    {
        public virtual void Init(GameContext context)
        {
            
        }

        public virtual Player Join(GameContext context, string playerName)
        {
            throw new InvalidOperationException("Sorry, you cannot join at this time");
        }

        public virtual void SpyGuessesLocation(GameContext context)
        {
            throw new InvalidOperationException("Location cannot be guessed at this time");
        }
    }
}