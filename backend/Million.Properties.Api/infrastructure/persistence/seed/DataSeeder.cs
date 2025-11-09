using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Infrastructure.Persistence.Seed
{
    public class DataSeeder
    {
        private readonly MongoDbContext _context;

        public DataSeeder(MongoDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            var ownersCollection = _context.Owners;
            var propertiesCollection = _context.Properties;
            var imagesCollection = _context.PropertyImages;

            var ownersCount = await ownersCollection.CountDocumentsAsync(_ => true);
            if (ownersCount > 0) return; // evitar duplicar seed

            var random = new Random();

            var owners = Enumerable.Range(1, 4).Select(i => new Owner
            {
                Name = $"Propietario {i}",
                Address = $"Calle {i * 10} # {i * 3}-45 Bogotá",
                Photo = $"https://randomuser.me/api/portraits/men/{i}.jpg",
                Birthday = DateTime.UtcNow.AddYears(-30 - i)
            }).ToList();

            await ownersCollection.InsertManyAsync(owners);

            var allProperties = new List<Property>();
            var allImages = new List<PropertyImage>();

            for (int i = 1; i <= 24; i++)
            {
                var owner = owners[random.Next(owners.Count)];

                var property = new Property
                {
                    Name = $"Propiedad {i}",
                    Address = $"Av. Principal #{i}-20 Medellín",
                    Price = random.Next(150_000_000, 900_000_000),
                    CodeInternal = $"CODE-{1000 + i}",
                    Year = random.Next(2000, 2024),
                    Description = "Hermosa propiedad con excelente ubicación y acabados modernos.",
                    IdOwner = owner.IdOwner!
                };

                allProperties.Add(property);
            }

            await propertiesCollection.InsertManyAsync(allProperties);

            int imgIndex = 1;
            foreach (var property in allProperties)
            {
                var image = new PropertyImage
                {
                    IdProperty = property.IdProperty!,
                    File = $"https://picsum.photos/800/600?random={imgIndex++}",
                    Enabled = true
                };
                allImages.Add(image);
            }

            await imagesCollection.InsertManyAsync(allImages);
        }
    }
}
