using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlunosApi
{
    interface IAuthenticate
    {
        Task<bool> Authenticate(string email, string password);

        Task Logout();
    }
}
