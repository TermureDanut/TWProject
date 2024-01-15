package Backend.Controllers;
import Backend.Entities.GameState;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/gameState")
    @SendTo("/topic/gameUpdate")
    public GameState sendGameState(GameState gameState) {
        // Modify gameState or handle logic
        return gameState;
    }
}