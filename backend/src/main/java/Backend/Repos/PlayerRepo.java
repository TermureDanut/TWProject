package Backend.Repos;
import Backend.Entities.Player;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface PlayerRepo extends JpaRepository<Player, Integer> {
    List<Player> findByNationality(String nationality);
    List<Player> findByShirtNumber(String shirtNumber);
    Optional<Player> findById(int id);
    List<Player> findByTeam(String team);
    List<Player> findByPosition(String position);
    List<Player> findByAge(int age);
    List<Player> findByName(String name);
}
