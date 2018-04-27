using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ProductManagementSystem.Startup))]
namespace ProductManagementSystem
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
