package se.plilja.todoapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TodoController {

    @Autowired
    private TaskRepository taskRepository;

    @RequestMapping("/")
    public String home(@RequestParam(value = "name", required = false, defaultValue = "") String name, Model model) {
        Iterable<Task> tasks = taskRepository.findByNameContainingIgnoreCase(name);
        model.addAttribute("tasks", tasks);
        return "home";
    }
}
