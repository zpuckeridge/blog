# iOS Shortcuts — Location Status

Coarse activity status on the homepage is updated by geofence automations that POST to `/api/location`.

## Prerequisites

1. Set `LOCATION_WEBHOOK_SECRET` in production:
   ```bash
   wrangler secret put LOCATION_WEBHOOK_SECRET
   ```
2. For local testing with `wrangler dev`, add the same key to `.dev.vars`.
3. Zones are defined in `src/lib/location-status.ts` (`home`, `work` to start).

## Create automations (per zone)

In the **Shortcuts** app → **Automation** → **+** → **Personal Automation**:

### Arrive

- **Trigger:** When I arrive at [Home / Work]
- **Run immediately** — turn off “Ask Before Running”
- **Action:** Get Contents of URL
  - URL: `https://zacchary.me/api/location`
  - Method: `POST`
  - Headers:
    - `Authorization: Bearer <LOCATION_WEBHOOK_SECRET>`
    - `Content-Type: application/json`
  - Request Body: JSON
    ```json
    { "zone": "home", "event": "enter" }
    ```
    (Use `"work"` for the work geofence.)

### Leave

Same as above, but trigger **When I leave** and body:

```json
{ "zone": "home", "event": "leave" }
```

Repeat both automations for each zone in the registry.

## iOS settings

- **Location Services:** Always (or While Using + Background)
- **Shortcuts notifications:** allowed (automations can fail silently otherwise)
- Apple limits ~20 monitored regions — keep the zone count reasonable

## Commute inference

Only `home` and `work` use commute logic:

| Event | Condition  | Status                                               |
| ----- | ---------- | ---------------------------------------------------- |
| enter | any zone   | zone label (e.g. “At work”)                          |
| leave | work       | “Leaving work”                                       |
| leave | home       | work hours → “Heading to work”; else “Out and about” |
| leave | other zone | “Leaving {short name}”                               |

Work hours: Mon–Fri, 07:00–18:00 Australia/Brisbane (see `WORK_SCHEDULE` in code).

## Test with curl

```bash
curl -X POST https://zacchary.me/api/location \
  -H "Authorization: Bearer $LOCATION_WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"zone":"work","event":"enter"}'

curl https://zacchary.me/api/location
```

Public GET never returns coordinates. Status greys out after 6 hours without an update.
