package Backend.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Player {
    @Id
    private int id;
    @Column
    private String name;
    @Column
    private String shirtNumber;
    @Column
    @Enumerated(EnumType.STRING)
    private Position position;
    @Column
    private int age;
    @Column
    private String imageUrl;
    @Column
    private String team;
    @Column
    private String nationality;





}
