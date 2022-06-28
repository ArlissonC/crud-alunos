using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlunosApi.Services
{
    public class AuthenticateService : IAuthenticate
    {
        private readonly SignInManager<IdentityUser> _signInManger;
        public AuthenticateService(SignInManager<IdentityUser> signInManager)
        {
            _signInManger = signInManager;
        }

        public async Task<bool> Authenticate(string email, string password)
        {
            var result = await _signInManger.PasswordSignInAsync(email, password, false, lockoutOnFailure: false);

            return result.Succeeded;
        }

        public async Task Logout()
        {
            await _signInManger.SignOutAsync();
        }
    }
}
