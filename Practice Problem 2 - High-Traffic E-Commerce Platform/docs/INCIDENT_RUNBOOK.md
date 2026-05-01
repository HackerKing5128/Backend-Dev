# Incident Response Runbook

## Alerts Configuration
- **Latency Alert**: Triggered if p95 > 2 seconds for 2 minutes. (Sends Slack + SMS)
- **Error Rate Alert**: Triggered if 5xx errors > 1%. (Sends Slack)
- **Payment Gateway Down**: Circuit Breaker Opens. (Sends Slack)

## Scenarios

### 1. Payment Gateway Failure
- **Symptoms**: Circuit Breaker triggers, orders enter 'queued' state.
- **Action**: Monitor BullMQ worker queue. Verify the gateway status page. No manual intervention needed unless the queue exceeds Redis memory limits.

### 2. High Product Page Latency (>1s)
- **Symptoms**: Monitoring dashboard shows slow `/api/products` responses.
- **Action**: Check Redis cache hit rate. If < 80%, investigate cache eviction or connection issues. If Redis is down, restart the Redis add-on.

### 3. Database Overload
- **Symptoms**: MongoDB Atlas CPU > 90%.
- **Action**: Verify Connection Pooling is active. Temporarily increase Cache TTL from 60s to 300s to reduce DB queries until load subsides.
