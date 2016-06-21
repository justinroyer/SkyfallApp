using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NUnit.Framework.Constraints;
using SpyfallApp.Data.Models;
using SpyfallApp.Data.Models.Enum;

namespace SpyfallApp.Tests
{
    [TestFixture]
    public class GameTests
    {
        [Test]
        public void PlayerCanJoinOpenGame()
        {
            SpyfallGame game = new SpyfallGame(5);
            game.Join("justin");
            Assert.AreEqual(game.NumberOfPlayers, 1);
        }

        [Test]
        [ExpectedException(typeof(InvalidOperationException))]
        public void PlayerCannotJoinFullGame()
        {
            SpyfallGame game = new SpyfallGame(5);
            for (int i = 0; i < 7; i++)
            {
                game.Join("player" + 1);
            }
        }

        [Test]
        [ExpectedException(typeof(InvalidOperationException))]
        public void PlayerCannotJoinActiveGame()
        {
            SpyfallGame game = new SpyfallGame(5);
            game.Join("ben");
            game.Join("justin");
            game.Join("Felix");

            game.Play();
            game.Join("Penny");
        }

        [Test]
        [ExpectedException(typeof(InvalidOperationException))]
        public void PlayersMustHaveUniqueName()
        {
            SpyfallGame game = new SpyfallGame(5);
            game.Join("Ben");
            game.Join("Ben");
        }

        [Test]
        public void OnlyOneSpyIsAssigned()
        {
            SpyfallGame game = new SpyfallGame(4);
            var player1 = game.Join("ben");
            var player2 = game.Join("justin");
            var player3 = game.Join("felix");
            var player4 = game.Join("penny");

            List<Player> allPlayers = new List<Player>();
            allPlayers.Add(player1);
            allPlayers.Add(player2);
            allPlayers.Add(player3);
            allPlayers.Add(player4);

            IEnumerable<Player> spies = allPlayers.Where(m => m.PlayerRole == Role.Spy);
            Assert.AreEqual(spies.Count(), 1);
        }
    }
}