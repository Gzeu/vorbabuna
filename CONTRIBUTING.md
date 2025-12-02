# Contributing to Vorbă Bună

Mulțumim că vrei să contribui la Vorbă Bună! 🎉

## Cum Poți Contribui

### 1. Raportare Bugs

Dacă găsești un bug, te rugăm:
- Verifică dacă nu a fost deja raportat în Issues
- Deschide un Issue nou cu descriere detaliată
- Include pași de reproducere
- Adăugă screenshot-uri dacă este relevant

### 2. Propuneri de Features

Pentru feature-uri noi:
- Deschide un Issue cu label "enhancement"
- Descrie use case-ul și beneficiile
- Așteaptă feedback de la maintainers

### 3. Contribuții de Cod

#### Setup Development

```bash
git clone https://github.com/Gzeu/vorbabuna.git
cd vorbabuna
pnpm install
cp .env.example .env.local
# Configure .env.local
pnpm dev
```

#### Process

1. Fork repository-ul
2. Crează branch nou: `git checkout -b feature/nume-feature`
3. Scrie cod clean și testat
4. Commit semantic: `git commit -m 'feat: adaugă feature X'`
5. Push: `git push origin feature/nume-feature`
6. Deschide Pull Request

#### Commit Messages

Folosește [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - feature nou
- `fix:` - bug fix
- `docs:` - schimbări documentație
- `style:` - formatare, missing semicolons, etc.
- `refactor:` - refactoring cod
- `test:` - adăugare teste
- `chore:` - maintenance tasks

### 4. Adăugare Proverbe

Pentru a contribui cu proverbe noi:

1. Adaugă-le în `prisma/seed.ts`
2. Include sursa (dacă e posibil)
3. Categorizează corect
4. Asigură-te că sunt autentice românești

### 5. Code Style

- Folosește TypeScript strict
- Respectă ESLint rules
- Folosește Prettier pentru formatare
- Scrie componente funcționale cu hooks
- Adaugă comentarii pentru logica complexă

### 6. Testing

- Scrie teste pentru feature-uri noi
- Asigură-te că toate testele trec
- Vizează coverage > 80%

## Code Review Process

1. Maintainer-ul va revizui PR-ul
2. Feedback și request changes dacă e necesar
3. După aprobare, PR-ul va fi merged

## Comunitate

- Fi respectuos și constructiv
- Acceptă feedback cu gratitudine
- Ajută alți contributori

Mulțumim pentru contribuție! 🙏
