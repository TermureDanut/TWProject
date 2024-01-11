package Backend;

import Backend.Entities.GameState;
import Backend.Entities.Player;
import Backend.Services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.ServerSocket;
import java.net.Socket;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class Server {

    @Autowired
    private PlayerService playerService;

    private GameState gameState = new GameState();

    private final Map<Integer, Player> playerAssignments = new HashMap<>();
    private final Map<Integer, Integer> playerGuessCounts = new HashMap<>();

    private AtomicInteger playerCount = new AtomicInteger(0);

    public void startServer() throws IOException {
        try (ServerSocket serverSocket = new ServerSocket(12345)) {
            System.out.println("Server started. Waiting for players...");

            Socket clientSocket = null;
            while (playerAssignments.size() < 1) {
                clientSocket = serverSocket.accept();
                playerCount.incrementAndGet();
                int clientId = playerAssignments.size() + 1;
                System.out.println("Player " + clientId + " connected.");
                handlePlayer(clientSocket, clientId);

            }
            System.out.println("Both players have connected. Starting game...");
            while (true)
                handleGameState(clientSocket);
        }
    }

    private void handleGameState(Socket clientSocket) throws IOException {
        if (gameState.getPlayer1Finished() && gameState.getPlayer2Finished()) {
            System.out.println("Both players have finished.");
            System.out.println("Player 1 guesses: " + gameState.getPlayer1Guesses());
            System.out.println("Player 2 guesses: " + gameState.getPlayer2Guesses());
            if(gameState.getPlayer1Guesses() < gameState.getPlayer2Guesses()){
                System.out.println("Player 1 wins!");
            } else if(gameState.getPlayer1Guesses() > gameState.getPlayer2Guesses()){
                System.out.println("Player 2 wins!");
            } else {
                System.out.println("It's a tie!");
            }
            System.out.println("Game over.");
            playerAssignments.remove(1);
            playerAssignments.remove(2);
            System.out.println("Player " + 1 + " has disconnected.");
            System.out.println("Player " + 2 + " has disconnected.");
            clientSocket.close();
            System.exit(0);
        }
    }

    private void handlePlayer(Socket clientSocket, int playerId) {
        new Thread(() -> {
            try (BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                 PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true)) {

                while (playerCount.get() < 2) {
                    out.println("Waiting for another player to connect...");
                }

                // Assign a random player to this client
                Player assignedPlayer = playerService.getRandomPlayer();
                playerAssignments.put(playerId, assignedPlayer);
                playerGuessCounts.put(playerId, 0);

                if(playerId == 1){
                    gameState.setPlayer1Selection(assignedPlayer);
                } else {
                    gameState.setPlayer2Selection(assignedPlayer);
                }

                out.println("Your assigned player is: " + assignedPlayer.getName());

                // Handle guesses
                String guess;
                while ((guess = in.readLine()) != null) {
                    if (handleGuess(playerId, guess)) {
                        out.println("Correct! The player was: " + assignedPlayer.getName());
                        break;
                    } else {
                        int remainingGuesses = 8 - playerGuessCounts.get(playerId);
                        if (remainingGuesses <= 0) {
                            out.println("Out of guesses! The player was: " + assignedPlayer.getName());
                            break;
                        } else {
                            out.println("Incorrect guess. You have " + remainingGuesses + " guesses left.");
                        }
                    }
                }

                if(playerId == 1){
                    gameState.setPlayer1Guesses(playerGuessCounts.get(playerId));
                    gameState.setPlayer1Finished(true);
                } else {
                    gameState.setPlayer2Guesses(playerGuessCounts.get(playerId));
                    gameState.setPlayer2Finished(true);
                }


            } catch (IOException e) {
                try {
                    clientSocket.close();
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
                System.out.println("Player " + playerId + " has disconnected.");
            } finally {
                //playerAssignments.remove(playerId);
                //System.out.println("Player " + playerId + " has disconnected.");
                //clientSocket.close();
            }
        }).start();
    }

    private boolean handleGuess(int playerId, String guess) {
        Player assignedPlayer = playerAssignments.get(playerId);
        int guessCount = playerGuessCounts.getOrDefault(playerId, 0);
        playerGuessCounts.put(playerId, guessCount + 1);
        return assignedPlayer.getName().equalsIgnoreCase(guess);
    }
}
