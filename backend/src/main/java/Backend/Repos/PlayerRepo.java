package Backend.Repos;
import Backend.Entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepo extends JpaRepository<Player, Integer> {
    List<Player> findByNationality(String nationality);
    List<Player> findByShirtNumber(String shirtNumber);
    List<Player> findByTeam(String team);
    List<Player> findByPosition(String position);
    List<Player> findByAge(String age);
    List<Player> findByName(String name);
}
