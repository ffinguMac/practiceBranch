package com.taskflow.service;

import com.taskflow.dto.request.ProjectRequest;
import com.taskflow.dto.response.ProjectResponse;
import com.taskflow.entity.Project;
import com.taskflow.entity.User;
import com.taskflow.exception.CustomException;
import com.taskflow.repository.ProjectRepository;
import com.taskflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional
    public ProjectResponse create(ProjectRequest request, Long userId) {
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .owner(owner)
                .build();

        projectRepository.save(project);
        return ProjectResponse.from(project);
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getMyProjects(Long userId) {
        return projectRepository.findByOwnerIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(ProjectResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new CustomException("프로젝트를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
        return ProjectResponse.from(project);
    }
}
