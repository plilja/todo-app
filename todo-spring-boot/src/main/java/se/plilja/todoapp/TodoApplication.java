package se.plilja.todoapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableAutoConfiguration
@EnableWebMvc
@Component
public class TodoApplication implements ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        taskRepository.save(new Task("Buy milk", "..."));
        taskRepository.save(new Task("Clean apartment", "..."));
        taskRepository.save(new Task("Work out", "..."));
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(TodoApplication.class, args);
    }
}
