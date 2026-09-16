package com.app.interview.repository;

import com.app.interview.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<Interview> findByIdAndUserId(Long id, Long userId);

    long countByUserId(Long userId);

    @Query("SELECT AVG(i.score) FROM Interview i WHERE i.user.id = :userId")
    Optional<Double> findAverageScoreByUserId(@Param("userId") Long userId);

    @Query("SELECT MAX(i.score) FROM Interview i WHERE i.user.id = :userId")
    Optional<Integer> findMaxScoreByUserId(@Param("userId") Long userId);
}
