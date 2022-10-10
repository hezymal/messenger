using Messenger.IdentityApi.Domains;
using Microsoft.EntityFrameworkCore;

namespace Messenger.IdentityApi.Database;

#nullable disable warnings

public class IdentityDbContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public DbSet<UserPassword> UsersPasswords { get; set; }

    public IdentityDbContext(DbContextOptions<IdentityDbContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // TODO: вынести в appsettings.json
        optionsBuilder.UseSqlite("Filename=IdentityApi.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }

    public void UseTransaction(Action action)
    {
        using var transaction = this.Database.BeginTransaction();

        try
        {
            action();
            transaction.Commit();
        }
        catch (Exception exception)
        {
            transaction.Rollback();
            throw exception;
        }
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    {
                        var property = entry.Property(nameof(ICreatableEntity.CreatedDate));
                        if (property != null)
                        {
                            property.CurrentValue = DateTime.UtcNow;
                        }
                        break;
                    }

                case EntityState.Modified:
                    {
                        var property = entry.Property(nameof(IModifiableEntity.ModifiedDate));
                        if (property != null)
                        {
                            property.CurrentValue = DateTime.UtcNow;
                        }
                        break;
                    }
            }
        }

        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
}
