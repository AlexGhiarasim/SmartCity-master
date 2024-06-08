package SmartCity.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class PageController {

    private static final Logger logger = LoggerFactory.getLogger(PageController.class);

    @GetMapping("/")
    public ResponseEntity<Resource> getIndexPage() {
        return getPage("/static/index.html");
    }


    @GetMapping("/home")
    public ResponseEntity<Resource> getHomePage() {
        logger.info("Accessing home page");
        return getPage("/static/home.html");
    }

    private ResponseEntity<Resource> getPage(String path) {
        try {
            Resource resource = new ClassPathResource(path);
            if (resource.exists()) {
                return ResponseEntity.ok().body(resource);
            } else {
                logger.error("Resource not found: " + path);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            logger.error("Error accessing resource: " + path, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
