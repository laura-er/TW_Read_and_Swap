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
                PasswordHash = BC.HashPassword("Maria123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-60),
            },
            new UserEntity
            {
                FirstName    = "Andrei",
                LastName     = "Popescu",
                Username     = "andrei_p",
                Email        = "andrei@bookswap.com",
                Phone        = "068234567",
                PasswordHash = BC.HashPassword("Andrei123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-45),
            },
            new UserEntity
            {
                FirstName    = "Elena",
                LastName     = "Rusu",
                Username     = "elena_r",
                Email        = "elena@bookswap.com",
                Phone        = "067345678",
                PasswordHash = BC.HashPassword("Elena123"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-30),
            },
            new UserEntity
            {
                FirstName    = "Vlad",
                LastName     = "Munteanu",
                Username     = "vlad_m",
                Email        = "vlad@bookswap.com",
                Phone        = "060456789",
                PasswordHash = BC.HashPassword("Vlad1234"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-20),
            },
            new UserEntity
            {
                FirstName    = "Ana",
                LastName     = "Popa",
                Username     = "ana_popa",
                Email        = "ana@bookswap.com",
                Phone        = "061567890",
                PasswordHash = BC.HashPassword("Ana12345"),
                Role         = UserRole.User,
                CreatedAt    = DateTime.UtcNow.AddDays(-10),
            },
        };

        db.Users.AddRange(users);
        db.SaveChanges();

        // ─── CĂRȚI ────────────────────────────────────────────────────────────
        var books = new List<BookEntity>
        {
            // Maria's books
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
                CreatedAt   = DateTime.UtcNow.AddDays(-55),
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
                CreatedAt   = DateTime.UtcNow.AddDays(-50),
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
                CreatedAt   = DateTime.UtcNow.AddDays(-48),
            },

            // Andrei's books
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
                CreatedAt   = DateTime.UtcNow.AddDays(-40),
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
                CreatedAt   = DateTime.UtcNow.AddDays(-38),
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
                CreatedAt   = DateTime.UtcNow.AddDays(-35),
            },

            // Elena's books
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
                CreatedAt   = DateTime.UtcNow.AddDays(-28),
            },
            new BookEntity
            {
                Title       = "Atomii obișnuiți: Cum să construiești obiceiuri bune",
                Author      = "James Clear",
                Genre       = "self-help",
                Condition   = "new",
                CoverUrl    = "https://covers.openlibrary.org/b/id/10404426-L.jpg",
                Description = "Ghid practic pentru formarea obiceiurilor bune și eliminarea celor rele.",
                IsAvailable = true,
                OwnerId     = users[2].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-25),
            },
            new BookEntity
            {
                Title       = "Sherlock Holmes: Câinele din Baskerville",
                Author      = "Arthur Conan Doyle",
                Genre       = "mystery",
                Condition   = "fair",
                CoverUrl    = "https://covers.openlibrary.org/b/id/8231856-L.jpg",
                Description = "Cel mai celebru caz al marelui detectiv Sherlock Holmes.",
                IsAvailable = true,
                OwnerId     = users[2].Id,
                CreatedAt   = DateTime.UtcNow.AddDays(-22),
            },

            // Vlad's books
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
                CreatedAt   = DateTime.UtcNow.AddDays(-18),
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
                CreatedAt   = DateTime.UtcNow.AddDays(-15),
            },

            // Ana's books
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
                CreatedAt   = DateTime.UtcNow.AddDays(-8),
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
                CreatedAt   = DateTime.UtcNow.AddDays(-5),
            },
        };

        db.Books.AddRange(books);
        db.SaveChanges();

        // ─── REVIEWS ──────────────────────────────────────────────────────────
        var reviews = new List<ReviewEntity>
        {
            new ReviewEntity { BookId = books[0].Id, UserId = users[1].Id, Rating = 5, Comment = "O capodoperă absolută! Dostoevsky explorează psihologia umană cu o profunzime incredibilă.", CreatedAt = DateTime.UtcNow.AddDays(-40) },
            new ReviewEntity { BookId = books[0].Id, UserId = users[2].Id, Rating = 4, Comment = "Foarte bun, dar destul de dens. Necesită răbdare.", CreatedAt = DateTime.UtcNow.AddDays(-35) },
            new ReviewEntity { BookId = books[1].Id, UserId = users[2].Id, Rating = 5, Comment = "Relevant și azi, poate chiar mai mult decât când a fost scris.", CreatedAt = DateTime.UtcNow.AddDays(-30) },
            new ReviewEntity { BookId = books[1].Id, UserId = users[3].Id, Rating = 5, Comment = "Orwell era profet. O lectură obligatorie pentru oricine.", CreatedAt = DateTime.UtcNow.AddDays(-25) },
            new ReviewEntity { BookId = books[3].Id, UserId = users[0].Id, Rating = 5, Comment = "Harari schimbă complet perspectiva asupra istoriei. Fascinant!", CreatedAt = DateTime.UtcNow.AddDays(-32) },
            new ReviewEntity { BookId = books[3].Id, UserId = users[4].Id, Rating = 4, Comment = "Foarte informativ, dar unele teorii sunt discutabile.", CreatedAt = DateTime.UtcNow.AddDays(-20) },
            new ReviewEntity { BookId = books[4].Id, UserId = users[0].Id, Rating = 5, Comment = "Tolkien a creat o lume completă. Nu am cuvinte!", CreatedAt = DateTime.UtcNow.AddDays(-28) },
            new ReviewEntity { BookId = books[5].Id, UserId = users[2].Id, Rating = 4, Comment = "Science fiction la cel mai înalt nivel. Worldbuilding impresionant.", CreatedAt = DateTime.UtcNow.AddDays(-22) },
            new ReviewEntity { BookId = books[6].Id, UserId = users[1].Id, Rating = 4, Comment = "Austen scrie cu ironie fină și personaje memorabile.", CreatedAt = DateTime.UtcNow.AddDays(-18) },
            new ReviewEntity { BookId = books[7].Id, UserId = users[3].Id, Rating = 5, Comment = "Mi-a schimbat modul de a privi obiceiurile zilnice. Recomand cu căldură!", CreatedAt = DateTime.UtcNow.AddDays(-15) },
            new ReviewEntity { BookId = books[8].Id, UserId = users[0].Id, Rating = 5, Comment = "Clasicul misterelor! Holmes rămâne neîntrecut.", CreatedAt = DateTime.UtcNow.AddDays(-12) },
            new ReviewEntity { BookId = books[11].Id, UserId = users[1].Id, Rating = 5, Comment = "Magie pură! M-am îndrăgostit de lumea creată de Rowling.", CreatedAt = DateTime.UtcNow.AddDays(-5) },
            new ReviewEntity { BookId = books[11].Id, UserId = users[2].Id, Rating = 5, Comment = "Nostalgie pură. O serie care definește o generație întreagă.", CreatedAt = DateTime.UtcNow.AddDays(-3) },
        };

        db.Reviews.AddRange(reviews);
        db.SaveChanges();

        // ─── FAVORITES ────────────────────────────────────────────────────────
        var favorites = new List<FavoriteEntity>
        {
            new FavoriteEntity { UserId = users[0].Id, BookId = books[4].Id,  CreatedAt = DateTime.UtcNow.AddDays(-30) },
            new FavoriteEntity { UserId = users[0].Id, BookId = books[5].Id,  CreatedAt = DateTime.UtcNow.AddDays(-28) },
            new FavoriteEntity { UserId = users[0].Id, BookId = books[11].Id, CreatedAt = DateTime.UtcNow.AddDays(-5)  },
            new FavoriteEntity { UserId = users[1].Id, BookId = books[0].Id,  CreatedAt = DateTime.UtcNow.AddDays(-40) },
            new FavoriteEntity { UserId = users[1].Id, BookId = books[7].Id,  CreatedAt = DateTime.UtcNow.AddDays(-12) },
            new FavoriteEntity { UserId = users[2].Id, BookId = books[1].Id,  CreatedAt = DateTime.UtcNow.AddDays(-25) },
            new FavoriteEntity { UserId = users[2].Id, BookId = books[3].Id,  CreatedAt = DateTime.UtcNow.AddDays(-20) },
            new FavoriteEntity { UserId = users[3].Id, BookId = books[11].Id, CreatedAt = DateTime.UtcNow.AddDays(-7)  },
            new FavoriteEntity { UserId = users[3].Id, BookId = books[6].Id,  CreatedAt = DateTime.UtcNow.AddDays(-15) },
            new FavoriteEntity { UserId = users[4].Id, BookId = books[4].Id,  CreatedAt = DateTime.UtcNow.AddDays(-6)  },
            new FavoriteEntity { UserId = users[4].Id, BookId = books[8].Id,  CreatedAt = DateTime.UtcNow.AddDays(-4)  },
        };

        db.Favorites.AddRange(favorites);
        db.SaveChanges();

        // ─── SWAP REQUESTS ────────────────────────────────────────────────────
        var swaps = new List<SwapRequestEntity>
        {
            // Andrei cere cartea Mariei (1984) și oferă Dune
            new SwapRequestEntity
            {
                RequesterId    = users[1].Id,
                OwnerId        = users[0].Id,
                BookOfferedId  = books[5].Id,
                BookRequestedId = books[1].Id,
                Message        = "Bună! Aș vrea să fac schimb — ofer Dune pentru 1984. Cred că o să-ți placă!",
                Status         = SwapStatus.Pending,
                CreatedAt      = DateTime.UtcNow.AddDays(-10),
                UpdatedAt      = DateTime.UtcNow.AddDays(-10),
            },
            // Elena cere cartea lui Andrei (Sapiens) și oferă Mândrie și prejudecată — acceptat
            new SwapRequestEntity
            {
                RequesterId    = users[2].Id,
                OwnerId        = users[1].Id,
                BookOfferedId  = books[6].Id,
                BookRequestedId = books[3].Id,
                Message        = "Salut! Sapiens e pe lista mea de mult. Ofer Mândrie și prejudecată în schimb.",
                Status         = SwapStatus.Accepted,
                CreatedAt      = DateTime.UtcNow.AddDays(-20),
                UpdatedAt      = DateTime.UtcNow.AddDays(-18),
            },
            // Vlad cere cartea Elenei (Sherlock Holmes) și oferă Jules Verne
            new SwapRequestEntity
            {
                RequesterId    = users[3].Id,
                OwnerId        = users[2].Id,
                BookOfferedId  = books[10].Id,
                BookRequestedId = books[8].Id,
                Message        = "Holmes e preferatul meu! Ofer Jules Verne — o aventură clasică.",
                Status         = SwapStatus.Pending,
                CreatedAt      = DateTime.UtcNow.AddDays(-5),
                UpdatedAt      = DateTime.UtcNow.AddDays(-5),
            },
            // Ana cere cartea lui Vlad (Steve Jobs) — respins
            new SwapRequestEntity
            {
                RequesterId    = users[4].Id,
                OwnerId        = users[3].Id,
                BookOfferedId  = books[12].Id,
                BookRequestedId = books[9].Id,
                Message        = "Biografia lui Jobs e fascinantă. Ofer Harry Potter în schimb!",
                Status         = SwapStatus.Rejected,
                CreatedAt      = DateTime.UtcNow.AddDays(-15),
                UpdatedAt      = DateTime.UtcNow.AddDays(-13),
            },
        };

        db.SwapRequests.AddRange(swaps);
        db.SaveChanges();

        // ─── REPORTS ──────────────────────────────────────────────────────────
        var reports = new List<ReportEntity>
        {
            new ReportEntity
            {
                Type              = "book",
                Reason            = "Descrierea cărții este incorectă și înșelătoare.",
                Status            = ReportStatus.Open,
                TargetId          = books[10].Id,
                TargetName        = books[10].Title,
                ReportedByUserId  = users[0].Id,
                CreatedAt         = DateTime.UtcNow.AddDays(-3),
            },
            new ReportEntity
            {
                Type              = "user",
                Reason            = "Userul nu a răspuns după acceptarea swap-ului.",
                Status            = ReportStatus.Open,
                TargetId          = users[3].Id,
                TargetName        = users[3].Username,
                ReportedByUserId  = users[2].Id,
                CreatedAt         = DateTime.UtcNow.AddDays(-1),
            },
        };

        db.Reports.AddRange(reports);
        db.SaveChanges();
    }
}