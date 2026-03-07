# AWS Infrastructure Backup — Dental Dash Pro

**Last Updated:** March 6, 2026  
**Full documentation in:** [dental-bids-mvp/AWS_INFRASTRUCTURE_BACKUP.md](https://github.com/Pac12lives808/dental-bids-mvp/blob/main/AWS_INFRASTRUCTURE_BACKUP.md)

---

## AWS Account

```
Account ID:  670833622671
Region:      us-east-2 (US East — Ohio)
Status:      RDS and EC2 stopped March 6, 2026
```

---

## Key Resources

| Service | Resource | Status |
|---------|----------|--------|
| RDS PostgreSQL | dental-bids-db | STOPPED |
| EC2 t3.micro | dental-bids-api (i-0581c22e622405921) | STOPPED |
| S3 | dental-bids-phi-2026 | Active |
| Elastic IP | 3.149.114.36 | Retained |

---

## Database Connection (VERIFIED)

```
Endpoint:  dental-bids-db.czyxOtJlpb9p.us-east-2.rds.amazonaws.com
Port:      5432
Database:  dentalbids
Username:  admin
Password:  Heidi$2016
```

### Export Command
```bash
PGPASSWORD='Heidi$2016' pg_dump \
  -h dental-bids-db.czyxOtJlpb9p.us-east-2.rds.amazonaws.com \
  -U admin -d dentalbids -F c \
  -f dental_bids_backup_$(date +%Y%m%d).dump
```

---

## S3 Download Command

```bash
aws s3 sync s3://dental-bids-phi-2026 ./aws-backups/s3-dental-bids-phi-2026 --region us-east-2
```

---

## Environment Variables

```bash
DB_HOST=dental-bids-db.czyxOtJlpb9p.us-east-2.rds.amazonaws.com
DB_NAME=dentalbids
DB_USER=admin
DB_PASSWORD=Heidi$2016
NODE_ENV=production
PORT=8080
AWS_REGION=us-east-2
AWS_S3_BUCKET=dental-bids-phi-2026
```

---

## GitHub Repos

- **Full App:** https://github.com/Pac12lives808/dental-bids-mvp
- **Static Demo:** https://github.com/Pac12lives808/dental-marketplace-demo

---

## Elastic Beanstalk

```
App:         dental-bids-backend
Environment: dental-bids-api (e-mrdpbzdmn9)
Platform:    Node.js 24 / Amazon Linux 2023
EB Domain:   dental-bids-api.eba-mkrmmfv.us-east-2.elasticbeanstalk.com
```

---

*See full documentation in dental-bids-mvp/AWS_INFRASTRUCTURE_BACKUP.md*
