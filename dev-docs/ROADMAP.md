<!-- Last updated: 2026-05-18 -->
<!-- Last change: Initial roadmap creation -->

# DeShawn's Dog Walking - Implementation Roadmap

Generated from: PRD.md

## Steps

- [ ] **Step 1: Data Models and Seed Data**
  Define the four C# model classes (Walker, City, Dog, WalkerCity) and declare the in-memory lists with seed data at the top of Program.cs. This is the foundation everything else reads from.

  **Acceptance Criteria:**
  - **Given** the app starts, **When** the in-memory lists are initialized, **Then** all seed data matches the PRD exactly: 3 cities, 3 walkers, 6 WalkerCity rows, and 5 dogs with the correct city and walker assignments.

- [ ] **Step 2: Dogs API Endpoints**
  Implement all five dog endpoints in Program.cs: GET all (with city name and walker name), GET by id (with full city and walker objects), POST, DELETE, and PUT (used for walker assignment).

  **Acceptance Criteria:**
  - **Given** the app is running, **When** GET /api/dogs is called, **Then** each dog includes its city name and walker name (or null if unassigned).
  - **Given** a dog exists, **When** GET /api/dogs/{id} is called, **Then** the response includes full City and Walker objects (not just IDs).
  - **Given** a valid body, **When** POST /api/dogs is called, **Then** a new dog is created with an auto-incremented ID and no walker assigned.
  - **Given** a dog exists, **When** DELETE /api/dogs/{id} is called, **Then** the dog is removed from the list.
  - **Given** a dog exists, **When** PUT /api/dogs/{id} is called with a walkerId, **Then** the dog's WalkerId is updated; sending null unassigns the walker.

- [ ] **Step 3: Walkers API Endpoints**
  Implement all four walker endpoints: GET all (with optional city filter), GET by id (with Cities list and Dogs list), PUT (replace cities via WalkerCity pattern), and DELETE (unassign dogs, remove WalkerCity rows, then remove walker).

  **Acceptance Criteria:**
  - **Given** the app is running, **When** GET /api/walkers is called without a query string, **Then** all walkers are returned each with their Cities list populated.
  - **Given** walkers exist, **When** GET /api/walkers?city=1 is called, **Then** only walkers with a WalkerCity entry for cityId 1 are returned.
  - **Given** a walker exists, **When** GET /api/walkers/{id} is called, **Then** the response includes the walker's Cities list and their assigned Dogs list.
  - **Given** a walker exists, **When** PUT /api/walkers/{id} is called with a new cities list, **Then** all old WalkerCity rows for that walker are removed and new ones are added from the submitted list.
  - **Given** a walker exists with assigned dogs and WalkerCity rows, **When** DELETE /api/walkers/{id} is called, **Then** their dogs are unassigned, their WalkerCity rows are removed, and the walker is removed, in that order.

- [ ] **Step 4: Cities API Endpoints**
  Implement both city endpoints: GET all and POST (create a city).

  **Acceptance Criteria:**
  - **Given** the app is running, **When** GET /api/cities is called, **Then** all cities are returned.
  - **Given** a valid body, **When** POST /api/cities is called, **Then** a new city is created with an auto-incremented ID.

- [ ] **Step 5: Dog List View**
  Build the Dog List component at `/`. Fetches all dogs from GET /api/dogs and displays each dog's name, city, and walker name (or "Unassigned"). Includes a Delete button per dog.

  **Acceptance Criteria:**
  - **Given** the app loads, **When** the user visits `/`, **Then** all dogs are listed with city name and walker name (or "Unassigned").
  - **Given** a dog is displayed, **When** the user clicks Delete, **Then** the dog is removed via DELETE /api/dogs/{id} and the list refreshes.

- [ ] **Step 6: Add Dog View**
  Build the Add Dog form at `/dogs/add`. Includes a name text input and a city dropdown populated from GET /api/cities. Submits via POST /api/dogs and redirects to `/` on success.

  **Acceptance Criteria:**
  - **Given** the user visits `/dogs/add`, **When** the form loads, **Then** the city dropdown is populated with all cities from the API.
  - **Given** the form is filled out, **When** the user submits, **Then** a POST request is sent and the user is redirected to `/`.

- [ ] **Step 7: Dog Detail View**
  Build the Dog Detail view at `/dogs/:id`. Fetches a single dog via GET /api/dogs/{id} and displays the dog's name, city, and walker (if assigned).

  **Acceptance Criteria:**
  - **Given** a dog exists, **When** the user visits `/dogs/:id`, **Then** the dog's name, city name, and walker name (or nothing if unassigned) are displayed.

- [ ] **Step 8: Walker List View**
  Build the Walker List view at `/walkers`. Displays all walkers with a city filter dropdown at the top. Clicking a walker links to their detail page.

  **Acceptance Criteria:**
  - **Given** the user visits `/walkers`, **When** the page loads, **Then** all walkers are listed with links to their detail pages.
  - **Given** the city dropdown is shown, **When** the user selects a city, **Then** only walkers who cover that city are displayed.

- [ ] **Step 9: Walker Detail View**
  Build the Walker Detail view at `/walkers/:id`. Shows the walker's name, city checkboxes (all cities, checked for their current cities), their assigned dogs, and an Update button. Includes a dropdown of dogs in the walker's cities with an Assign button.

  **Acceptance Criteria:**
  - **Given** the user visits `/walkers/:id`, **When** the page loads, **Then** the walker's name is shown, all cities are listed as checkboxes with their current cities pre-checked, and their assigned dogs are listed.
  - **Given** the user changes city checkboxes and clicks Update, **When** the PUT request is sent, **Then** the walker's WalkerCity rows are replaced with the new selection.
  - **Given** dogs exist in the walker's cities, **When** the user selects one from the dropdown and clicks Assign, **Then** the dog's WalkerId is updated via PUT /api/dogs/{id}.

- [ ] **Step 10: Cities View**
  Build the Cities view at `/cities`. Lists all cities and includes an inline form at the bottom to add a new city via POST /api/cities.

  **Acceptance Criteria:**
  - **Given** the user visits `/cities`, **When** the page loads, **Then** all cities are listed.
  - **Given** the user types a city name and submits the inline form, **When** the POST request completes, **Then** the new city appears in the list.