package com.taskflow.dto.response;

import com.taskflow.entity.Project;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectResponse {

    private Long id;
    private String name;
    private String description;
    private Long ownerId;
    private String createdAt;
    private String updatedAt;

    public static ProjectResponse from(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .ownerId(project.getOwner().getId())
                .createdAt(project.getCreatedAt().toString())
                .updatedAt(project.getUpdatedAt() != null ? project.getUpdatedAt().toString() : null)
                .build();
    }
}
