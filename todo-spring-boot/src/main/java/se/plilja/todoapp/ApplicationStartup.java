package se.plilja.todoapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        taskRepository.save(new Task("Buy milk", "..."));
        taskRepository.save(new Task("Clean apartment", "..."));
        taskRepository.save(new Task("Work out", "..."));
    }
}
