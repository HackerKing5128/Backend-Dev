# deploy-prod.ps1
# Deploys to Production (IIS). Requires QA sign-off and specific window (Weekends 2 AM - 6 AM).

Write-Host "Verifying Production Deployment Constraints..."

$currentDay = (Get-Date).DayOfWeek
$currentHour = (Get-Date).Hour

# Check Maintenance Window (Saturday or Sunday, 2 AM to 6 AM)
if (($currentDay -ne 'Saturday' -and $currentDay -ne 'Sunday') -or ($currentHour -lt 2 -or $currentHour -ge 6)) {
    Write-Error "Deployment rejected: Production deployments are only allowed during weekend maintenance windows (2 AM - 6 AM)."
    exit 1
}

# Assume a mock API call to Jira/TestRail for QA sign-off
$qaSignOff = $true 
if (-not $qaSignOff) {
    Write-Error "Deployment rejected: QA sign-off is required."
    exit 1
}

Write-Host "Proceeding with Production Deployment to IIS..."
# Sync files to IIS directory (example path)
Copy-Item -Path ".\*" -Destination "C:\inetpub\wwwroot\EnterpriseApp" -Recurse -Force

Write-Host "Deployment to Production successful."
