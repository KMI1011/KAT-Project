package kat_project.demo.models;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UsersController {

	@Autowired
	private UsersService userService;

	@PostMapping
	public ResponseEntity<Users> createUser(@RequestBody Users user) {
		Users saved = userService.saveUser(user);
		return ResponseEntity.ok(saved);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Users>> getUsers() {
		List<Users> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Users> getUserById(@PathVariable Integer id) {
		Optional<Users> user = userService.getUserById(id);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/username/{username}")
	public ResponseEntity<Users> getUserByUsername(@PathVariable String username) {
		Optional<Users> user = userService.getUserByUsername(username);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/email/{email}")
	public ResponseEntity<Users> getUserByEmail(@PathVariable String email) {
		Optional<Users> user = userService.getUserByEmail(email);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
}
