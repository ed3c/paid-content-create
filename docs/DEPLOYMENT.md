# Deployment

## Requirements

- Bun 1.3.3 or later
- no runtime database
- no environment secrets required

## Development

```bash
bun run test
bun run dev
```

Default address:

```text
http://localhost:3000
```

## Production

```bash
bun run build
HOST=0.0.0.0 PORT=3000 NODE_ENV=production bun src/server.ts
```

The production server serves `dist/` and exposes:

- `GET /health`
- `GET /api/catalog`

## Container example

A minimal container can use:

```dockerfile
FROM oven/bun:1.3.3-alpine AS build
WORKDIR /app
COPY . .
RUN bun run test && bun run build

FROM oven/bun:1.3.3-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/src ./src
COPY --from=build /app/scripts ./scripts
COPY --from=build /app/dist ./dist
USER bun
EXPOSE 3000
CMD ["bun", "src/server.ts"]
```

The repository does not include a container by default to keep the MVP small.

## Static hosting

The UI can be hosted statically after:

```bash
bun run build
```

Publish the `dist/` directory.

Static hosting will not expose `/health` or `/api/catalog`; the UI still works because its catalog is bundled into `client.js`.

## Security requirements

- HTTPS at the edge
- no injected third-party analytics without a privacy review
- do not relax CSP to `unsafe-eval`
- no user credential forms
- no reverse proxy that logs sensitive query parameters
- keep the Bun image/runtime patched

## Smoke test

```bash
NODE_ENV=production PORT=3000 bun src/server.ts &
PID=$!

curl --fail http://127.0.0.1:3000/health
curl --fail http://127.0.0.1:3000/api/catalog

kill "$PID"
```

## Failure modes

### Build succeeds, page is blank

Check:

- `/assets/client.js` exists
- CSP is not modified by the hosting provider
- base path remains `/`
- browser console has no MIME error

### API returns catalog but UI is stale

The UI catalog is bundled at build time. Rebuild and redeploy after source/platform changes.

### Official links stop working

Update `src/data/sources.ts` and `src/data/platforms.ts`, add evidence to the pull request, then run tests/build again.
