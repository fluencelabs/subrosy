## Aqua scenario
- `fluence aqua -i src/aqua/scheduled.aqua -o src/scheduled --air`
- `create_subnet`
```
aqua run --timeout 100000 -i src/aqua -f 'create_subnet("folex", "/Users/folex/Development/fluencelabs/subrosy/src/scheduled/scheduled.simple.air", ["12D3KooWHCJbJKGDfCgHSoCuK9q4STyRnVveqLoXAPBbXHTZx9Cv"])' --addr stage-01 --plugin src/plugins
```
```
4veRQ7bZQQ9byRdPrA9T1Wsm8WvH6a1SmPYqfT2ECvis
```

- deploy storage
- `register_storage`
    - `func register_storage(subnet: ResourceId, storage_id: string, host: PeerId)`
    - aqua run --timeout 100000 -i src/aqua -f 'register_storage("8QHLESWXC5UKheU9UJ9MthgTTxaUULnPAdw2VFrmnn7o", "505f4b4f-eb41-4b40-a668-e04ce4400203", "12D3KooWDcpWuyrMTDinqNgmXAuRdfd2mTdY9VoXZSAet2pDzh6r")' --addr stage-01 --plugin src/plugins

- deploy an example service
- `join_subnet`
    - func join_subnet(subnet: ResourceId, host: PeerId, service_id: string)
    - aqua run --timeout 100000 -i src/aqua -f 'join_subnet("8QHLESWXC5UKheU9UJ9MthgTTxaUULnPAdw2VFrmnn7o", "12D3KooWHCJbJKGDfCgHSoCuK9q4STyRnVveqLoXAPBbXHTZx9Cv", "0e803d39-fc49-4819-94e3-a898325b6617")' --addr stage-01 --plugin src/plugins
- `get_health`
    - `get_health(subnet: ResourceId)`
    - aqua run --timeout 100000 -i src/aqua -f 'get_health("8QHLESWXC5UKheU9UJ9MthgTTxaUULnPAdw2VFrmnn7o")' --addr stage-01 --plugin src/plugins

## Healthcheck scenario
- query `ok`
- call `set_ok(false)` and see services red
- remove some services and see them red?
- query service metrics and deduce status based on them


## Debug
### list_records
- list_records(subnet: ResourceId)
- aqua run --timeout 100000 -i src/aqua -f 'list_records("8QHLESWXC5UKheU9UJ9MthgTTxaUULnPAdw2VFrmnn7o")' --addr stage-01 --plugin src/plugins

### enable_healthcheck
- enable_healthcheck(subnet: string, host: PeerId) -> []string, [][]Error:
- aqua run --timeout 100000 -i src/aqua -f 'enable_healthcheck("8QHLESWXC5UKheU9UJ9MthgTTxaUULnPAdw2VFrmnn7o", "12D3KooWHCJbJKGDfCgHSoCuK9q4STyRnVveqLoXAPBbXHTZx9Cv")' --addr stage-01 --plugin src/plugins

### create_healthcheck
- create_healthcheck(subnet: ResourceId, air_path: string, ipfs_host: PeerId)
- aqua run --timeout 100000 -i src/aqua -f 'create_healthcheck("8QHLESWXC5UKheU9UJ9MthgTTxaUULnPAdw2VFrmnn7o", "/Users/folex/Development/fluencelabs/subrosy/src/scheduled/scheduled.simple.air", "12D3KooWHCJbJKGDfCgHSoCuK9q4STyRnVveqLoXAPBbXHTZx9Cv")' --addr stage-01 --plugin src/plugins
