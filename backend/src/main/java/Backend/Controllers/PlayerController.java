package Backend.Controllers;
import Backend.Services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import Backend.Entities.Player;

import java.util.List;

@RestController
@RequestMapping("/players")
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

}
