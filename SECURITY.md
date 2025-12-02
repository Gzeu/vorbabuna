# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within VorbaBună, please send an email to the maintainer. All security vulnerabilities will be promptly addressed.

Please include:

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

**Please do not open public issues for security vulnerabilities.**

## Security Measures

### Current Implementation

- ✅ Environment variables for sensitive data
- ✅ Input validation on API endpoints
- ✅ SQL injection prevention (Prisma ORM)
- ✅ CSRF protection (Next.js built-in)
- ✅ XSS prevention (React built-in)
- ✅ Rate limiting (planned)
- ✅ HTTPS only (Vercel enforced)

### Best Practices

1. **Database**: Never commit DATABASE_URL to git
2. **API Keys**: Store in environment variables
3. **User Input**: Always sanitize and validate
4. **Dependencies**: Regularly update with `npm audit`
5. **Production**: Use `npm ci` for consistent installs

## Updates

Security updates will be released as patch versions (1.0.x) and announced in:
- GitHub Releases
- Security Advisories
- README changelog
