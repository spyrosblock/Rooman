package com.rooman.service;

import com.rooman.model.Booking;
import com.rooman.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> findById(Integer id) {
        return bookingRepository.findById(id);
    }

    public Booking create(Booking booking) {
        if (booking.getCheckIn() == null || booking.getCheckOut() == null) {
            throw new IllegalArgumentException("Check-in and check-out dates are required");
        }
        if (!booking.getCheckIn().isBefore(booking.getCheckOut())) {
            throw new IllegalArgumentException("Check-in must be before check-out");
        }
        if (booking.getCheckIn().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Check-in cannot be in the past");
        }

        List<Booking> conflicts = bookingRepository.findConflictingBookings(
                booking.getRoomId(), booking.getCheckIn(), booking.getCheckOut());
        if (!conflicts.isEmpty()) {
            throw new IllegalArgumentException("Room is not available for the selected dates");
        }

        return bookingRepository.save(booking);
    }

    public Booking update(Integer id, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        if (bookingDetails.getGuestName() != null) {
            booking.setGuestName(bookingDetails.getGuestName());
        }
        if (bookingDetails.getRoomId() != null) {
            booking.setRoomId(bookingDetails.getRoomId());
        }
        if (bookingDetails.getCheckIn() != null) {
            booking.setCheckIn(bookingDetails.getCheckIn());
        }
        if (bookingDetails.getCheckOut() != null) {
            booking.setCheckOut(bookingDetails.getCheckOut());
        }
        if (bookingDetails.getStatus() != null) {
            booking.setStatus(bookingDetails.getStatus());
        }
        if (bookingDetails.getTotal() != null) {
            booking.setTotal(bookingDetails.getTotal());
        }
        if (bookingDetails.getGuests() != null) {
            booking.setGuests(bookingDetails.getGuests());
        }
        if (bookingDetails.getEmail() != null) {
            booking.setEmail(bookingDetails.getEmail());
        }
        if (bookingDetails.getPhone() != null) {
            booking.setPhone(bookingDetails.getPhone());
        }
        if (bookingDetails.getNotes() != null) {
            booking.setNotes(bookingDetails.getNotes());
        }

        return bookingRepository.save(booking);
    }

    public void delete(Integer id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Booking not found with id: " + id);
        }
        bookingRepository.deleteById(id);
    }
}