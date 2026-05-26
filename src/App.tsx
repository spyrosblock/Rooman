import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import RoomList from './pages/RoomList'
import RoomDetail from './pages/RoomDetail'
import RoomForm from './pages/RoomForm'
import BookingList from './pages/BookingList'
import BookingDetail from './pages/BookingDetail'
import BookingForm from './pages/BookingForm'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rooms" element={<RoomList />} />
      <Route path="/rooms/new" element={<RoomForm />} />
      <Route path="/rooms/:id" element={<RoomDetail />} />
      <Route path="/rooms/:id/edit" element={<RoomForm />} />
      <Route path="/bookings" element={<BookingList />} />
      <Route path="/bookings/new" element={<BookingForm />} />
      <Route path="/bookings/:id" element={<BookingDetail />} />
      <Route path="/bookings/:id/edit" element={<BookingForm />} />
    </Routes>
  )
}