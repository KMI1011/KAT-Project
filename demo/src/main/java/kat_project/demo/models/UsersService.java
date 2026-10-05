package kat_project.demo.models;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

	@Autowired
	private UsersRepo userRepository;

	public Users saveUser(Users user) {
		return userRepository.save(user);
	}

	public List<Users> getAllUsers() {
		return userRepository.findAll();
	}

	public Optional<Users> getUserById(Integer id) {
		return userRepository.findById(id);
	}

	public Optional<Users> getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public Optional<Users> getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public void deleteUser(Integer id) {
		userRepository.deleteById(id);
	}
}
