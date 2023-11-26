package Backend.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
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
}
