# PRD: DeShawn's Dog Walking

## Overview
A full-stack web application for managing a dog walking service. Owners register dogs, walkers are assigned to the cities they cover, and individual dogs can be assigned to a walker.

**Tech stack:** .NET 8 Minimal API (in-memory data) + React (Vite, relative URLs via proxy)

---

## Data Models

**Walker**
| Field | Type | Notes |
|---|---|---|
| Id | int | auto-increment |
| Name | string | |
| Cities | List\<City\> | populated at query time, not stored |

**City**
| Field | Type | Notes |
|---|---|---|
| Id | int | auto-increment |
| Name | string | |

**Dog**
| Field | Type | Notes |
|---|---|---|
| Id | int | auto-increment |
| Name | string | |
| CityId | int | required |
| WalkerId | int? | nullable — dog may be unassigned |

**WalkerCity** (join entity for many-to-many)
| Field | Type | Notes |
|---|---|---|
| Id | int | auto-increment |
| WalkerId | int | |
| CityId | int | |

---

## Seed Data

```
Cities:     Nashville (1), Brentwood (2), Franklin (3)

Walkers:    Rosemary (1) → cities: Nashville, Brentwood
            Willam (2)   → cities: Nashville, Franklin
            Dion (3)     → cities: Brentwood, Franklin

WalkerCities: (1,1,1), (2,1,2), (3,2,1), (4,2,3), (5,3,2), (6,3,3)

Dogs:       Binx    (1) CityId=1  WalkerId=1
            Sadie   (2) CityId=2  WalkerId=null
            Clyde   (3) CityId=1  WalkerId=2
            River   (4) CityId=3  WalkerId=3
            Luna    (5) CityId=2  WalkerId=null
```

---

## API Endpoints

### Dogs

| Method | Route | Description |
|---|---|---|
| GET | /api/dogs | All dogs; include city name and walker name (if assigned) |
| GET | /api/dogs/{id} | Single dog; include full city and walker objects |
| POST | /api/dogs | Create a dog |
| DELETE | /api/dogs/{id} | Delete a dog |
| PUT | /api/dogs/{id} | Update dog (used to assign/unassign a walker) |

**POST /api/dogs body:**
```json
{ "name": "Buddy", "cityId": 2 }
```

**PUT /api/dogs/{id} body:**
```json
{ "id": 1, "name": "Binx", "cityId": 1, "walkerId": 3 }
```
*(Set `walkerId` to `null` to unassign)*

---

### Walkers

| Method | Route | Description |
|---|---|---|
| GET | /api/walkers | All walkers; optional `?city={cityId}` query string filter |
| GET | /api/walkers/{id} | Single walker; include Cities list and Dogs list |
| PUT | /api/walkers/{id} | Update walker; replaces their cities using the many-to-many pattern |
| DELETE | /api/walkers/{id} | Delete walker; unassign their dogs first, delete their WalkerCity rows first |

**GET /api/walkers?city=1** — returns only walkers who have a WalkerCity entry for cityId 1.

**PUT /api/walkers/{id} body:**
```json
{ "id": 1, "name": "Rosemary", "cities": [{ "id": 1 }, { "id": 3 }] }
```
Follow the WalkerCity update pattern from the curriculum exactly: remove all existing WalkerCity rows for this walker, then add new ones from the submitted list.

**DELETE /api/walkers/{id} — order of operations:**
1. Set `WalkerId = null` on all dogs assigned to this walker
2. Remove all WalkerCity rows for this walker
3. Remove the walker

---

### Cities

| Method | Route | Description |
|---|---|---|
| GET | /api/cities | All cities |
| POST | /api/cities | Create a city |

**POST /api/cities body:**
```json
{ "name": "Murfreesboro" }
```

---

## Frontend Views

| Route | View | Key behavior |
|---|---|---|
| `/` | Dog List | All dogs, city name, walker name (or "Unassigned"), Delete button |
| `/dogs/add` | Add Dog | Form: Name input, City dropdown; submits POST, redirects to `/` |
| `/dogs/:id` | Dog Detail | Dog name, city, walker (if any) |
| `/walkers` | Walker List | All walkers; City filter dropdown at top; link to each walker |
| `/walkers/:id` | Walker Detail | Walker name, city checkboxes (all cities), assigned dogs, Update button |
| `/cities` | City List | All cities listed; inline Add City form at bottom |

**Assign walker to a dog:** handled from the Walker Detail view — a dropdown of dogs in any of the walker's cities, with an Assign button. This is the user story the curriculum flags as having a hidden data change: assigning a dog to a walker should also update the dog's `CityId` if the dog's city isn't one of the walker's cities. *(Clarify with your instructor whether that constraint is required here.)*

---

## Book 2 Patterns to Follow

- **Minimal API only** — all endpoints in `Program.cs` using `app.MapGet`, `app.MapPost`, etc. No controllers.
- **In-memory data** — `List<Walker>`, `List<City>`, `List<Dog>`, `List<WalkerCity>` declared at the top of `Program.cs`.
- **Auto-increment IDs** — `list.Count > 0 ? list.Max(x => x.Id) + 1 : 1`
- **LINQ** — use `.Where()`, `.FirstOrDefault()`, `.Select()`, `.ToList()` for all queries.
- **Populate related data at query time** — walkers get their `Cities` list built from WalkerCity + Cities before returning; dogs get their `Walker` and `City` objects attached.
- **Query strings** — use `(int? city)` as a parameter on the walkers GET endpoint.
- **React + apiManager.js** — all fetch calls go in `apiManager.js`; components call those functions from `useEffect`.
- **Relative URLs** — all fetch calls use `/api/...` (no `localhost` in the URL); Vite proxy routes them to the backend.