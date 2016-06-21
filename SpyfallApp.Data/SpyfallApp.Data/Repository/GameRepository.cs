using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SpyfallApp.Data.Models;

namespace SpyfallApp.Data.Repository
{
    public class GameRepository
    {
        protected List<SpyfallGame> Games { get; set; }

        public Player JoinGame(string playerName, string gameID)
        {
            Guid myGameGuid;

            if (Guid.TryParse(gameID, out myGameGuid))
            {
                SpyfallGame game = GetGame(myGameGuid);
                if (game != null)
                {
                    return game.Join(playerName);
                }
            }
            SpyfallGame randomGame = GetRandomGameToJoin();
            return randomGame.Join(playerName);
        }

        public SpyfallGame GetRandomGameToJoin()
        {
            if (Games == null || !Games.Any(m => m.Status == Data.Models.Enum.GameStatus.Starting))
            {
                return CreateGame();
            }
            else
            {
                return Games.FirstOrDefault(m => m.Status == Data.Models.Enum.GameStatus.Starting);
            }
        }

        public SpyfallGame GetGame(Guid gameId)
        {
            return Games.FirstOrDefault(m => m.GameID == gameId);
        }

        protected IEnumerable<SpyfallGame> GetGames(Func<SpyfallGame, bool> predicate)
        {
            return Games.Where(predicate);
        }

        public IEnumerable<SpyfallGame> GetActiveGames()
        {
            return GetGames(m => m.Status != Models.Enum.GameStatus.GameOver);
        }

        public SpyfallGame CreateGame(int numberOfPlayers = 5)
        {
            SpyfallGame game = new SpyfallGame(numberOfPlayers);
            game.GameID = Guid.NewGuid();
            Games.Add(game);
            return game;
        }

        public GameRepository()
        {
            Games = new List<SpyfallGame>();
        }
    }
}