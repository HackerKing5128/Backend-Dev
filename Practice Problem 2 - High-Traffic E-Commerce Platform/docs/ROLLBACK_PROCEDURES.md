# Rollback Procedures

If the new Black Friday application release causes critical issues that cannot be mitigated by scaling or feature flags:

## 1. Application Rollback (Heroku)
1. Use Heroku Dashboard or CLI:
   `heroku rollback -a peak-ecommerce-app`
2. This will revert the slug to the previous stable release instantly.

## 2. Database Rollback (MongoDB Atlas)
If a critical schema migration was deployed that corrupted data:
1. Use **Atlas Continuous Cloud Backups**.
2. Perform a Point-In-Time Restore to the exact minute before the faulty release was deployed.
3. *Note: This will result in data loss for orders placed between the deployment and the rollback. Use this as a last resort.*

## 3. CDN Rollback (Cloudflare)
If a faulty frontend asset was cached:
1. Purge the entire Cloudflare cache via the dashboard.
2. The next requests will pull the reverted assets from the Heroku origin.
