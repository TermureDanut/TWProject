package Backend.Entities;

import Backend.Entities.Player;

import java.util.ArrayList;
import java.util.List;

public class GameState {
    private Player player1Selection;
    private Player player2Selection;
    private int player1Guesses = 0;
    private int player2Guesses = 0;
    private boolean player1Finished = false;
    private boolean player2Finished = false;

    private List<Player> jugador1 = new ArrayList<Player>();
    private List<Player> jugador2 = new ArrayList<Player>();

    public GameState() {
    }

    public GameState(Player player1Selection, Player player2Selection) {
        this.player1Selection = player1Selection;
        this.player2Selection = player2Selection;
    }

    public Player getPlayer1Selection() {
        return player1Selection;
    }

    public Player getPlayer2Selection() {
        return player2Selection;
    }

    public int getPlayer1Guesses() {
        return player1Guesses;
    }

    public int getPlayer2Guesses() {
        return player2Guesses;
    }

    public boolean getPlayer1Finished() {
        return player1Finished;
    }

    public boolean getPlayer2Finished() {
        return player2Finished;
    }

    public void setPlayer1Selection(Player player) {
        this.player1Selection = player;
    }

    public void setPlayer2Selection(Player player) {
        this.player2Selection = player;
    }

    public void setPlayer1Guesses(int guesses) {
        this.player1Guesses = guesses;
    }

    public void setPlayer2Guesses(int guesses) {
        this.player2Guesses = guesses;
    }

    public void setPlayer1Finished(boolean finished) {
        this.player1Finished = finished;
    }

    public void setPlayer2Finished(boolean finished) {
        this.player2Finished = finished;
    }

    public List<Player> getJugador1() {
        return jugador1;
    }

    public void setJugador1(List<Player> jugador1) {
        this.jugador1 = jugador1;
    }

    public List<Player> getJugador2() {
        return jugador2;
    }

    public void setJugador2(List<Player> jugador2) {
        this.jugador2 = jugador2;
    }

    public void addJugador(int id, Player player){
        if(id == 1){
            jugador1.add(player);
        } else {
            jugador2.add(player);
        }
    }

    public void reset() {
        this.player1Guesses = 0;
        this.player2Guesses = 0;
        this.player1Finished = false;
        this.player2Finished = false;
        this.jugador1 = new ArrayList<Player>();
        this.jugador2 = new ArrayList<Player>();
    }
}