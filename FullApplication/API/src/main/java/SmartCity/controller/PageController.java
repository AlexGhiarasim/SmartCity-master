package SmartCity.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class PageController {

    private static final Logger logger = LoggerFactory.getLogger(PageController.class);

    @GetMapping("/")
    public String getIndexPage() {
        return "index";
    }

    @GetMapping("/home")
    public ResponseEntity<String> getHomePage(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            model.addAttribute("username", username);
            return ResponseEntity.ok("home");
        } else {
            // Utilizatorul nu este autentificat, returnează codul de stare 401 Unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilizatorul nu este autentificat.");
        }
    }


    @GetMapping("/admin")
    public String getAdminPage(Model model) {
        return "admin";
    }
}
