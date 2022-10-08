using Messenger.MessageApi.Domains;
using Microsoft.EntityFrameworkCore;

namespace Messenger.MessageApi.Database;

#nullable disable warnings

public class MessageDbContext : DbContext
{
    public DbSet<Message> Messages { get; set; }

    public DbSet<Group> Groups { get; set; }

    public DbSet<GroupUser> GroupsUsers { get; set; }

    public MessageDbContext(DbContextOptions<MessageDbContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // TODO: вынести в appsettings.json
        optionsBuilder.UseSqlite("Filename=MessageApi.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GroupUser>()
            .HasKey(gu => new { gu.GroupId, gu.UserId });
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    {
                        var property = entry.Property(nameof(IEntity.CreatedDate));
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
