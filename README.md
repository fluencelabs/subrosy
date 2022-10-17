## Aqua scenario
- `fluence aqua -i src/aqua/scheduled.aqua -o src/scheduled --air`
- `create_subnet`
```
aqua run --timeout 100000 -i src/aqua -f 'create_subnet("folex", "/Users/folex/Development/fluencelabs/subrosy/src/scheduled/scheduled.simple.air", ["12D3KooWHCJbJKGDfCgHSoCuK9q4STyRnVveqLoXAPBbXHTZx9Cv"])' --addr stage-01 --plugin src/plugins
```

- deploy storage
- `register_storage`
- deploy an example service
- `join_subnet`
- `get_health`

## Healthcheck scenario
- query `ok`
- call `set_ok(false)` and see services red
- remove some services and see them red?
- query service metrics and deduce status based on them
