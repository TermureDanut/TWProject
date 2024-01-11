package Backend.Services;

import Backend.Entities.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    @Autowired
    private PlayerService playerService;

    private Player player1Selection;
    private Player player2Selection;
    private int player1Guesses = 0;
    private int player2Guesses = 0;
    private static final int MAX_GUESSES = 8;

    public void selectRandomPlayers(int clientId) {
        if(clientId == 1) {
            player1Selection = getRandomPlayer();
        } else {
            player2Selection = getRandomPlayer();
        }
    }

    public boolean makeGuess(int playerId, String guess) {
        Player selectedPlayer = (playerId == 1) ? player1Selection : player2Selection;
        if (selectedPlayer.getName().equalsIgnoreCase(guess)) {
            return true;
        } else {
            if (playerId == 1) {
                player1Guesses++;
            } else {
                player2Guesses++;
            }
            return false;
        }
    }

    public int getRemainingGuesses(int playerId) {
        int guesses = (playerId == 1) ? player1Guesses : player2Guesses;
        return MAX_GUESSES - guesses;
    }

    public int getGuessCount(int playerId) {
        return (playerId == 1) ? player1Guesses : player2Guesses;
    }

    public Player getPlayer1Selection() {
        return player1Selection;
    }

    public Player getPlayer2Selection() {
        return player2Selection;
    }

    public Player getRandomPlayer() {
        return playerService.getRandomPlayer();
    }

    public void setPlayer1Selection(Player player) {
        this.player1Selection = player;
    }

    public void setPlayer2Selection(Player player) {
        this.player2Selection = player;
    }
}
