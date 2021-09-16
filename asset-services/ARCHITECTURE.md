# Nautilus Asset Services - Architecture

(See also the [Technical Architecture] wiki page.)

[technical architecture]: https://github.com/registreerocks/nautilus-wallet/wiki/Technical-Architecture

## Crate structure

### Binary crates

These processes coordinate using a Celery task queue:

- `asset-services-api` - Web API endpoint: Processes asset service requests using Celery tasks.
- `asset-services-worker` - Worker process, providing pooled execution of Celery tasks.

### Library crates

- `asset-services-celery` - Celery app and task definitions, shared by the binary crates.
