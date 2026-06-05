# 📚 BookSwap — Platformă de Schimb de Cărți

> O aplicație web modernă care conectează cititorii și le permite să schimbe cărți între ei, să lase recenzii și să-și gestioneze biblioteca personală.

---

## 👥 Echipa

| Nume | GitHub |
|------|--------|
| Erhan Laura | [@laura-er](https://github.com/laura-er) |
| Popa Patricia | [@patricia](https://github.com/laura-er) |
| Istrati Adelina | [@adelina-ist](https://github.com/adelina-ist) |

---

## 🚀 Tehnologii

### Backend
- **ASP.NET Core 8** — Web API
- **Entity Framework Core** — ORM, Code First, Migrations
- **PostgreSQL** — Baza de date
- **JWT (JSON Web Tokens)** — Autentificare și autorizare
- **BCrypt** — Hashing parole

### Frontend
- **React 18** + **TypeScript**
- **Vite** — Build tool
- **Tailwind CSS** — Stilizare
- **i18n** — Suport multilingv (RO/EN)

---

## 🏗️ Arhitectura proiectului

Proiectul urmează o arhitectură pe **4 straturi** (Clean Architecture):

```
TW_Read_and_Swap/
│
├── backend/
│   ├── BookSwap.Api/                    # 🌐 Presentation Layer
│   │   ├── Controllers/
│   │   │   ├── BookController.cs
│   │   │   ├── UserController.cs
│   │   │   ├── SwapController.cs
│   │   │   ├── ReviewController.cs
│   │   │   ├── FavoriteController.cs
│   │   │   ├── ReportController.cs
│   │   │   ├── AdminActivityController.cs
│   │   │   └── HealthController.cs
│   │   └── Program.cs
│   │
│   ├── BookSwap.BusinessLayer/          # ⚙️ Business Logic Layer
│   │   ├── Core/                        # XxxLogic — logica de business
│   │   ├── Interfaces/                  # IXxxLogic — contracte
│   │   ├── Structure/                   # XxxActions — operații, TokenService
│   │   └── BusinessLogic.cs            # Agregator central
│   │
│   ├── BookSwap.DataAccessLayer/        # 🗄️ Data Access Layer
│   │   ├── Context/
│   │   │   └── BookSwapDbContext.cs    # DbContext + Fluent API
│   │   ├── Migrations/                  # EF Core Migrations
│   │   └── DbInitializer.cs            # Date seed
│   │
│   └── BookSwap.Domain/                 # 📦 Domain Layer
│       ├── Entities/                    # POCO — UserEntity, BookEntity etc.
│       └── Models/                      # DTO-uri per entitate
│
└── frontend/
    └── src/
        ├── pages/
        │   ├── admin/                   # Dashboard, Reports, Books/Users
        │   ├── auth/                    # SignIn, SignUp, ForgotPassword
        │   └── client/                  # Home, Catalog, BookDetail, Profile, Swap...
        ├── components/                  # Componente reutilizabile
        ├── api/                         # Servicii API
        ├── hooks/                       # Custom hooks
        ├── context/                     # Auth context, Language context
        └── i18n/                        # Traduceri RO/EN
```

---

## 🗃️ Entități principale

| Entitate | Descriere |
|----------|-----------|
| `UserEntity` | Utilizatori cu roluri (User, Admin) |
| `BookEntity` | Cărțile listate pentru schimb |
| `SwapRequestEntity` | Cereri de schimb între utilizatori |
| `ReviewEntity` | Recenzii pentru cărți |
| `FavoriteEntity` | Cărți favorite per utilizator |
| `ReportEntity` | Rapoarte trimise de utilizatori |

---

## 🔐 Autentificare și roluri

Aplicația folosește **JWT Bearer Authentication** cu 3 niveluri de acces:

| Nivel | Acces |
|-------|-------|
| **Anonim** | Vizualizare cărți, profil public |
| **User** | Adăugare cărți, schimburi, recenzii, favorite |
| **Admin** | Gestionare utilizatori, rapoarte, toate schimburile |

---

## ⚙️ Pași de rulare

### Cerințe
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

---

### 🔧 Backend

**1. Configurează conexiunea la baza de date**

În fișierul `backend/BookSwap.Api/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=bookswap;Username=postgres;Password=parola_ta"
  }
}
```

**2. Aplică migrațiile**
```bash
cd backend/BookSwap.DataAccessLayer
dotnet ef database update --startup-project ../BookSwap.Api
```

**3. Pornește backend-ul**
```bash
cd backend/BookSwap.Api
dotnet run
```

- API: `http://localhost:5088`
- Swagger UI: `http://localhost:5088/swagger`

---

### 🎨 Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:5173`

---

## 👤 Cont admin implicit

| Câmp | Valoare |
|------|---------|
| Username | `admin` |
| Parolă | `Admin123` |

> Contul admin se creează automat la primul start al aplicației dacă nu există.

---

## 📄 Pagini aplicație (19 pagini)

### Public
- 🏠 Home — pagina principală cu cărți recente
- 📚 Book Catalog — catalogul complet cu filtrare și sortare
- 📖 Book Detail — detalii carte + recenzii
- 👤 Public Profile — profilul public al unui utilizator

### Autentificat
- 🔐 Sign In / Sign Up / Forgot Password
- 👤 Profile — profilul propriu
- ✏️ Edit Profile — editare date personale
- ➕ Add Book — adăugare carte nouă
- 🔄 Request Swap — cerere de schimb
- 📋 Swap Requests — lista cererilor de schimb
- ✅ Swap Success — confirmare schimb
- ❤️ Favorites — cărțile favorite
- 🔗 Share Profile — partajare profil

### Admin
- 📊 Admin Dashboard — statistici și activitate recentă
- 👥 Admin Books & Users — gestionare utilizatori și cărți
- 🚨 Admin Reports — gestionare rapoarte

---

## 🔗 Link-uri utile

- **Repository:** [github.com/laura-er/TW_Read_and_Swap](https://github.com/laura-er/TW_Read_and_Swap)
- **Swagger API Docs:** `http://localhost:5088/swagger` (după pornire)
