# Scaling Strategy for Peak Season

## 1. Auto-Scaling Policies (Heroku)
- **Trigger Metric**: Request latency and queue depth.
- **Rule**: If p95 latency > 200ms OR queue > 100 requests, auto-scale Web Dynos.
- **Scale Range**: Minimum 10 dynos, Maximum 500 dynos.
- **Scale Down**: Automatically reduce dynos if CPU < 20% and latency < 100ms for 15 minutes.

## 2. Database Scaling (MongoDB Atlas)
- Pre-scale the MongoDB Atlas cluster from M60 to M80 24 hours prior to Black Friday.
- Enable Atlas Auto-scaling for storage.
- Implemented Connection Pooling (100 connections per dyno in production).

## 3. Caching & CDN (Redis + Cloudflare)
- **CDN (Cloudflare)**: Configured to cache 100% of static assets (images, CSS, JS). Cache hit rate target: >90%.
- **Redis**: Caches product catalogs and search queries. Configured with an eviction policy of `allkeys-lru` and 60-second TTLs to maintain freshness while absorbing load. Cache hit rate target: >80%.

## 4. Message Queuing & Circuit Breakers (BullMQ + Opossum)
- Order checkouts are protected by the `opossum` Circuit Breaker.
- If the external payment gateway fails or times out, the circuit opens.
- Fallback pushes orders to a `BullMQ` Redis queue to be processed asynchronously by Worker Dynos once the gateway recovers.
