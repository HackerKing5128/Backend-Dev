# Incident Response Plan

## Automated Alerting
- If the `/api/health` endpoint returns non-200 or times out for 3 consecutive checks (checked every 5 mins).
- If the 95th percentile response time exceeds 200ms for more than 5 minutes.

## Response Steps
1. **Acknowledge**: On-call engineer acknowledges the automated alert (e.g., via PagerDuty).
2. **Investigate**: 
   - Check the `/api/health` endpoint payload to determine if it's an application or database failure.
   - Review the application logs. Dev/Staging use console logs, Production uses `logs/error.log` and CloudWatch.
3. **Mitigate**:
   - If a recent deployment caused the issue, immediately execute the Rollback Procedure.
   - If database is unreachable, check MongoDB Atlas cluster status.
4. **Post-Mortem**: Document the root cause and implement preventative measures in the next sprint.
