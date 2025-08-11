package com.localconnector.community.admin;

import com.localconnector.community.config.DemoSeeder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
public class ReseedController {
    @Autowired private DemoSeeder demoSeeder;
    @Value("${app.auth.dev-enabled:true}") private boolean dev;

    @PostMapping("/reseed")
    public ResponseEntity<Void> reseed() throws Exception {
        if (!dev) return ResponseEntity.status(403).build();
        // There is no direct reseed; for demo, advise restart or re-run seeder if DB is empty
        return ResponseEntity.noContent().build();
    }
}