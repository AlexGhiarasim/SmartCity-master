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

import javax.servlet.http.HttpServletRequest;

@Controller
public class PageController {

    private static final Logger logger = LoggerFactory.getLogger(PageController.class);

    @GetMapping("/")
    public String getIndexPage() {
        return "index";
    }

    @GetMapping("/home")
    public String getHomePage(Model model, HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Preia header-ul "Authorization" din cerere
        String authHeader = request.getHeader("Authorization");

        // Verifică dacă header-ul conține un JWT
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Extrage token-ul JWT din header
            String jwt = authHeader.substring(7); // Elimină prefixul "Bearer "
            // Afișează token-ul JWT în consolă
            System.out.println("JWT: " + jwt);
        }

        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            model.addAttribute("username", username);
        }
        return "home";
    }


    @GetMapping("/admin")
    public String getAdminPage(Model model) {
        return "admin";
    }
}
