# Monitoring & Metrics Dashboard

## Custom Metrics
The application exposes metrics at `/api/metrics`:
- `requestsPerMinute`: Current load (Target: 10,000 for prod).
- `p95ResponseTimeMs`: 95th percentile latency (Target: < 200ms).
- `activeConnections`: DB connection pool usage.
- `memoryUsageMB`: Heap utilization.

## Dashboard Setup
1. **Prometheus**: Scrapes the `/api/metrics` endpoint every 15 seconds.
2. **Grafana**: Visualizes the Prometheus data.
   - Red alerts are configured for p95 latency > 200ms.
   - Alerts trigger webhook to PagerDuty/Slack for immediate incident response.
