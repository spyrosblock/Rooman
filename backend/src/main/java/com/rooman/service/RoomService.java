package com.rooman.service;

import com.rooman.model.Room;
import com.rooman.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    public Optional<Room> findById(Integer id) {
        return roomRepository.findById(id);
    }

    public List<Room> findByType(String type) {
        return roomRepository.findByType(type);
    }

    public Room create(Room room) {
        return roomRepository.save(room);
    }

    public Room update(Integer id, Room roomDetails) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));

        if (roomDetails.getName() != null) {
            room.setName(roomDetails.getName());
        }
        if (roomDetails.getType() != null) {
            room.setType(roomDetails.getType());
        }
        if (roomDetails.getFloor() != null) {
            room.setFloor(roomDetails.getFloor());
        }
        if (roomDetails.getPrice() != null) {
            room.setPrice(roomDetails.getPrice());
        }
        if (roomDetails.getCapacity() != null) {
            room.setCapacity(roomDetails.getCapacity());
        }
        if (roomDetails.getDescription() != null) {
            room.setDescription(roomDetails.getDescription());
        }

        return roomRepository.save(room);
    }

    public void delete(Integer id) {
        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found with id: " + id);
        }
        roomRepository.deleteById(id);
    }
}