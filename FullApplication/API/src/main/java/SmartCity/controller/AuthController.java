package SmartCity.controller;

import SmartCity.model.auth.User;
import SmartCity.payload.request.LoginRequest;
import SmartCity.payload.request.SignupRequest;
import SmartCity.payload.response.JwtResponse;
import SmartCity.payload.response.MessageResponse;
import SmartCity.repository.UserRepository;
import SmartCity.service.JwtService;
import SmartCity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> realUser = userRepository.findByUsername(loginRequest.getUsername());
        return realUser
                .map(user -> getJwtResponseBy(user.getUsername(), loginRequest.getPassword()))
                .orElseGet(() -> getJwtResponseBy(null, loginRequest.getPassword()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        String username = signUpRequest.getUsername();
        if (userService.exist(username)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Email already taken."));
        }
        String password = signUpRequest.getPassword();
        userService.create(username, password, signUpRequest.getRole(),
                signUpRequest.getFirstName(), signUpRequest.getLastName());
        return getJwtResponseBy(username, password);
    }

    private ResponseEntity getJwtResponseBy(String username, String password) {
        JwtResponse jwtResponse = jwtService.getJwtByCredentials(username, password);
        return ResponseEntity.ok(jwtResponse);
    }

}
