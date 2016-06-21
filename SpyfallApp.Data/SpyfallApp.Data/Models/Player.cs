using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SpyfallApp.Data.Models.Enum;

namespace SpyfallApp.Data.Models
{
    public class Player
    {
        public string Name;
        public Role PlayerRole;
        public Guid GameID;

        public Player() { }

        public Player(string playerName)
        {
            Name = playerName;
            GameID = Guid.Empty;
        }
    }
}