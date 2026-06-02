package com.rooman.controller;

import com.rooman.model.Booking;
import com.rooman.model.Room;
import com.rooman.service.BookingService;
import com.rooman.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;
    private final BookingService bookingService;

    public RoomController(RoomService roomService, BookingService bookingService) {
        this.roomService = roomService;
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.findAll());
    }

    @GetMapping("/available")
    public ResponseEntity<List<Room>> getAvailableRooms(@RequestParam("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        return ResponseEntity.ok(roomService.findAvailableRooms(localDate));
    }

    @GetMapping("/{id}/bookings")
    public ResponseEntity<List<Booking>> getRoomBookings(@PathVariable Integer id) {
        return ResponseEntity.ok(bookingService.findByRoomId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Integer id) {
        return roomService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@Valid @RequestBody Room room) {
        Room created = roomService.create(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Integer id, @Valid @RequestBody Room room) {
        Room updated = roomService.update(id, room);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Integer id) {
        roomService.delete(id);
        return ResponseEntity.noContent().build();
    }
}