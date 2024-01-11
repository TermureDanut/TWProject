package Backend;

import java.net.Socket;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class UserTest {
    public static void main(String[] args) throws IOException {
        String hostName = "localhost";
        int portNumber = 12345;

        try (
                Socket socket = new Socket(hostName, portNumber);
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in))
        ) {
            System.out.println("Connected to server");

            String fromServer;
            while ((fromServer = in.readLine()) != null) {
                System.out.println("Server: " + fromServer);

                // Check for termination conditions
                if (fromServer.toLowerCase().contains("correct!") || fromServer.toLowerCase().contains("out of guesses")) {
                    break;
                }

                // Read guess from user and send to server
                System.out.print("Enter your guess: ");
                String userGuess = stdIn.readLine();
                if (userGuess != null) {
                    out.println(userGuess);
                }
            }
        }
    }
}
