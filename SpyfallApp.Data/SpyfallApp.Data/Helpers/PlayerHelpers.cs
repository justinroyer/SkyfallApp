using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SpyfallApp.Data.Models;

namespace SpyfallApp.Data.Helpers
{
    public static class PlayerHelpers
    {
        public static void ToSpy(this Player player)
        {
            player.PlayerRole = Models.Enum.Role.Spy;
        }
    }
}