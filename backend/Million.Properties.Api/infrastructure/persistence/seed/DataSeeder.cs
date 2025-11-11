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
            var tracesCollection = _context.PropertyTraces;

            var ownersCount = await ownersCollection.CountDocumentsAsync(_ => true);
            if (ownersCount > 0) return; // evitar duplicar seed

            var random = new Random();

            // OWNERS
            var owners = Enumerable.Range(1, 4).Select(i => new Owner
            {
                Name = $"Propietario {i}",
                Address = $"Calle {i * 10} # {i * 3}-45 Bogotá",
                Photo = $"https://randomuser.me/api/portraits/men/{i}.jpg",
                Birthday = DateTime.UtcNow.AddYears(-30 - i)
            }).ToList();

            await ownersCollection.InsertManyAsync(owners);

            // PROPERTIES
            var allProperties = new List<Property>();
            var allImages = new List<PropertyImage>();
            var allTraces = new List<PropertyTrace>();

            // URLs de imágenes de casas de muestra
            var houseImageUrls = new List<string>
            {
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762792117/house-1_pfwnr9.png",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762799922/house-2_zu26tt.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800976/house-3_qxk87r.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800980/house-4_f9tus1.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800978/house-5_yqrhu8.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800979/house-6_r0iw98.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800979/house-7_pywvnd.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800981/house-8_iltaqw.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800981/house-9_lzcerw.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800982/house-10_ubvkxh.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800981/house-11_lnkka5.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800983/house-12_geinjt.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800984/house-13_oytejc.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800987/house-14_ikale1.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800986/house-15_u3fkpy.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800985/house-16_poacqe.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800985/house-17_aji50u.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800986/house-18_fnfygu.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800989/house-19_i1dfho.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800988/house-20_nri7gk.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800976/house-21_vxgrkg.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800977/house-22_y7dpas.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800976/house-23_arsqfb.jpg",
                "https://res.cloudinary.com/dvh6kfpl6/image/upload/v1762800978/house-24_a2oigy.jpg",
            };

            var propertyTypes = new[] { "Casa", "Apartamento", "Penthouse", "Villa", "Duplex" };
            var neighborhoods = new[] { "El Poblado", "Laureles", "Envigado", "Belén", "Sabaneta", "La Estrella" };
            
            for (int i = 1; i <= 24; i++)
            {
                var owner = owners[random.Next(owners.Count)];
                var propertyType = propertyTypes[random.Next(propertyTypes.Length)];
                var neighborhood = neighborhoods[random.Next(neighborhoods.Length)];

                var property = new Property
                {
                    Name = $"{propertyType} en {neighborhood} {i}",
                    Address = $"Calle {random.Next(10, 100)} # {random.Next(10, 99)}-{random.Next(10, 99)}, {neighborhood}",
                    Price = random.Next(150_000_000, 900_000_000),
                    CodeInternal = $"PROP-{1000 + i}",
                    Year = random.Next(2000, 2024),
                    Description = GenerateDescription(propertyType, neighborhood),
                    IdOwner = owner.IdOwner!
                };

                allProperties.Add(property);
            }

            await propertiesCollection.InsertManyAsync(allProperties);

            // PROPERTY IMAGES
            int imgIndex = 0;
            foreach (var property in allProperties)
            {
                var imageUrl = houseImageUrls[imgIndex % houseImageUrls.Count];
                var image = new PropertyImage
                {
                    IdProperty = property.IdProperty!,
                    File = imageUrl,
                    Enabled = true
                };
                allImages.Add(image);
                imgIndex++;
            }

            await imagesCollection.InsertManyAsync(allImages);

            // PROPERTY TRACES
            // Generar historial de ventas para cada propiedad
            foreach (var property in allProperties)
            {
                // Entre 1 y 4 transacciones por propiedad
                var traceCount = random.Next(1, 5);
                var currentPrice = property.Price;

                for (int t = 0; t < traceCount; t++)
                {
                    // Cada venta anterior fue más barata
                    var discountFactor = 0.85m + (random.Next(0, 15) / 100m);
                    var previousPrice = currentPrice * discountFactor;
                    
                    // Fecha de venta (ordenadas de más antigua a más reciente)
                    var monthsAgo = (traceCount - t) * random.Next(6, 18);
                    var saleDate = DateTime.UtcNow.AddMonths(-monthsAgo);

                    // Calcular impuesto (aproximadamente 2-5% del valor)
                    var taxRate = 0.02m + (random.Next(0, 3) / 100m);
                    var tax = previousPrice * taxRate;

                    var trace = new PropertyTrace
                    {
                        IdProperty = property.IdProperty!,
                        DateSale = saleDate,
                        Name = GenerateTraceName(t, traceCount),
                        Value = Math.Round(previousPrice, 0),
                        Tax = Math.Round(tax, 0)
                    };

                    allTraces.Add(trace);
                    currentPrice = previousPrice;
                }
            }

            await tracesCollection.InsertManyAsync(allTraces);
        }

        private string GenerateDescription(string propertyType, string neighborhood)
        {
            var descriptions = new Dictionary<string, string[]>
            {
                ["Casa"] = new[]
                {
                    $"Hermosa casa ubicada en {neighborhood} con acabados de primera calidad. Cuenta con amplios espacios, jardín privado y zona de parqueadero. Ideal para familias que buscan tranquilidad y comodidad.",
                    $"Espectacular casa en {neighborhood}, diseño moderno y funcional. Excelente iluminación natural, áreas sociales amplias y cocina integral. Cerca de centros comerciales y vías principales.",
                    $"Casa tradicional en el corazón de {neighborhood}. Perfecta para remodelar según tus gustos. Ubicación privilegiada con fácil acceso a transporte público y todos los servicios."
                },
                ["Apartamento"] = new[]
                {
                    $"Moderno apartamento en {neighborhood} con vista panorámica. Incluye gimnasio, piscina y áreas comunes. Perfecto para profesionales jóvenes o parejas.",
                    $"Apartamento amoblado en edificio exclusivo de {neighborhood}. Seguridad 24/7, parqueadero privado y depósito. Listo para estrenar o invertir.",
                    $"Espacioso apartamento en {neighborhood} con balcón. Excelente distribución, cocina moderna y acabados elegantes. A pocos minutos de centros educativos y comerciales."
                },
                ["Penthouse"] = new[]
                {
                    $"Exclusivo penthouse en {neighborhood} con terraza privada y jacuzzi. Vista 360° de la ciudad. Lujo y confort en cada detalle. Para quienes buscan lo mejor.",
                    $"Penthouse de dos niveles en {neighborhood}. Diseño arquitectónico único, domótica integrada y acabados importados. El hogar de tus sueños."
                },
                ["Villa"] = new[]
                {
                    $"Villa campestre en {neighborhood} con jardines extensos y zona de BBQ. Perfecta para escapadas de fin de semana. Incluye casa de huéspedes y piscina.",
                    $"Elegante villa en {neighborhood} estilo mediterráneo. Amplios espacios, acabados en mármol y maderas finas. Privacidad y exclusividad garantizada."
                },
                ["Duplex"] = new[]
                {
                    $"Duplex moderno en {neighborhood} con doble altura y amplios ventanales. Ideal para familias grandes. Parqueadero doble y terraza.",
                    $"Espectacular duplex en {neighborhood}. Primera planta con zona social y cocina abierta, segunda planta con habitaciones y estudio. Excelente inversión."
                }
            };

            var options = descriptions.ContainsKey(propertyType) 
                ? descriptions[propertyType] 
                : new[] { $"Excelente propiedad en {neighborhood} con todas las comodidades." };

            return options[new Random().Next(options.Length)];
        }

        private string GenerateTraceName(int transactionNumber, int total)
        {
            if (transactionNumber == total - 1)
                return "Venta más reciente";
            
            if (transactionNumber == 0)
                return "Primera venta registrada";

            var names = new[]
            {
                "Venta a familia García",
                "Transferencia por sucesión",
                "Venta directa",
                "Adquisición por inmobiliaria",
                "Venta a inversionista",
                "Transacción comercial",
                "Compra por pareja joven",
                "Adquisición empresarial"
            };

            return names[new Random().Next(names.Length)];
        }
    }
}
