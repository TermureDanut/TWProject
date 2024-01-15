package Backend.Controllers;

import Backend.Entities.GameState;
import Backend.Entities.Player;
import Backend.Services.PlayerService;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    private PlayerService playerService;

    private GameState gameState = new GameState();
    private final Map<Integer, Player> playerAssignments = new HashMap<>();
    private final Map<Integer, Integer> playerGuessCounts = new HashMap<>();
    private AtomicInteger playerCount = new AtomicInteger(0);
    private AtomicInteger connectedClients = new AtomicInteger(0);

    @PostMapping("/connectClient")
    public synchronized ResponseEntity<String> connectClient() {
        int clientId = connectedClients.incrementAndGet();
        if (clientId > 2) {
            connectedClients.decrementAndGet(); // revert the count as the connection is rejected
            return ResponseEntity.badRequest().body("Game is already full.");
        }

        return ResponseEntity.ok("Client " + clientId + " connected.");
    }

    @PostMapping("/start")
    public ResponseEntity<String> startGame() {
        if (connectedClients.get() < 2) {
            return ResponseEntity.badRequest().body("Not enough clients connected to start the game.");
        }

        // Assign random players to clients
        for (int clientId = 1; clientId <= 2; clientId++) {
            Player assignedPlayer = playerService.getRandomPlayer();
            playerAssignments.put(clientId, assignedPlayer);
            playerGuessCounts.put(clientId, 0);

            if (clientId == 1) {
                gameState.setPlayer1Selection(assignedPlayer);
            } else {
                gameState.setPlayer2Selection(assignedPlayer);
            }
        }

        gameState.reset(); // Reset or initialize game state
        return ResponseEntity.ok("Game started with 2 clients.");
    }

    @PostMapping("/guess/{clientId}")
    public ResponseEntity<String> makeGuess(@PathVariable int clientId, @RequestBody String guess) {



        if (!playerAssignments.containsKey(clientId)) {
            return ResponseEntity.badRequest().body("Client not part of the game.");
        }

        if(clientId == 1){
            if(gameState.getPlayer1Guesses()>= 8){
                return ResponseEntity.ok("Out of guesses");
            }
        }
        else
        {
            if(gameState.getPlayer2Guesses()>= 8){
                return ResponseEntity.ok("Out of guesses");
            }
        }

        boolean isCorrect = handleGuess(clientId, guess);

        return ResponseEntity.ok(isCorrect ? "Correct guess!" : "Incorrect guess.");
    }

    @GetMapping("/state")
    public ResponseEntity<GameState> getGameState() {
        return ResponseEntity.ok(gameState);
    }

    private boolean handleGuess(int clientId, String guess) {


        Player jsonPlayer = playerService.getPlayerByName(guess);
        gameState.addJugador(clientId, jsonPlayer);

        Player assignedPlayer = playerAssignments.get(clientId);
        int guessCount = playerGuessCounts.getOrDefault(clientId, 0) + 1;
        System.out.println("Guess count for player: " + clientId + "is : " + guessCount);
        playerGuessCounts.put(clientId, guessCount);

        System.out.println("Player " + clientId + " guessed " + guess + " for player " + assignedPlayer.getName() + ".");

        JsonObject jsonObject = JsonParser.parseString(guess).getAsJsonObject();
        String stringGuess = jsonObject.get("guess").getAsString();
        boolean isCorrect = assignedPlayer.getName().equalsIgnoreCase(stringGuess);



        if(isCorrect){
            if(clientId == 1){
                gameState.setPlayer1Finished(true);
            } else {
                gameState.setPlayer2Finished(true);
            }
        }

        if(!isCorrect && guessCount >= 8){
            if(clientId == 1){
                gameState.setPlayer1Finished(true);
            } else {
                gameState.setPlayer2Finished(true);
            }
        }
        updateFinishedState(clientId);
        return isCorrect;
    }

    private void updateFinishedState(int clientId) {
        if (clientId == 1) {
            //gameState.setPlayer1Finished(true);
            gameState.setPlayer1Guesses(playerGuessCounts.get(1));
        } else {
            //gameState.setPlayer2Finished(true);
            gameState.setPlayer2Guesses(playerGuessCounts.get(2));
        }
        if (gameState.getPlayer1Finished() && gameState.getPlayer2Finished()) {
            if(gameState.getPlayer1Guesses() < gameState.getPlayer2Guesses()){
                System.out.println("Player 1 wins!");
                //gameState.setWinner(gameState.getPlayer1Selection());
            } else if(gameState.getPlayer1Guesses() > gameState.getPlayer2Guesses()){
                System.out.println("Player 2 wins!");
                //gameState.setWinner(gameState.getPlayer2Selection());
            } else {
                System.out.println("It's a tie!");
            }
        }
    }
}
