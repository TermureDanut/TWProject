package Backend.Entities;

public class Player {
    private String name;
    private int shirtNumber;
    private Position position;
    private int age;
    private String imageUrl;
    private int id;
    private String team;
    private String nationality;

    public Player(String name, int shirtNumber, Position position, int age, String imageUrl, int id, String team, String nationality) {
        this.name = name;
        this.shirtNumber = shirtNumber;
        this.position = position;
        this.age = age;
        this.imageUrl = imageUrl;
        this.id = id;
        this.team = team;
        this.nationality = nationality;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getShirtNumber() {
        return shirtNumber;
    }

    public void setShirtNumber(int shirtNumber) {
        this.shirtNumber = shirtNumber;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }



}
