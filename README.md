# ArtifactDepotApp

This is a full-stack web application designed to assist staff working in archaeological excavations in managing artifacts extracted from excavation sites.It allows authorized personnel to track artifacts, check their storage status and view their locations on an interactive map.

## Project Structure
### Admin Panel
Provides secure access for authorized staff to efficiently manage artifacts, excavation sites, and reporting features.

### Artifact Listing
Displays a comprehensive list of artifacts, allowing users to filter items by properties such as name, material, category, dimensions (width and height), and coordinates (latitude and longitude) for easier search and management.

### Map View
An interactive map powered by Leaflet.js enables users to explore artifact locations based on excavation coordinates. With a single click, users can filter and visualize artifacts by material type (e.g., stone, ceramic) or category, helping staff quickly analyze the spatial distribution of selected items.

### Storage Tracking
Each artifact can be traced back to its storage information, including its storage depot, shelf location, preservation condition, and name. Additionally, users can view the exact depot location of an artifact directly on the map by clicking the 'Show on Map' button, enabling fast and user-friendly access.



### Tech Stack & Architecture
-	Frontend: Angular
-	Backend: ASP.NET Core 8.0 Web API (N-Tier Architecture)
-	Database: MSSQL Server
-	Caching: Redis
-	Authentication: JWT Token (Implemented in .NET)
-	Map Visualization: Leaflet.js
-	Design Patterns: Generic Repository



### Artifact List
![Artifact List](https://github.com/ozgeuygun/ArtifactDepotApp/blob/main/images/Picture1.png)

### Artifact Map View
![Artifact Map](https://github.com/ozgeuygun/ArtifactDepotApp/blob/main/images/Picture2.png)
![Artifact Map](https://github.com/ozgeuygun/ArtifactDepotApp/blob/main/images/Picture3.png)
![Artifact Map](https://github.com/ozgeuygun/ArtifactDepotApp/blob/main/images/Picture4.png)

### Admin-Storage Management
![Artifact Storage](https://github.com/ozgeuygun/ArtifactDepotApp/blob/main/images/Picture6.png)

### Admin-Category Management
![Category](https://github.com/ozgeuygun/ArtifactDepotApp/blob/main/images/Picture5.png)

### Storage Tracking
![Storge](https://github.com/ozgeuygun/ArtifactDepotApp/blob/main/images/Picture7.png)

### Login
![login](https://github.com/ozgeuygun/ArtifactDepotApp/blob/main/images/Picture8.png)
