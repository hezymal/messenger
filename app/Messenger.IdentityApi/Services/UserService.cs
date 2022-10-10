using Messenger.IdentityApi.Database;
using Messenger.IdentityApi.Domains;
using Messenger.IdentityApi.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Messenger.IdentityApi.Services;

public class UserService
{
    private readonly IdentityDbContext dbContext;

    public UserService(IdentityDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<User> GetUserById(Guid userId)
    {
        var user = await dbContext.Users
            .Where(u => u.Id == userId)
            .AsNoTracking()
            .FirstAsync();
        return user;
    }

    public Task<User?> GetUserByEmail(string email)
    {
        return dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public Task<UserPassword> GetUserPasswordById(Guid userId)
    {
        return dbContext.UsersPasswords.FirstAsync(up => up.UserId == userId);
    }

    public async Task<Guid> AddUser(User user)
    {
        var entry = dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();
        return entry.Entity.Id;
    }

    public Task AddUserPassword(UserPassword userPassword)
    {
        dbContext.UsersPasswords.Add(userPassword);
        return dbContext.SaveChangesAsync();
    }

    public async Task SetPassword(Guid userId, string passwordHash)
    {
        var userPassword = await dbContext.UsersPasswords.FirstAsync(up => up.UserId == userId);
        userPassword.Hash = passwordHash;
        await dbContext.SaveChangesAsync();
    }

    public async Task SetPasswordResetToken(Guid userId, string? resetToken, DateTime? endDate)
    {
        var userPassword = await dbContext.UsersPasswords.FirstAsync(up => up.UserId == userId);
        userPassword.ResetToken = resetToken;
        userPassword.ResetTokenExpirationDate = endDate;
        await dbContext.SaveChangesAsync();
    }

    public async Task SetEmail(Guid userId, string email)
    {
        var user = await dbContext.Users.FirstAsync(u => u.Id == userId);
        user.Email = email;
        await dbContext.SaveChangesAsync();
    }
}
