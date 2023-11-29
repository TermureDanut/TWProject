package Backend.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import Backend.Entities.Player;
import Backend.Repos.PlayerRepo;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepo playerRepo;

    public List<Player> getAllPlayers(){
        return playerRepo.findAll();
    }

    public List<Player> getPlayersByNationality(String nationality) {
        return playerRepo.findByNationality(nationality);
    }

    public List<Player> getPlayersByShirtNumber(String shirtNumber) {
        return playerRepo.findByShirtNumber(shirtNumber);
    }

    public Optional<Player> getPlayerById(int id){
        return playerRepo.findById(id);
    }

}
