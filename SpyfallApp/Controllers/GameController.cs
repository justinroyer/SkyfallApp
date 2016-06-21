using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SpyfallApp.Data.Models;
using SpyfallApp.Data.Repository;

namespace SpyfallApp.Controllers
{
    public class GameController : Controller
    {
        private GameRepository _gameRepository { get; set; }

        private GameRepository GameRepo
        {
            get
            {
                if (_gameRepository == null)
                {
                    _gameRepository = new GameRepository();
                }
                return _gameRepository;
            }
        }

        public JsonResult JoinGame(string playerName, string gameId = null)
        {
            Player player = GameRepo.JoinGame(playerName, gameId);
            return Json(player, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ViewActiveGames()
        {
            var games = GameRepo.GetActiveGames();
            return Json(games, JsonRequestBehavior.AllowGet);
        }


    }
}