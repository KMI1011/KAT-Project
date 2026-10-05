package kat_project.demo.models;

import kat_project.demo.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepo extends JpaRepository<Users, Integer> {
	Optional<Users> findByUsername(String username);
	Optional<Users> findByEmail(String email);
	List<Users> findAll();
}
