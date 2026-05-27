import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'

const RoomList = lazy(() => import('./pages/RoomList'))
const RoomDetail = lazy(() => import('./pages/RoomDetail'))
const RoomForm = lazy(() => import('./pages/RoomForm'))
const BookingList = lazy(() => import('./pages/BookingList'))
const BookingDetail = lazy(() => import('./pages/BookingDetail'))
const BookingForm = lazy(() => import('./pages/BookingForm'))

export default function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rooms" element={<ProtectedRoute><RoomList /></ProtectedRoute>} />
        <Route path="/rooms/new" element={<ProtectedRoute><RoomForm /></ProtectedRoute>} />
        <Route path="/rooms/:id" element={<ProtectedRoute><RoomDetail /></ProtectedRoute>} />
        <Route path="/rooms/:id/edit" element={<ProtectedRoute><RoomForm /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><BookingList /></ProtectedRoute>} />
        <Route path="/bookings/new" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
        <Route path="/bookings/:id" element={<ProtectedRoute><BookingDetail /></ProtectedRoute>} />
        <Route path="/bookings/:id/edit" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  )
}