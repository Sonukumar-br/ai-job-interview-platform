package com.app.interview.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class JobRoleMatchRequestDTO {

    @NotBlank(message = "Role ID cannot be empty")
    @Size(max = 100, message = "Role ID cannot exceed 100 characters")
    private String roleId;

    public JobRoleMatchRequestDTO() {
    }

    public JobRoleMatchRequestDTO(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
