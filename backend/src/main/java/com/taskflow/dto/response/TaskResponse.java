package com.taskflow.dto.response;

import com.taskflow.entity.Task;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TaskResponse {

    private Long id;
    private Long projectId;
    private String title;
    private String description;
    private String status;
    private String priority;
    private String dueDate;
    private Long createdBy;
    private String createdAt;
    private String updatedAt;

    public static TaskResponse from(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .projectId(task.getProject().getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus().name())
                .priority(task.getPriority())
                .dueDate(task.getDueDate() != null ? task.getDueDate().toString() : null)
                .createdBy(task.getCreatedBy().getId())
                .createdAt(task.getCreatedAt().toString())
                .updatedAt(task.getUpdatedAt() != null ? task.getUpdatedAt().toString() : null)
                .build();
    }
}
