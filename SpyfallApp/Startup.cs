using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SpyfallApp.Startup))]
namespace SpyfallApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
