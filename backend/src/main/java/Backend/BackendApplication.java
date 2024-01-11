package Backend;

import Backend.Entities.Player;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import java.io.IOException;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) throws IOException {
		ConfigurableApplicationContext context = SpringApplication.run(BackendApplication.class, args);
		Server server = context.getBean(Server.class);
		try {
			server.startServer();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
