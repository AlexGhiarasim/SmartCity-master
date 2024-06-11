package SmartCity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ReservationExpiryTask {

    @Autowired
    private ParkingSpotService parkingSpotService;

    @Scheduled(fixedRate = 60000) // Runs every minute
    public void checkForExpiredReservations() {
        parkingSpotService.freeExpiredReservations();
    }
}
