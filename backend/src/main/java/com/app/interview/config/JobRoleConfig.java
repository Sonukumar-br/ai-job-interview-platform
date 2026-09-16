package com.app.interview.config;

import com.app.interview.dto.JobRoleDTO;
import org.springframework.context.annotation.Configuration;

import java.util.*;

@Configuration
public class JobRoleConfig {

    public static class RoleDefinition {
        private final String id;
        private final String name;
        private final String description;
        private final List<String> requiredSkills;

        public RoleDefinition(String id, String name, String description, List<String> requiredSkills) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.requiredSkills = requiredSkills;
        }

        public String getId() { return id; }
        public String getName() { return name; }
        public String getDescription() { return description; }
        public List<String> getRequiredSkills() { return requiredSkills; }
    }

    private static final Map<String, RoleDefinition> ROLE_MAP = new LinkedHashMap<>();

    static {
        ROLE_MAP.put("java-full-stack", new RoleDefinition(
                "java-full-stack",
                "Java Full Stack Developer",
                "Full Stack Web Development using Java 21, Spring Boot, REST APIs, React, and MySQL",
                List.of("Java", "OOP", "Collections", "Exception Handling", "Java 8+", "Spring Boot", "REST API",
                        "Spring Data JPA", "Spring Security", "SQL", "MySQL", "React", "HTML", "CSS", "JavaScript", "Git", "Docker")
        ));

        ROLE_MAP.put("java-backend", new RoleDefinition(
                "java-backend",
                "Java Backend Developer",
                "Core Backend Development using Java, Spring Boot, Microservices, Security, and Database Optimization",
                List.of("Java", "Java 8+", "OOP", "Spring Boot", "REST API", "Spring Data JPA", "Spring Security",
                        "Hibernate", "SQL", "MySQL", "Microservices", "Git", "Docker", "Unit Testing")
        ));

        ROLE_MAP.put("frontend-developer", new RoleDefinition(
                "frontend-developer",
                "Frontend Developer",
                "Modern Web Frontend Development using React, JavaScript, ES6+, Responsive Design, and REST APIs",
                List.of("HTML", "CSS", "JavaScript", "ES6+", "React", "Redux/Context API", "REST API",
                        "CSS Modules", "TailwindCSS/SASS", "TypeScript", "Git", "Vite")
        ));

        ROLE_MAP.put("software-engineer", new RoleDefinition(
                "software-engineer",
                "Software Engineer",
                "Foundational Software Engineering skills across Data Structures, Algorithms, Core Java, System Design, and SQL",
                List.of("Java", "Data Structures", "Algorithms", "OOP", "System Design", "SQL", "REST API",
                        "Git", "Unit Testing", "Docker", "Linux")
        ));
    }

    public List<JobRoleDTO> getAllRoles() {
        List<JobRoleDTO> list = new ArrayList<>();
        ROLE_MAP.values().forEach(role -> list.add(new JobRoleDTO(role.getId(), role.getName(), role.getDescription())));
        return list;
    }

    public RoleDefinition getRoleDefinition(String roleId) {
        String key = roleId != null ? roleId.toLowerCase().trim() : "";
        if (!ROLE_MAP.containsKey(key)) {
            // Default fallback if roleId not found
            return ROLE_MAP.get("java-full-stack");
        }
        return ROLE_MAP.get(key);
    }
}
