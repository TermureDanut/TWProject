package Backend.Controllers;
import Backend.Services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import Backend.Entities.Player;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/players")
@Component
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/all")
    public List<Player> getAllPlayers(){
        return playerService.getAllPlayers();
    }

    @GetMapping("/by-nationality")
    public List<Player> getPlayersbyNationality(@RequestParam String nationality){
        return playerService.getPlayersByNationality(nationality);
    }

    @GetMapping("/by-shirt-number")
    public List<Player> getPlayersByShirtNumber(@RequestParam String shirtNumber) {
        return playerService.getPlayersByShirtNumber(shirtNumber);
    }

    @GetMapping("/by-id={id}")
    public Optional<Player> playerbyID(@PathVariable int id){
        return playerService.getPlayerById(id);


    }

    @GetMapping("/random")
    public Player getRandomPlayer(){
        return playerService.getRandomPlayer();
    }
}
