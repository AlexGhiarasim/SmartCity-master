//package SmartCity.config;
//
//import SmartCity.model.business.ParkingLot;
//import SmartCity.model.business.ParkingSpot;
//import SmartCity.model.business.Wall;
//import SmartCity.model.business.Corridor;
//import SmartCity.repository.ParkingLotRepository;
//import SmartCity.repository.ParkingSpotRepository;
//import SmartCity.repository.WallRepository;
//import SmartCity.repository.CorridorRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DataLoader implements CommandLineRunner {
//
//    @Autowired
//    private ParkingLotRepository parkingLotRepository;
//
//    @Autowired
//    private ParkingSpotRepository parkingSpotRepository;
//
//    @Autowired
//    private WallRepository wallRepository;
//
//    @Autowired
//    private CorridorRepository corridorRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        // Insert Parking Lots
//        ParkingLot lot1 = new ParkingLot("Parcare Palas A1", 15, 20);
//        ParkingLot lot2 = new ParkingLot( "Parcare Palas A2", 5, 10);
//        ParkingLot lot3 = new ParkingLot("Parcare Iulius C2", 6, 6);
//
//        parkingLotRepository.save(lot1);
//        parkingLotRepository.save(lot2);
//        parkingLotRepository.save(lot3);
//
//        // Insert Walls
//        wallRepository.save(new Wall(0, 0, 0, 19, lot1));
//        wallRepository.save(new Wall(0, 0, 14, 0, lot1));
//        wallRepository.save(new Wall(14, 1, 14, 19, lot1));
//        wallRepository.save(new Wall(1, 19, 14, 19, lot1));
//        wallRepository.save(new Wall(13, 3, 13, 16, lot1));
//
//        // Insert Corridors
//        corridorRepository.save(new Corridor(2, 2, 2, 17, lot1));
//        corridorRepository.save(new Corridor(1, 2, 14, 2, lot1));
//        corridorRepository.save(new Corridor(1, 17, 14, 17, lot1));
//        corridorRepository.save(new Corridor(5, 3, 5, 16, lot1));
//        corridorRepository.save(new Corridor(8, 3, 8, 16, lot1));
//        corridorRepository.save(new Corridor(11, 3, 11, 16, lot1));
//
//        // Insert Parking Spots
//        for (int x = 1; x <= 13; x++) {
//            parkingSpotRepository.save(new ParkingSpot(null, false, lot1, x, 1, null));
//            parkingSpotRepository.save(new ParkingSpot(null, false, lot1, x, 18, null));
//        }
//
//        // Additional specific parking spots
//        parkingSpotRepository.save(new ParkingSpot(null, false, lot1, 1, 3, null));
//        // Add more specific spots as needed following the same pattern.
//    }
//}
