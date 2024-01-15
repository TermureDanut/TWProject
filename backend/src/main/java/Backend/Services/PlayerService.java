package Backend.Services;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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

    public Player getPlayerByName(String name){
        JsonObject jsonObject = JsonParser.parseString(name).getAsJsonObject();
        String stringGuess = jsonObject.get("guess").getAsString();
        List<Player> players = playerRepo.findAll();
        for (Player player : players) {
            if (player.getName().equals(stringGuess)) {

                return player;
            }
        }
        return null;
    }

    public Player getRandomPlayer() {
        List<Player> players = playerRepo.findAll();
        int random = (int) (Math.random() * players.size());
        System.out.println(players.get(random).getName());
        return players.get(random);
    }
}
