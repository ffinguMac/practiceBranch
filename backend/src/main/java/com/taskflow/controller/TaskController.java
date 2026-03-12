package com.taskflow.controller;

import com.taskflow.dto.request.TaskRequest;
import com.taskflow.dto.request.TaskStatusUpdateRequest;
import com.taskflow.dto.response.TaskResponse;
import com.taskflow.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/api/projects/{projectId}/tasks")
    public ResponseEntity<TaskResponse> create(
            @PathVariable Long projectId,
            @Valid @RequestBody TaskRequest request,
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        TaskResponse response = taskService.create(projectId, request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/api/projects/{projectId}/tasks")
    public ResponseEntity<List<TaskResponse>> getByProject(@PathVariable Long projectId) {
        List<TaskResponse> responses = taskService.getByProject(projectId);
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/api/tasks/{id}")
    public ResponseEntity<TaskResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {
        TaskResponse response = taskService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/api/tasks/{id}/status")
    public ResponseEntity<TaskResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody TaskStatusUpdateRequest request) {
        TaskResponse response = taskService.updateStatus(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/api/tasks/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
