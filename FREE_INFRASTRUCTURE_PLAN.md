# Free Infrastructure Migration Plan — Dental Dash Pro

**Created:** March 6, 2026  
**Full guide in:** [dental-bids-mvp/FREE_INFRASTRUCTURE_PLAN.md](https://github.com/Pac12lives808/dental-bids-mvp/blob/main/FREE_INFRASTRUCTURE_PLAN.md)

---

## Goal: $0/month Infrastructure

| Component | AWS Cost | Free Alternative |
|-----------|----------|------------------|
| PostgreSQL DB | $135.65/mo | Neon.tech (free) |
| Node.js API | $1.48/mo | Railway.app (free) |
| File Storage | $0.02/mo | Cloudinary (free) |
| Static Demo | $0 | Netlify (free) |
| **TOTAL** | **$153.39/mo** | **$0/mo** |

---

## Quick Start (2 Hours to Live)

### 1. Database — Neon (https://neon.tech)
```bash
# Sign up, create project, then restore:
pg_restore \
  --no-privileges --no-owner \
  -d "postgresql://user:pass@ep-xxx.neon.tech/dentalbids" \
  aws-backups/dental_bids_backup_YYYYMMDD.dump
```

### 2. API — Railway (https://railway.app)
```
1. New Project > Deploy from GitHub
2. Repo: Pac12lives808/dental-bids-mvp
3. Set env vars (see AWS_INFRASTRUCTURE_BACKUP.md)
4. Deploy
```

### 3. Static Demo — Netlify (https://netlify.com)
```
1. New site > Import from Git
2. Repo: Pac12lives808/dental-marketplace-demo
3. Deploy (no build command needed)
```

### 4. Files — Cloudinary (https://cloudinary.com)
```
1. Sign up free
2. Upload files from: aws-backups/s3-dental-bids-phi-2026/
3. Update S3 references in app code
```

---

## Environment Variables for New Platform

```bash
# Update these after Neon setup:
DB_HOST=[your-neon-endpoint]
DB_NAME=dentalbids
DB_USER=[neon-user]
DB_PASSWORD=[neon-password]
NODE_ENV=production
PORT=8080
STRIPE_SECRET_KEY=[from original codebase]
JWT_SECRET=[from original codebase]
```

---

*See full migration guide in dental-bids-mvp repo*
