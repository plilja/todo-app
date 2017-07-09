package se.plilja.todoapp;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableAutoConfiguration
@EnableWebMvc
public class TodoApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(TodoApplication.class, args);
    }
}
