using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Infrastructure.Persistence.Seed
{
    public class OwnerMigration
    {
        private readonly MongoDbContext _context;

        public OwnerMigration(MongoDbContext context)
        {
            _context = context;
        }

        public async Task MigrateUsersToOwnersAsync()
        {
            var usersCollection = _context.Database.GetCollection<User>("Users");
            var ownersCollection = _context.Owners;

            Console.WriteLine("🔄 Iniciando migración de Users a Owners...");

            // Obtener todos los usuarios
            var users = await usersCollection.Find(_ => true).ToListAsync();
            
            if (users.Count == 0)
            {
                Console.WriteLine("⚠️  No hay usuarios para migrar.");
                return;
            }

            Console.WriteLine($"📊 Encontrados {users.Count} usuarios");

            int created = 0;
            int skipped = 0;

            foreach (var user in users)
            {
                if (user.Role == "Owner" && user.Id != null)
                {
                    // Verificar si ya existe un Owner con ese ID
                    var existingOwner = await ownersCollection
                        .Find(o => o.IdOwner == user.Id)
                        .FirstOrDefaultAsync();

                    if (existingOwner == null)
                    {
                        // Crear el Owner
                        var owner = new Owner
                        {
                            IdOwner = user.Id,
                            Name = user.FullName,
                            Address = "Por actualizar",
                            Photo = user.Photo,
                            Birthday = DateTime.UtcNow.AddYears(-30) // Edad por defecto
                        };

                        await ownersCollection.InsertOneAsync(owner);
                        created++;
                        Console.WriteLine($"✅ Owner creado para usuario: {user.FullName} ({user.Id})");
                    }
                    else
                    {
                        skipped++;
                        Console.WriteLine($"⏭️  Owner ya existe para: {user.FullName}");
                    }
                }
            }

            Console.WriteLine($"\n✨ Migración completada:");
            Console.WriteLine($"   - Owners creados: {created}");
            Console.WriteLine($"   - Owners existentes (omitidos): {skipped}");
        }
    }
}