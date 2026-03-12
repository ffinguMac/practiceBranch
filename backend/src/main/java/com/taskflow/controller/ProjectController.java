package com.taskflow.controller;

import com.taskflow.dto.request.ProjectRequest;
import com.taskflow.dto.response.ProjectResponse;
import com.taskflow.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> create(
            @Valid @RequestBody ProjectRequest request,
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        ProjectResponse response = projectService.create(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getMyProjects(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        List<ProjectResponse> responses = projectService.getMyProjects(userId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getById(@PathVariable Long id) {
        ProjectResponse response = projectService.getById(id);
        return ResponseEntity.ok(response);
    }
}
