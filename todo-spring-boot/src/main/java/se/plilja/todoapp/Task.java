package se.plilja.todoapp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Calendar;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private Date createdDate;

    // JPA magic
    protected Task() {}

    public Task(String name, String description) {
        this.name = name;
        this.description = description;
        this.createdDate = new Date(Calendar.getInstance().getTime().getTime());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedDate() {
        return createdDate;
    }
}
