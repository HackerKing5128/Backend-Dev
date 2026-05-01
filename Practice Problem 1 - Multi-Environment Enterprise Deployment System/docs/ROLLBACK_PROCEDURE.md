# Rollback Procedure

**Requirement**: Must be able to rollback to previous version within 5 minutes.

## Heroku (Development & Staging)
Heroku maintains previous releases automatically. To rollback:
1. Identify the previous stable release using `heroku releases -a <app-name>`.
2. Rollback using `heroku rollback <release-id> -a <app-name>`.
*Estimated Time: < 1 minute.*

## IIS (Production)
For IIS, our deployment scripts take advantage of blue/green or direct folder swaps.
1. Our deployment process retains the previous build directory (e.g., `C:\inetpub\wwwroot\EnterpriseApp_backup`).
2. Run `scripts/rollback-prod.ps1` which performs a quick folder swap and recycles the IIS app pool.
*Estimated Time: < 2 minutes.*

## Database (MongoDB Atlas)
If a database schema change needs to be rolled back:
1. Use Atlas Point-in-Time Recovery to restore the database to the exact minute before the deployment.
*Estimated Time: ~3-5 minutes depending on data size.*
