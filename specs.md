## About
A application for hotels or airbnb owners to show the availability of their rooms.

## The frontend has 3 pages:
- Home page
  - Room Availability
  - Some images
  - Call to action: call the owner and book a room
- Login page
  - Username
  - Password (sha-256 hashed)
- Admin page
  - See rooms
  - Create / update / delete rooms
  - See bookings
  - Create / update / delete bookings
  - Create booking -> Add a booking to a room at a certain date range
  - Search for the room given the name of the booking


## Technologies
  - React Router: each screen should have a different url (/rooms/1, /rooms/1/edit)
  - MaterialUI
  - functional components
  - hooks / context
  - TypeScript
  - authentication with JWT


## Details
  - mobile view + pc view
  - use HttpOnly cookies, with these flags: Set-Cookie: token=<jwt>; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600
  - JWT expiration: 15 minutes

