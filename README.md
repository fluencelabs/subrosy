<p>
<img align="right" width=300 src="https://user-images.githubusercontent.com/1949356/199219723-1ff7067b-538a-4838-b419-9a972bd5b7a3.png" alt="Stable Diffusion: small rose flower deep under water in solitude under surface with light shining through the water and shadows visible">
# subrosy

'rosy' means healthy and enthusiastic

'sub' comes from subnet

<br clear="left"/>
</p>


## How to use
- Deploy your service via `fluence` CLI or any other means
- Choose subrosy-enabled subnet (ask around)
- Call `join_subnet` with your service location and ResourceId of the subnet

Here's an example Aqua if you've deployed service "example" via `fluence` CLI:
```
services <- App.services()
for srv <- services.example.default:
    status, scripts, errs_join <- join_subnet(resource_id, srv.peerId, srv.serviceId)
```

Then go to our frontend https://fluence.one/subrosy/ and find that subnet, you will see your service there.

Or you can call `get_health` in Aqua and gather health statuses there:
```
get_health(resource_id)
```
