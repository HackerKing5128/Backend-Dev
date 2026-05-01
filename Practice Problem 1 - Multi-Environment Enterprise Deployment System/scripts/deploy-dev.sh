#!/bin/bash
# deploy-dev.sh
# Deploys code freely to the Development environment (Heroku)

echo "Starting deployment to Development Environment..."

# Push current branch to Heroku dev remote
git push origin HEAD:dev-branch
heroku container:push web -a dev-enterprise-app
heroku container:release web -a dev-enterprise-app

echo "Deployment to Development completed successfully."
# Note: Dev deployments do not require approval
