# Cost Projection & Optimization (Budget: $50,000)

## Projection Breakdown (72 Hours Peak)

| Service | Configuration | Estimated Cost |
| :--- | :--- | :--- |
| **Heroku Web Dynos** | Performance-L (Auto-scaling 10-500) | ~$25,000 |
| **Heroku Worker Dynos**| Performance-M (Static 50) | ~$2,500 |
| **MongoDB Atlas** | M80 Cluster (Upgraded for 72h) | ~$4,000 |
| **Redis** | Premium 2 (High IO) | ~$500 |
| **CDN (Cloudflare)** | Enterprise Plan | ~$5,000 |
| **Third-Party APIs** | Payment Gateway, SMS Alerts | ~$8,000 |
| **Buffer/Contingency** | Unexpected spikes | ~$5,000 |
| **Total** | | **~$50,000** |

## Optimization Plan
1. **Aggressive Cache Headers**: Offload 90% of read traffic to Cloudflare to reduce Heroku Dyno requirements.
2. **Auto-Scale Down**: Dynos will scale down within 15 minutes of traffic dips (e.g., late night), saving cost dynamically.
3. **Connection Pooling**: Reusing database connections limits the need to constantly upgrade Atlas tiers just for connection limits.
