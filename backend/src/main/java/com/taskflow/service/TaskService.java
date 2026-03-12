package com.taskflow.service;

import com.taskflow.dto.request.TaskRequest;
import com.taskflow.dto.request.TaskStatusUpdateRequest;
import com.taskflow.dto.response.TaskResponse;
import com.taskflow.entity.Project;
import com.taskflow.entity.Task;
import com.taskflow.entity.User;
import com.taskflow.exception.CustomException;
import com.taskflow.repository.ProjectRepository;
import com.taskflow.repository.TaskRepository;
import com.taskflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional
    public TaskResponse create(Long projectId, TaskRequest request, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new CustomException("프로젝트를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        Task task = Task.builder()
                .project(project)
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .dueDate(request.getDueDate() != null ? LocalDate.parse(request.getDueDate()) : null)
                .createdBy(user)
                .build();

        taskRepository.save(task);
        return TaskResponse.from(task);
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> getByProject(Long projectId) {
        return taskRepository.findByProjectIdOrderByCreatedAtDesc(projectId)
                .stream()
                .map(TaskResponse::from)
                .toList();
    }

    @Transactional
    public TaskResponse update(Long id, TaskRequest request) {
        Task task = findTaskById(id);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate() != null ? LocalDate.parse(request.getDueDate()) : null);
        return TaskResponse.from(task);
    }

    @Transactional
    public TaskResponse updateStatus(Long id, TaskStatusUpdateRequest request) {
        Task task = findTaskById(id);
        task.setStatus(request.getStatus());
        return TaskResponse.from(task);
    }

    @Transactional
    public void delete(Long id) {
        Task task = findTaskById(id);
        taskRepository.delete(task);
    }

    private Task findTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new CustomException("할 일을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
    }
}
