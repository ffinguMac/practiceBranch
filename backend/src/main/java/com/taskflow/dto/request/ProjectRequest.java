package com.taskflow.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectRequest {

    @NotBlank(message = "프로젝트 이름은 필수입니다.")
    @Size(max = 100, message = "프로젝트 이름은 100자 이하여야 합니다.")
    private String name;

    private String description;
}
