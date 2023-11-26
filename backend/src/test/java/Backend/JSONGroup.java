package Backend;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JSONGroup {
    public static void main(String[] args) {
        String path = "D:\\Projects\\TWProject\\backend\\players.json";
        try{
            String json = new String(Files.readAllBytes(Paths.get(path)));
            JSONObject root = new JSONObject(json);
            JSONArray players = root.getJSONArray("players");

            for (int i=0 ; i<players.length(); ++i){
                JSONObject player = players.getJSONObject(i);
                String position = player.getString("position");

                if(position.equals("Centre-Back") ||position.equals("Left-Back") ||position.equals("Right-Back")||position.equals("Full-Back")){
                    player.put("position", "DEFENDER");
                }
                else if(position.equals("Defensive Midfield") ||position.equals("Central Midfield") ||position.equals("Attacking Midfield")||position.equals("Left Midfield")||position.equals("Right Midfield")||position.equals("Midfield")){
                    player.put("position", "MIDFIELDER");
                }
                else if(position.equals("Centre-Forward") ||position.equals("Second Striker") ||position.equals("Left Winger")||position.equals("Right Winger")||position.equals("Winger")){
                    player.put("position", "FORWARD");
                }
                else if(position.equals("Goalkeeper")){
                    player.put("position", "GK");
                }
            }

            String modifiedJson = root.toString(4);
            Files.write(Paths.get(path), modifiedJson.getBytes());

            System.out.println("Done");

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}
