package se.plilja.todoapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping("/create")
    public String create(
            @RequestParam(value = "name", required = true) String name,
            @RequestParam(value = "description", required = true) String description,
            Model model) {
        taskRepository.save(new Task(name, description));
        return "redirect:/";
    }

    @RequestMapping("/view_task/{taskId}/")
    public String viewTask(@PathVariable Long taskId, Model model) {
        Task task = taskRepository.findOne(taskId);
        model.addAttribute("task", task);
        return "view_task";
    }

    @RequestMapping("/close_task/{taskId}/")
    public String closeTask(@PathVariable Long taskId, Model model) {
        taskRepository.delete(taskId);
        return "redirect:/";
    }

    @RequestMapping("/edit_begin/{taskId}/")
    public String editBegin(@PathVariable Long taskId, Model model) {
        Task task = taskRepository.findOne(taskId);
        model.addAttribute("task", task);
        return "edit_task";
    }

    @RequestMapping("/edit_save/{taskId}/")
    public String editSave(
            @PathVariable Long taskId,
            @RequestParam(value = "name", required = true) String name,
            @RequestParam(value = "description", required = true) String description,
            Model model) {
        Task task = taskRepository.findOne(taskId);
        task.setName(name);
        task.setDescription(description);
        taskRepository.save(task);
        return String.format("redirect:/view_task/%d/", task.getId());
    }
}
