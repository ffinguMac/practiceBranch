package com.taskflow.dto.request;

import com.taskflow.entity.TaskStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskStatusUpdateRequest {

    @NotNull(message = "상태값은 필수입니다.")
    private TaskStatus status;
}
