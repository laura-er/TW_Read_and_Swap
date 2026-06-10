using BookSwap.DataAccessLayer.Context;
using BC = BCrypt.Net.BCrypt;
using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Entities.Favorite;
using BookSwap.Domain.Entities.Report;
using BookSwap.Domain.Entities.Review;
using BookSwap.Domain.Entities.Swap;
using BookSwap.Domain.Entities.User;

namespace BookSwap.DataAccessLayer;

public static class DbInitializer
{
    public static void Seed(BookSwapDbContext db)
    {
        // Rulează doar dacă baza e goală (fără useri în afară de admin)
        if (db.Users.Count() > 1) return;

        // ─── USERI ────────────────────────────────────────────────────────────
        var users = new List<UserEntity>
        {
            new UserEntity
            {
                FirstName    = "Maria",
                LastName     = "Ionescu",
                Username     = "maria_i",
                Email        = "maria@bookswap.com",
                Phone        = "069123456",
                City         = "Chișinău",
                Latitude     = 47.0105,
                Longitude    = 28.8638,
                PasswordHash = BC.HashPassword("Maria123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-90),
            },
            new UserEntity
            {
                FirstName    = "Andrei",
                LastName     = "Popescu",
                Username     = "andrei_p",
                Email        = "andrei@bookswap.com",
                Phone        = "068234567",
                City         = "Cluj-Napoca",
                Latitude     = 46.7712,
                Longitude    = 23.6236,
                PasswordHash = BC.HashPassword("Andrei123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-85),
            },
            new UserEntity
            {
                FirstName    = "Elena",
                LastName     = "Rusu",
                Username     = "elena_r",
                Email        = "elena@bookswap.com",
                Phone        = "067345678",
                City         = "Iași",
                Latitude     = 47.1585,
                Longitude    = 27.6014,
                PasswordHash = BC.HashPassword("Elena123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-80),
            },
            new UserEntity
            {
                FirstName    = "Vlad",
                LastName     = "Munteanu",
                Username     = "vlad_m",
                Email        = "vlad@bookswap.com",
                Phone        = "060456789",
                City         = "Bălți",
                Latitude     = 47.7617,
                Longitude    = 27.9292,
                PasswordHash = BC.HashPassword("Vlad1234"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-75),
            },
            new UserEntity
            {
                FirstName    = "Ana",
                LastName     = "Popa",
                Username     = "ana_popa",
                Email        = "ana@bookswap.com",
                Phone        = "061567890",
                City         = "Timișoara",
                Latitude     = 45.7489,
                Longitude    = 21.2087,
                PasswordHash = BC.HashPassword("Ana12345"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-70),
            },
            new UserEntity
            {
                FirstName    = "Cristian",
                LastName     = "Dinu",
                Username     = "cristi_d",
                Email        = "cristi@bookswap.com",
                Phone        = "062678901",
                City         = "București",
                Latitude     = 44.4268,
                Longitude    = 26.1025,
                PasswordHash = BC.HashPassword("Cristi123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-65),
            },
            new UserEntity
            {
                FirstName    = "Ioana",
                LastName     = "Stan",
                Username     = "ioana_s",
                Email        = "ioana@bookswap.com",
                Phone        = "063789012",
                City         = "Brașov",
                Latitude     = 45.6427,
                Longitude    = 25.5887,
                PasswordHash = BC.HashPassword("Ioana123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-60),
            },
            new UserEntity
            {
                FirstName    = "Mihai",
                LastName     = "Constantin",
                Username     = "mihai_c",
                Email        = "mihai@bookswap.com",
                Phone        = "064890123",
                City         = "Constanța",
                Latitude     = 44.1598,
                Longitude    = 28.6348,
                PasswordHash = BC.HashPassword("Mihai123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-55),
            },
            new UserEntity
            {
                FirstName    = "Laura",
                LastName     = "Gheorghe",
                Username     = "laura_g",
                Email        = "laura@bookswap.com",
                Phone        = "065901234",
                City         = "Sibiu",
                Latitude     = 45.7983,
                Longitude    = 24.1256,
                PasswordHash = BC.HashPassword("Laura123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-50),
            },
            new UserEntity
            {
                FirstName    = "Radu",
                LastName     = "Barbu",
                Username     = "radu_b",
                Email        = "radu@bookswap.com",
                Phone        = "066012345",
                City         = "Galați",
                Latitude     = 45.4353,
                Longitude    = 28.0080,
                PasswordHash = BC.HashPassword("Radu1234"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-45),
            },
            new UserEntity
            {
                FirstName    = "Alina",
                LastName     = "Florea",
                Username     = "alina_f",
                Email        = "alina@bookswap.com",
                Phone        = "067123456",
                City         = "Ploiești",
                Latitude     = 44.9365,
                Longitude    = 26.0130,
                PasswordHash = BC.HashPassword("Alina123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-40),
            },
            new UserEntity
            {
                FirstName    = "Bogdan",
                LastName     = "Luca",
                Username     = "bogdan_l",
                Email        = "bogdan@bookswap.com",
                Phone        = "068234567",
                City         = "Oradea",
                Latitude     = 47.0722,
                Longitude    = 21.9218,
                PasswordHash = BC.HashPassword("Bogdan123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-35),
            },
            new UserEntity
            {
                FirstName    = "Diana",
                LastName     = "Matei",
                Username     = "diana_m",
                Email        = "diana@bookswap.com",
                Phone        = "069345678",
                City         = "Craiova",
                Latitude     = 44.3302,
                Longitude    = 23.7949,
                PasswordHash = BC.HashPassword("Diana123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-30),
            },
            new UserEntity
            {
                FirstName    = "Sorin",
                LastName     = "Dobre",
                Username     = "sorin_d",
                Email        = "sorin@bookswap.com",
                Phone        = "060456789",
                City         = "Arad",
                Latitude     = 46.1866,
                Longitude    = 21.3123,
                PasswordHash = BC.HashPassword("Sorin123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-25),
            },
            new UserEntity
            {
                FirstName    = "Teodora",
                LastName     = "Nistor",
                Username     = "teo_n",
                Email        = "teo@bookswap.com",
                Phone        = "061567890",
                City         = "Chișinău",
                Latitude     = 47.0245,
                Longitude    = 28.8322,
                PasswordHash = BC.HashPassword("Teo12345"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-20),
            },
        };

        db.Users.AddRange(users);
        db.SaveChanges();

        // ─── CĂRȚI ────────────────────────────────────────────────────────────
        var books = new List<BookEntity>
        {
            // Maria (users[0]) — 4 cărți
            new BookEntity
            {
                Title       = "Crimă și pedeapsă",
                Author      = "Fyodor Dostoevsky",
                Genre       = "fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231432-L.jpg",
                Description = "Un roman psihologic profund despre crimă, vinovăție și răscumpărare.",
                IsAvailable = true,
                OwnerId     = users[0].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-88),
            },
            new BookEntity
            {
                Title       = "1984",
                Author      = "George Orwell",
                Genre       = "sci-fi",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8575708-L.jpg",
                Description = "Un roman distopic despre un regim totalitar care controlează gândirea.",
                IsAvailable = true,
                OwnerId     = users[0].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-85),
            },
            new BookEntity
            {
                Title       = "Micul Prinț",
                Author      = "Antoine de Saint-Exupéry",
                Genre       = "fiction",
                Condition   = "fair",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8739161-L.jpg",
                Description = "O poveste filozofică și poetică despre prietenie și iubire.",
                IsAvailable = false,
                OwnerId     = users[0].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-80),
            },
            new BookEntity
            {
                Title       = "Maestrul și Margareta",
                Author      = "Mihail Bulgakov",
                Genre       = "fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10507550-L.jpg",
                Description = "Un roman fantastic despre vizita diavolului în Moscova sovietică.",
                IsAvailable = true,
                OwnerId     = users[0].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-75),
            },

            // Andrei (users[1]) — 4 cărți
            new BookEntity
            {
                Title       = "Sapiens: O scurtă istorie a omenirii",
                Author      = "Yuval Noah Harari",
                Genre       = "history",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10523024-L.jpg",
                Description = "O privire fascinantă asupra istoriei speciei umane.",
                IsAvailable = true,
                OwnerId     = users[1].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-82),
            },
            new BookEntity
            {
                Title       = "Stăpânul inelelor",
                Author      = "J.R.R. Tolkien",
                Genre       = "fantasy",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8743043-L.jpg",
                Description = "Epopeea fantasy clasică despre lupta dintre bine și rău în Pământul de Mijloc.",
                IsAvailable = true,
                OwnerId     = users[1].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-78),
            },
            new BookEntity
            {
                Title       = "Dune",
                Author      = "Frank Herbert",
                Genre       = "sci-fi",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10604313-L.jpg",
                Description = "Un roman epic de science-fiction pe planeta deșertică Arrakis.",
                IsAvailable = true,
                OwnerId     = users[1].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-70),
            },
            new BookEntity
            {
                Title       = "Homo Deus",
                Author      = "Yuval Noah Harari",
                Genre       = "non-fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10781696-L.jpg",
                Description = "O scurtă istorie a viitorului — ce urmează după Sapiens.",
                IsAvailable = true,
                OwnerId     = users[1].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-65),
            },

            // Elena (users[2]) — 4 cărți
            new BookEntity
            {
                Title       = "Mândrie și prejudecată",
                Author      = "Jane Austen",
                Genre       = "romance",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8739252-L.jpg",
                Description = "Romanul clasic despre dragoste, clasă socială și prejudecăți în Anglia.",
                IsAvailable = true,
                OwnerId     = users[2].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-78),
            },
            new BookEntity
            {
                Title       = "Atomic Habits",
                Author      = "James Clear",
                Genre       = "self-help",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10404426-L.jpg",
                Description = "Ghid practic pentru formarea obiceiurilor bune și eliminarea celor rele.",
                IsAvailable = true,
                OwnerId     = users[2].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-72),
            },
            new BookEntity
            {
                Title       = "Câinele din Baskerville",
                Author      = "Arthur Conan Doyle",
                Genre       = "mystery",
                Condition   = "fair",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231856-L.jpg",
                Description = "Cel mai celebru caz al marelui detectiv Sherlock Holmes.",
                IsAvailable = true,
                OwnerId     = users[2].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-68),
            },
            new BookEntity
            {
                Title       = "Femeia în alb",
                Author      = "Wilkie Collins",
                Genre       = "mystery",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231600-L.jpg",
                Description = "Unul dintre primele romane polițiste din literatura universală.",
                IsAvailable = true,
                OwnerId     = users[2].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-60),
            },

            // Vlad (users[3]) — 3 cărți
            new BookEntity
            {
                Title       = "Steve Jobs",
                Author      = "Walter Isaacson",
                Genre       = "biography",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/7881303-L.jpg",
                Description = "Biografia autorizată a fondatorului Apple, bazată pe interviuri exclusive.",
                IsAvailable = true,
                OwnerId     = users[3].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-73),
            },
            new BookEntity
            {
                Title       = "Călătorie spre centrul Pământului",
                Author      = "Jules Verne",
                Genre       = "fiction",
                Condition   = "worn",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231504-L.jpg",
                Description = "O aventură extraordinară în adâncurile Pământului.",
                IsAvailable = true,
                OwnerId     = users[3].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-68),
            },
            new BookEntity
            {
                Title       = "Elon Musk",
                Author      = "Walter Isaacson",
                Genre       = "biography",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/14231456-L.jpg",
                Description = "Biografia celui mai controversat antreprenor al secolului XXI.",
                IsAvailable = true,
                OwnerId     = users[3].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-55),
            },

            // Ana (users[4]) — 3 cărți
            new BookEntity
            {
                Title       = "Harry Potter și Piatra Filosofală",
                Author      = "J.K. Rowling",
                Genre       = "fantasy",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10110415-L.jpg",
                Description = "Primul volum din seria Harry Potter — începutul unei lumi magice.",
                IsAvailable = true,
                OwnerId     = users[4].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-68),
            },
            new BookEntity
            {
                Title       = "Gândire rapidă, gândire lentă",
                Author      = "Daniel Kahneman",
                Genre       = "non-fiction",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10335185-L.jpg",
                Description = "Cum funcționează mintea umană — două sisteme de gândire explicate simplu.",
                IsAvailable = true,
                OwnerId     = users[4].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-62),
            },
            new BookEntity
            {
                Title       = "Alchimistul",
                Author      = "Paulo Coelho",
                Genre       = "fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8739550-L.jpg",
                Description = "Povestea unui cioban andaluz în căutarea comorii și a legendei personale.",
                IsAvailable = false,
                OwnerId     = users[4].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-55),
            },

            // Cristian (users[5]) — 3 cărți
            new BookEntity
            {
                Title       = "Codul lui Da Vinci",
                Author      = "Dan Brown",
                Genre       = "thriller",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231770-L.jpg",
                Description = "Un thriller captivant despre conspirații în lumea artei și religiei.",
                IsAvailable = true,
                OwnerId     = users[5].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-63),
            },
            new BookEntity
            {
                Title       = "Inferno",
                Author      = "Dan Brown",
                Genre       = "thriller",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10335400-L.jpg",
                Description = "Robert Langdon descoperă un complot care amenință întreaga umanitate.",
                IsAvailable = true,
                OwnerId     = users[5].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-58),
            },
            new BookEntity
            {
                Title       = "Clean Code",
                Author      = "Robert C. Martin",
                Genre       = "non-fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8775825-L.jpg",
                Description = "Ghidul esențial pentru scrierea unui cod curat și ușor de întreținut.",
                IsAvailable = true,
                OwnerId     = users[5].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-50),
            },

            // Ioana (users[6]) — 3 cărți
            new BookEntity
            {
                Title       = "Mici femei",
                Author      = "Louisa May Alcott",
                Genre       = "fiction",
                Condition   = "fair",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8739300-L.jpg",
                Description = "Povestea celor patru surori March și a creșterii lor în timpul Războiului Civil.",
                IsAvailable = true,
                OwnerId     = users[6].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-58),
            },
            new BookEntity
            {
                Title       = "Doamna Bovary",
                Author      = "Gustave Flaubert",
                Genre       = "fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231650-L.jpg",
                Description = "Povestea Emmei Bovary, o femeie care caută evadarea din viața banală.",
                IsAvailable = true,
                OwnerId     = users[6].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-52),
            },
            new BookEntity
            {
                Title       = "Cuibul de viespi",
                Author      = "Agatha Christie",
                Genre       = "mystery",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231900-L.jpg",
                Description = "Un mister captivant al reginei crimei — Agatha Christie la cel mai bun.",
                IsAvailable = true,
                OwnerId     = users[6].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-45),
            },

            // Mihai (users[7]) — 3 cărți
            new BookEntity
            {
                Title       = "Fahrenheit 451",
                Author      = "Ray Bradbury",
                Genre       = "sci-fi",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231450-L.jpg",
                Description = "O lume în care cărțile sunt interzise și arse — un clasic distopic.",
                IsAvailable = true,
                OwnerId     = users[7].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-53),
            },
            new BookEntity
            {
                Title       = "Brave New World",
                Author      = "Aldous Huxley",
                Genre       = "sci-fi",
                Condition   = "fair",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231500-L.jpg",
                Description = "O viziune distopică despre o societate controlată prin condiționare.",
                IsAvailable = true,
                OwnerId     = users[7].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-48),
            },
            new BookEntity
            {
                Title       = "Neuromancer",
                Author      = "William Gibson",
                Genre       = "sci-fi",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231520-L.jpg",
                Description = "Romanul fondator al cyberpunkului — o capodoperă a literaturii SF.",
                IsAvailable = true,
                OwnerId     = users[7].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-40),
            },

            // Laura (users[8]) — 3 cărți
            new BookEntity
            {
                Title       = "Puterea prezentului",
                Author      = "Eckhart Tolle",
                Genre       = "self-help",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10335200-L.jpg",
                Description = "Un ghid spiritual pentru iluminare și trăit în prezent.",
                IsAvailable = true,
                OwnerId     = users[8].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-48),
            },
            new BookEntity
            {
                Title       = "Omul în căutarea sensului vieții",
                Author      = "Viktor Frankl",
                Genre       = "non-fiction",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10335250-L.jpg",
                Description = "Experiența unui psihiatru în lagărele de concentrare naziste.",
                IsAvailable = true,
                OwnerId     = users[8].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-42),
            },
            new BookEntity
            {
                Title       = "Insula misterioasă",
                Author      = "Jules Verne",
                Genre       = "fiction",
                Condition   = "worn",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231510-L.jpg",
                Description = "Supraviețuitorii unui naufragiu construiesc o civilizație pe o insulă pustie.",
                IsAvailable = true,
                OwnerId     = users[8].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-35),
            },

            // Radu (users[9]) — 3 cărți
            new BookEntity
            {
                Title       = "Război și pace",
                Author      = "Lev Tolstoi",
                Genre       = "fiction",
                Condition   = "fair",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231600-L.jpg",
                Description = "Capodopera lui Tolstoi despre Rusia în epoca napoleoniană.",
                IsAvailable = true,
                OwnerId     = users[9].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-43),
            },
            new BookEntity
            {
                Title       = "Anna Karenina",
                Author      = "Lev Tolstoi",
                Genre       = "fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231620-L.jpg",
                Description = "Povestea tragică a unei femei prinsă între datorie și pasiune.",
                IsAvailable = true,
                OwnerId     = users[9].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-38),
            },
            new BookEntity
            {
                Title       = "Don Quijote",
                Author      = "Miguel de Cervantes",
                Genre       = "fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231640-L.jpg",
                Description = "Primul roman modern din literatura universală — aventurile cavalerului rătăcitor.",
                IsAvailable = true,
                OwnerId     = users[9].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-30),
            },

            // Alina (users[10]) — 3 cărți
            new BookEntity
            {
                Title       = "Jocul foamei",
                Author      = "Suzanne Collins",
                Genre       = "fantasy",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10110500-L.jpg",
                Description = "Într-o lume distopică, tinerii se luptă pentru supraviețuire în jocuri mortale.",
                IsAvailable = true,
                OwnerId     = users[10].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-38),
            },
            new BookEntity
            {
                Title       = "Divergent",
                Author      = "Veronica Roth",
                Genre       = "fantasy",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10110550-L.jpg",
                Description = "O societate împărțită în facțiuni — o tânără descoperă că nu aparține niciuneia.",
                IsAvailable = true,
                OwnerId     = users[10].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-32),
            },
            new BookEntity
            {
                Title       = "Moromeții",
                Author      = "Marin Preda",
                Genre       = "fiction",
                Condition   = "fair",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231680-L.jpg",
                Description = "Capodopera literaturii române despre familia Moromete și viața rurală.",
                IsAvailable = true,
                OwnerId     = users[10].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-25),
            },

            // Bogdan (users[11]) — 2 cărți
            new BookEntity
            {
                Title       = "Psihologia mulțimilor",
                Author      = "Gustave Le Bon",
                Genre       = "non-fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10335300-L.jpg",
                Description = "Cum se comportă oamenii în mulțime — o analiză psihologică clasică.",
                IsAvailable = true,
                OwnerId     = users[11].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-33),
            },
            new BookEntity
            {
                Title       = "Influența: Psihologia persuasiunii",
                Author      = "Robert Cialdini",
                Genre       = "self-help",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10335350-L.jpg",
                Description = "Cele șase principii ale persuasiunii explicate cu exemple din viața reală.",
                IsAvailable = true,
                OwnerId     = users[11].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-27),
            },

            // Diana (users[12]) — 2 cărți
            new BookEntity
            {
                Title       = "Zbor deasupra unui cuib de cuci",
                Author      = "Ken Kesey",
                Genre       = "fiction",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231700-L.jpg",
                Description = "Un roman despre libertate și constrângere într-un ospiciu american.",
                IsAvailable = true,
                OwnerId     = users[12].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-28),
            },
            new BookEntity
            {
                Title       = "Portocala mecanică",
                Author      = "Anthony Burgess",
                Genre       = "sci-fi",
                Condition   = "fair",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231720-L.jpg",
                Description = "Un roman distopic despre violență, liber arbitru și condiționare socială.",
                IsAvailable = true,
                OwnerId     = users[12].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-22),
            },

            // Sorin (users[13]) — 2 cărți
            new BookEntity
            {
                Title       = "Cel mai bogat om din Babilon",
                Author      = "George S. Clason",
                Genre       = "self-help",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10335400-L.jpg",
                Description = "Lecții financiare atemporale prezentate prin parabole din Babilonul antic.",
                IsAvailable = true,
                OwnerId     = users[13].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-23),
            },
            new BookEntity
            {
                Title       = "Tată bogat, tată sărac",
                Author      = "Robert Kiyosaki",
                Genre       = "self-help",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10335450-L.jpg",
                Description = "Ce îi învață bogații pe copiii lor despre bani — lecții esențiale de educație financiară.",
                IsAvailable = true,
                OwnerId     = users[13].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-18),
            },

            // Teodora (users[14]) — 2 cărți
            new BookEntity
            {
                Title       = "Numele trandafirului",
                Author      = "Umberto Eco",
                Genre       = "mystery",
                Condition   = "good",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231740-L.jpg",
                Description = "Un thriller medieval desfășurat într-o mânăstire benedictină din Italia.",
                IsAvailable = true,
                OwnerId     = users[14].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-19),
            },
            new BookEntity
            {
                Title       = "Pendulul lui Foucault",
                Author      = "Umberto Eco",
                Genre       = "thriller",
                Condition   = "fair",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231760-L.jpg",
                Description = "Trei editori inventează o conspirație și descoperă că devine reală.",
                IsAvailable = true,
                OwnerId     = users[14].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-12),
            },
        };

        db.Books.AddRange(books);
        db.SaveChanges();

        // ─── REVIEWS ──────────────────────────────────────────────────────────
        var reviews = new List<ReviewEntity>
        {
            new ReviewEntity { BookId = books[0].Id,  UserId = users[1].Id,  Rating = 5, Comment = "O capodoperă absolută! Dostoevsky explorează psihologia umană cu o profunzime incredibilă.", CreatedAt = DateTime.UtcNow.AddDays(-80) },
            new ReviewEntity { BookId = books[0].Id,  UserId = users[2].Id,  Rating = 4, Comment = "Foarte bun, dar destul de dens. Necesită răbdare, dar merită fiecare pagină.", CreatedAt = DateTime.UtcNow.AddDays(-75) },
            new ReviewEntity { BookId = books[0].Id,  UserId = users[6].Id,  Rating = 5, Comment = "Unul dintre cele mai bune romane pe care le-am citit. Emoționant și profund.", CreatedAt = DateTime.UtcNow.AddDays(-60) },
            new ReviewEntity { BookId = books[1].Id,  UserId = users[2].Id,  Rating = 5, Comment = "Relevant și azi, poate chiar mai mult decât când a fost scris. Înfricoșător de actual.", CreatedAt = DateTime.UtcNow.AddDays(-70) },
            new ReviewEntity { BookId = books[1].Id,  UserId = users[3].Id,  Rating = 5, Comment = "Orwell era profet. O lectură obligatorie pentru oricine trăiește în lumea modernă.", CreatedAt = DateTime.UtcNow.AddDays(-65) },
            new ReviewEntity { BookId = books[1].Id,  UserId = users[8].Id,  Rating = 4, Comment = "Distopie clasică. Îți face să apreciezi libertatea de gândire.", CreatedAt = DateTime.UtcNow.AddDays(-50) },
            new ReviewEntity { BookId = books[3].Id,  UserId = users[4].Id,  Rating = 5, Comment = "Bulgakov a scris ceva unic. Ironie, magie și filozofie în același roman.", CreatedAt = DateTime.UtcNow.AddDays(-68) },
            new ReviewEntity { BookId = books[4].Id,  UserId = users[0].Id,  Rating = 5, Comment = "Harari schimbă complet perspectiva asupra istoriei. Fascinant și accesibil!", CreatedAt = DateTime.UtcNow.AddDays(-72) },
            new ReviewEntity { BookId = books[4].Id,  UserId = users[4].Id,  Rating = 4, Comment = "Foarte informativ, dar unele teorii sunt discutabile. Totuși, o lectură valoroasă.", CreatedAt = DateTime.UtcNow.AddDays(-55) },
            new ReviewEntity { BookId = books[4].Id,  UserId = users[9].Id,  Rating = 5, Comment = "Cel mai bun non-fiction pe care l-am citit în ultimii ani. Schimbă perspectiva.", CreatedAt = DateTime.UtcNow.AddDays(-40) },
            new ReviewEntity { BookId = books[5].Id,  UserId = users[0].Id,  Rating = 5, Comment = "Tolkien a creat o lume completă. Nu am cuvinte pentru această capodoperă.", CreatedAt = DateTime.UtcNow.AddDays(-68) },
            new ReviewEntity { BookId = books[5].Id,  UserId = users[10].Id, Rating = 4, Comment = "Epică și frumoasă, dar destul de lungă. Worldbuilding-ul este extraordinar.", CreatedAt = DateTime.UtcNow.AddDays(-30) },
            new ReviewEntity { BookId = books[6].Id,  UserId = users[2].Id,  Rating = 4, Comment = "Science fiction la cel mai înalt nivel. Worldbuilding impresionant și detaliat.", CreatedAt = DateTime.UtcNow.AddDays(-62) },
            new ReviewEntity { BookId = books[6].Id,  UserId = users[7].Id,  Rating = 5, Comment = "Unul dintre cele mai bune romane SF din toate timpurile. O experiență unică.", CreatedAt = DateTime.UtcNow.AddDays(-45) },
            new ReviewEntity { BookId = books[8].Id,  UserId = users[1].Id,  Rating = 4, Comment = "Austen scrie cu ironie fină și personaje memorabile. Clasic bine meritat.", CreatedAt = DateTime.UtcNow.AddDays(-58) },
            new ReviewEntity { BookId = books[8].Id,  UserId = users[6].Id,  Rating = 5, Comment = "Am recitit-o de trei ori și de fiecare dată descopăr ceva nou. Sublim.", CreatedAt = DateTime.UtcNow.AddDays(-40) },
            new ReviewEntity { BookId = books[9].Id,  UserId = users[3].Id,  Rating = 5, Comment = "Mi-a schimbat modul de a privi obiceiurile zilnice. Recomand cu căldură!", CreatedAt = DateTime.UtcNow.AddDays(-55) },
            new ReviewEntity { BookId = books[9].Id,  UserId = users[11].Id, Rating = 4, Comment = "Foarte practic. Am aplicat câteva tehnici și deja văd rezultate.", CreatedAt = DateTime.UtcNow.AddDays(-22) },
            new ReviewEntity { BookId = books[10].Id, UserId = users[0].Id,  Rating = 5, Comment = "Clasicul misterelor! Holmes rămâne neîntrecut. O lectură perfectă.", CreatedAt = DateTime.UtcNow.AddDays(-52) },
            new ReviewEntity { BookId = books[12].Id, UserId = users[4].Id,  Rating = 4, Comment = "Isaacson știe să spună o poveste. Biografia lui Jobs e captivantă.", CreatedAt = DateTime.UtcNow.AddDays(-65) },
            new ReviewEntity { BookId = books[12].Id, UserId = users[5].Id,  Rating = 5, Comment = "Fascinant! Am citit-o dintr-o suflare. Jobs a fost cu adevărat revoluționar.", CreatedAt = DateTime.UtcNow.AddDays(-50) },
            new ReviewEntity { BookId = books[14].Id, UserId = users[1].Id,  Rating = 5, Comment = "Magie pură! M-am îndrăgostit de lumea creată de Rowling.", CreatedAt = DateTime.UtcNow.AddDays(-60) },
            new ReviewEntity { BookId = books[14].Id, UserId = users[2].Id,  Rating = 5, Comment = "Nostalgie pură. O serie care definește o generație întreagă.", CreatedAt = DateTime.UtcNow.AddDays(-45) },
            new ReviewEntity { BookId = books[14].Id, UserId = users[10].Id, Rating = 5, Comment = "Am crescut cu Harry Potter și îl recitesc cu aceeași plăcere.", CreatedAt = DateTime.UtcNow.AddDays(-20) },
            new ReviewEntity { BookId = books[16].Id, UserId = users[2].Id,  Rating = 5, Comment = "Thriller captivant! Brown știe să construiască suspans.", CreatedAt = DateTime.UtcNow.AddDays(-55) },
            new ReviewEntity { BookId = books[16].Id, UserId = users[8].Id,  Rating = 4, Comment = "Acțiune rapidă și intrigă bine construită. Lectură plăcută.", CreatedAt = DateTime.UtcNow.AddDays(-38) },
            new ReviewEntity { BookId = books[18].Id, UserId = users[4].Id,  Rating = 5, Comment = "Clean Code mi-a schimbat complet modul de a scrie cod. Esențial.", CreatedAt = DateTime.UtcNow.AddDays(-42) },
            new ReviewEntity { BookId = books[23].Id, UserId = users[0].Id,  Rating = 4, Comment = "O lectură profundă. Frankl ne arată că sensul vieții se găsește chiar în suferință.", CreatedAt = DateTime.UtcNow.AddDays(-35) },
            new ReviewEntity { BookId = books[23].Id, UserId = users[6].Id,  Rating = 5, Comment = "Una dintre cele mai importante cărți pe care le-am citit. Transformatoare.", CreatedAt = DateTime.UtcNow.AddDays(-28) },
            new ReviewEntity { BookId = books[27].Id, UserId = users[3].Id,  Rating = 5, Comment = "Tolstoi la cel mai înalt nivel. O frescă a societății ruse cum nu s-a mai văzut.", CreatedAt = DateTime.UtcNow.AddDays(-35) },
            new ReviewEntity { BookId = books[33].Id, UserId = users[5].Id,  Rating = 5, Comment = "Cel mai bun roman distopic după 1984. Bradbury era vizionar.", CreatedAt = DateTime.UtcNow.AddDays(-45) },
            new ReviewEntity { BookId = books[38].Id, UserId = users[7].Id,  Rating = 4, Comment = "Cialdini explică persuasiunea cu exemple concrete. Util și în viața de zi cu zi.", CreatedAt = DateTime.UtcNow.AddDays(-20) },
            new ReviewEntity { BookId = books[41].Id, UserId = users[9].Id,  Rating = 5, Comment = "Lecție financiară prezentată magistral. Am recomandat-o tuturor prietenilor.", CreatedAt = DateTime.UtcNow.AddDays(-15) },
            new ReviewEntity { BookId = books[43].Id, UserId = users[0].Id,  Rating = 5, Comment = "Eco este genial. Combinația de mister medieval și filozofie este irezistibilă.", CreatedAt = DateTime.UtcNow.AddDays(-12) },
        };

        db.Reviews.AddRange(reviews);
        db.SaveChanges();

        // ─── FAVORITES ────────────────────────────────────────────────────────
        var favorites = new List<FavoriteEntity>
        {
            new FavoriteEntity { UserId = users[0].Id,  BookId = books[5].Id,  CreatedAt = DateTime.UtcNow.AddDays(-70) },
            new FavoriteEntity { UserId = users[0].Id,  BookId = books[6].Id,  CreatedAt = DateTime.UtcNow.AddDays(-65) },
            new FavoriteEntity { UserId = users[0].Id,  BookId = books[14].Id, CreatedAt = DateTime.UtcNow.AddDays(-50) },
            new FavoriteEntity { UserId = users[0].Id,  BookId = books[43].Id, CreatedAt = DateTime.UtcNow.AddDays(-10) },
            new FavoriteEntity { UserId = users[1].Id,  BookId = books[0].Id,  CreatedAt = DateTime.UtcNow.AddDays(-80) },
            new FavoriteEntity { UserId = users[1].Id,  BookId = books[9].Id,  CreatedAt = DateTime.UtcNow.AddDays(-55) },
            new FavoriteEntity { UserId = users[1].Id,  BookId = books[33].Id, CreatedAt = DateTime.UtcNow.AddDays(-40) },
            new FavoriteEntity { UserId = users[2].Id,  BookId = books[1].Id,  CreatedAt = DateTime.UtcNow.AddDays(-65) },
            new FavoriteEntity { UserId = users[2].Id,  BookId = books[4].Id,  CreatedAt = DateTime.UtcNow.AddDays(-60) },
            new FavoriteEntity { UserId = users[2].Id,  BookId = books[16].Id, CreatedAt = DateTime.UtcNow.AddDays(-45) },
            new FavoriteEntity { UserId = users[3].Id,  BookId = books[14].Id, CreatedAt = DateTime.UtcNow.AddDays(-55) },
            new FavoriteEntity { UserId = users[3].Id,  BookId = books[8].Id,  CreatedAt = DateTime.UtcNow.AddDays(-50) },
            new FavoriteEntity { UserId = users[3].Id,  BookId = books[27].Id, CreatedAt = DateTime.UtcNow.AddDays(-30) },
            new FavoriteEntity { UserId = users[4].Id,  BookId = books[5].Id,  CreatedAt = DateTime.UtcNow.AddDays(-60) },
            new FavoriteEntity { UserId = users[4].Id,  BookId = books[10].Id, CreatedAt = DateTime.UtcNow.AddDays(-45) },
            new FavoriteEntity { UserId = users[5].Id,  BookId = books[4].Id,  CreatedAt = DateTime.UtcNow.AddDays(-55) },
            new FavoriteEntity { UserId = users[5].Id,  BookId = books[18].Id, CreatedAt = DateTime.UtcNow.AddDays(-40) },
            new FavoriteEntity { UserId = users[6].Id,  BookId = books[0].Id,  CreatedAt = DateTime.UtcNow.AddDays(-50) },
            new FavoriteEntity { UserId = users[6].Id,  BookId = books[8].Id,  CreatedAt = DateTime.UtcNow.AddDays(-35) },
            new FavoriteEntity { UserId = users[7].Id,  BookId = books[6].Id,  CreatedAt = DateTime.UtcNow.AddDays(-45) },
            new FavoriteEntity { UserId = users[7].Id,  BookId = books[34].Id, CreatedAt = DateTime.UtcNow.AddDays(-30) },
            new FavoriteEntity { UserId = users[8].Id,  BookId = books[1].Id,  CreatedAt = DateTime.UtcNow.AddDays(-40) },
            new FavoriteEntity { UserId = users[8].Id,  BookId = books[23].Id, CreatedAt = DateTime.UtcNow.AddDays(-25) },
            new FavoriteEntity { UserId = users[9].Id,  BookId = books[4].Id,  CreatedAt = DateTime.UtcNow.AddDays(-35) },
            new FavoriteEntity { UserId = users[9].Id,  BookId = books[41].Id, CreatedAt = DateTime.UtcNow.AddDays(-12) },
            new FavoriteEntity { UserId = users[10].Id, BookId = books[5].Id,  CreatedAt = DateTime.UtcNow.AddDays(-30) },
            new FavoriteEntity { UserId = users[11].Id, BookId = books[9].Id,  CreatedAt = DateTime.UtcNow.AddDays(-20) },
            new FavoriteEntity { UserId = users[12].Id, BookId = books[33].Id, CreatedAt = DateTime.UtcNow.AddDays(-18) },
            new FavoriteEntity { UserId = users[13].Id, BookId = books[41].Id, CreatedAt = DateTime.UtcNow.AddDays(-15) },
            new FavoriteEntity { UserId = users[14].Id, BookId = books[0].Id,  CreatedAt = DateTime.UtcNow.AddDays(-10) },
        };

        db.Favorites.AddRange(favorites);
        db.SaveChanges();

        // ─── SWAP REQUESTS ────────────────────────────────────────────────────
        var swaps = new List<SwapRequestEntity>
        {
            // Andrei cere 1984 de la Maria, oferă Dune — Pending
            new SwapRequestEntity
            {
                RequesterId     = users[1].Id,
                OwnerId         = users[0].Id,
                BookOfferedId   = books[6].Id,
                BookRequestedId = books[1].Id,
                Message         = "Bună! Aș vrea să fac schimb — ofer Dune pentru 1984. Cred că o să-ți placă!",
                Status          = SwapStatus.Pending,
                CreatedAt       = DateTime.UtcNow.AddDays(-15),
                UpdatedAt       = DateTime.UtcNow.AddDays(-15),
            },
            // Elena cere Sapiens de la Andrei, oferă Mândrie și prejudecată — Accepted
            new SwapRequestEntity
            {
                RequesterId     = users[2].Id,
                OwnerId         = users[1].Id,
                BookOfferedId   = books[8].Id,
                BookRequestedId = books[4].Id,
                Message         = "Salut! Sapiens e pe lista mea de mult. Ofer Mândrie și prejudecată în schimb.",
                Status          = SwapStatus.Accepted,
                CreatedAt       = DateTime.UtcNow.AddDays(-40),
                UpdatedAt       = DateTime.UtcNow.AddDays(-38),
            },
            // Vlad cere Câinele din Baskerville de la Elena, oferă Jules Verne — Pending
            new SwapRequestEntity
            {
                RequesterId     = users[3].Id,
                OwnerId         = users[2].Id,
                BookOfferedId   = books[13].Id,
                BookRequestedId = books[10].Id,
                Message         = "Holmes e preferatul meu! Ofer Jules Verne — o aventură clasică.",
                Status          = SwapStatus.Pending,
                CreatedAt       = DateTime.UtcNow.AddDays(-10),
                UpdatedAt       = DateTime.UtcNow.AddDays(-10),
            },
            // Ana cere Steve Jobs de la Vlad, oferă Harry Potter — Rejected
            new SwapRequestEntity
            {
                RequesterId     = users[4].Id,
                OwnerId         = users[3].Id,
                BookOfferedId   = books[14].Id,
                BookRequestedId = books[12].Id,
                Message         = "Biografia lui Jobs e fascinantă. Ofer Harry Potter în schimb!",
                Status          = SwapStatus.Rejected,
                CreatedAt       = DateTime.UtcNow.AddDays(-30),
                UpdatedAt       = DateTime.UtcNow.AddDays(-28),
            },
            // Cristian cere Stăpânul inelelor de la Andrei, oferă Clean Code — Accepted
            new SwapRequestEntity
            {
                RequesterId     = users[5].Id,
                OwnerId         = users[1].Id,
                BookOfferedId   = books[18].Id,
                BookRequestedId = books[5].Id,
                Message         = "Tolkien e pe lista mea de ani de zile. Ofer Clean Code, o carte esențială!",
                Status          = SwapStatus.Accepted,
                CreatedAt       = DateTime.UtcNow.AddDays(-50),
                UpdatedAt       = DateTime.UtcNow.AddDays(-47),
            },
            // Ioana cere Atomic Habits de la Elena, oferă Cuibul de viespi — Pending
            new SwapRequestEntity
            {
                RequesterId     = users[6].Id,
                OwnerId         = users[2].Id,
                BookOfferedId   = books[21].Id,
                BookRequestedId = books[9].Id,
                Message         = "Am tot auzit de Atomic Habits. Ofer un mister de Agatha Christie!",
                Status          = SwapStatus.Pending,
                CreatedAt       = DateTime.UtcNow.AddDays(-8),
                UpdatedAt       = DateTime.UtcNow.AddDays(-8),
            },
            // Mihai cere 1984 de la Maria, oferă Fahrenheit 451 — Accepted
            new SwapRequestEntity
            {
                RequesterId     = users[7].Id,
                OwnerId         = users[0].Id,
                BookOfferedId   = books[33].Id,
                BookRequestedId = books[1].Id,
                Message         = "Ambele distopii clasice! Facem schimb?",
                Status          = SwapStatus.Accepted,
                CreatedAt       = DateTime.UtcNow.AddDays(-55),
                UpdatedAt       = DateTime.UtcNow.AddDays(-52),
            },
            // Laura cere Sapiens de la Andrei, oferă Puterea prezentului — Pending
            new SwapRequestEntity
            {
                RequesterId     = users[8].Id,
                OwnerId         = users[1].Id,
                BookOfferedId   = books[22].Id,
                BookRequestedId = books[4].Id,
                Message         = "Sapiens m-a fascinat dintotdeauna. Ofer Eckhart Tolle în schimb.",
                Status          = SwapStatus.Pending,
                CreatedAt       = DateTime.UtcNow.AddDays(-6),
                UpdatedAt       = DateTime.UtcNow.AddDays(-6),
            },
            // Radu cere Crimă și pedeapsă de la Maria, oferă Anna Karenina — Accepted
            new SwapRequestEntity
            {
                RequesterId     = users[9].Id,
                OwnerId         = users[0].Id,
                BookOfferedId   = books[28].Id,
                BookRequestedId = books[0].Id,
                Message         = "Doi giganți ai literaturii ruse! Ce zici de un schimb?",
                Status          = SwapStatus.Accepted,
                CreatedAt       = DateTime.UtcNow.AddDays(-60),
                UpdatedAt       = DateTime.UtcNow.AddDays(-57),
            },
            // Alina cere Harry Potter de la Ana, oferă Jocul foamei — Pending
            new SwapRequestEntity
            {
                RequesterId     = users[10].Id,
                OwnerId         = users[4].Id,
                BookOfferedId   = books[30].Id,
                BookRequestedId = books[14].Id,
                Message         = "Ambele serii sunt fantastice! Facem schimb?",
                Status          = SwapStatus.Pending,
                CreatedAt       = DateTime.UtcNow.AddDays(-5),
                UpdatedAt       = DateTime.UtcNow.AddDays(-5),
            },
            // Bogdan cere Gândire rapidă de la Ana, oferă Influența — Accepted
            new SwapRequestEntity
            {
                RequesterId     = users[11].Id,
                OwnerId         = users[4].Id,
                BookOfferedId   = books[37].Id,
                BookRequestedId = books[15].Id,
                Message         = "Kahneman și Cialdini — o combinație perfectă de psihologie!",
                Status          = SwapStatus.Accepted,
                CreatedAt       = DateTime.UtcNow.AddDays(-35),
                UpdatedAt       = DateTime.UtcNow.AddDays(-32),
            },
            // Diana cere Dune de la Andrei, oferă Portocala mecanică — Rejected
            new SwapRequestEntity
            {
                RequesterId     = users[12].Id,
                OwnerId         = users[1].Id,
                BookOfferedId   = books[40].Id,
                BookRequestedId = books[6].Id,
                Message         = "SF clasic contra SF clasic. Sună bine?",
                Status          = SwapStatus.Rejected,
                CreatedAt       = DateTime.UtcNow.AddDays(-25),
                UpdatedAt       = DateTime.UtcNow.AddDays(-23),
            },
            // Sorin cere Steve Jobs de la Vlad, oferă Tată bogat tată sărac — Pending
            new SwapRequestEntity
            {
                RequesterId     = users[13].Id,
                OwnerId         = users[3].Id,
                BookOfferedId   = books[42].Id,
                BookRequestedId = books[12].Id,
                Message         = "Amândouă sunt cărți despre oameni care au schimbat lumea!",
                Status          = SwapStatus.Pending,
                CreatedAt       = DateTime.UtcNow.AddDays(-4),
                UpdatedAt       = DateTime.UtcNow.AddDays(-4),
            },
            // Teodora cere Maestrul și Margareta de la Maria, oferă Numele trandafirului — Accepted
            new SwapRequestEntity
            {
                RequesterId     = users[14].Id,
                OwnerId         = users[0].Id,
                BookOfferedId   = books[43].Id,
                BookRequestedId = books[3].Id,
                Message         = "Bulgakov și Eco — doi maeștri ai literaturii universale!",
                Status          = SwapStatus.Accepted,
                CreatedAt       = DateTime.UtcNow.AddDays(-18),
                UpdatedAt       = DateTime.UtcNow.AddDays(-16),
            },
            // Cristian cere Alchimistul de la Ana, oferă Codul lui Da Vinci — Pending
            new SwapRequestEntity
            {
                RequesterId     = users[5].Id,
                OwnerId         = users[4].Id,
                BookOfferedId   = books[16].Id,
                BookRequestedId = books[16].Id,
                Message         = "Coelho și Brown — lecturi care îți schimbă perspectiva!",
                Status          = SwapStatus.Pending,
                CreatedAt       = DateTime.UtcNow.AddDays(-3),
                UpdatedAt       = DateTime.UtcNow.AddDays(-3),
            },
        };

        db.SwapRequests.AddRange(swaps);
        db.SaveChanges();

        // ─── REPORTS ──────────────────────────────────────────────────────────
        var reports = new List<ReportEntity>
        {
            new ReportEntity
            {
                Type             = "user",
                Reason           = "Userul nu a răspuns după acceptarea swap-ului de 2 săptămâni.",
                Status           = ReportStatus.Open,
                TargetId         = users[3].Id,
                TargetName       = users[3].Username,
                ReportedByUserId = users[2].Id,
                CreatedAt        = DateTime.UtcNow.AddDays(-5),
            },
            new ReportEntity
            {
                Type             = "book",
                Reason           = "Cartea este descrisă ca nouă dar în realitate este în stare proastă.",
                Status           = ReportStatus.Open,
                TargetId         = books[6].Id,
                TargetName       = books[6].Title,
                ReportedByUserId = users[7].Id,
                CreatedAt        = DateTime.UtcNow.AddDays(-8),
            },
            new ReportEntity
            {
                Type             = "user",
                Reason           = "Utilizatorul a anulat 3 schimburi consecutive fără explicații.",
                Status           = ReportStatus.Open,
                TargetId         = users[10].Id,
                TargetName       = users[10].Username,
                ReportedByUserId = users[5].Id,
                CreatedAt        = DateTime.UtcNow.AddDays(-12),
            },
            new ReportEntity
            {
                Type             = "book",
                Reason           = "Cartea listată nu există — titlul și autorul nu corespund.",
                Status           = ReportStatus.Open,
                TargetId         = books[40].Id,
                TargetName       = books[40].Title,
                ReportedByUserId = users[1].Id,
                CreatedAt        = DateTime.UtcNow.AddDays(-3),
            },
            new ReportEntity
            {
                Type             = "user",
                Reason           = "Comportament nepotrivit în mesajele de swap.",
                Status           = ReportStatus.Open,
                TargetId         = users[12].Id,
                TargetName       = users[12].Username,
                ReportedByUserId = users[9].Id,
                CreatedAt        = DateTime.UtcNow.AddDays(-1),
            },
        };

        db.Reports.AddRange(reports);
        db.SaveChanges();
    }
}