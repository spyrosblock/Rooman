package com.rooman.repository;

import com.rooman.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @Query("SELECT b FROM Booking b WHERE b.roomId = :roomId AND b.checkIn < :checkOut AND b.checkOut > :checkIn")
    List<Booking> findConflictingBookings(@Param("roomId") Integer roomId,
                                          @Param("checkIn") LocalDate checkIn,
                                          @Param("checkOut") LocalDate checkOut);

    @Query("SELECT b FROM Booking b WHERE b.roomId = :roomId AND b.id <> :excludeId AND b.checkIn < :checkOut AND b.checkOut > :checkIn")
    List<Booking> findConflictingBookingsExcludingId(@Param("roomId") Integer roomId,
                                                     @Param("checkIn") LocalDate checkIn,
                                                     @Param("checkOut") LocalDate checkOut,
                                                     @Param("excludeId") Integer excludeId);

    @Query("SELECT DISTINCT b.roomId FROM Booking b WHERE b.checkIn <= :date AND b.checkOut > :date AND b.status <> 'cancelled'")
    List<Integer> findBookedRoomIdsOnDate(@Param("date") LocalDate date);
}
