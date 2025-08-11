package com.localconnector.community.config;

import com.localconnector.community.circles.model.Circle;
import com.localconnector.community.circles.model.CircleFeature;
import com.localconnector.community.circles.model.CircleEdge;
import com.localconnector.community.circles.repo.CircleEdgeRepository;
import com.localconnector.community.circles.repo.CircleFeatureRepository;
import com.localconnector.community.circles.repo.CircleRepository;
import com.localconnector.community.orders.model.MenuItem;
import com.localconnector.community.orders.repo.MenuItemRepository;
import com.localconnector.community.promotions.model.Promo;
import com.localconnector.community.promotions.repo.PromoRepository;
import com.localconnector.community.taskboard.model.TaskPost;
import com.localconnector.community.taskboard.repo.TaskPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DemoSeeder {

    @Value("${app.demo.seed:true}")
    private boolean demoSeed;

    @Bean
    CommandLineRunner seed(
            CircleRepository circleRepository,
            CircleFeatureRepository featureRepository,
            CircleEdgeRepository edgeRepository,
            MenuItemRepository menuItemRepository,
            PromoRepository promoRepository,
            TaskPostRepository taskPostRepository
    ) {
        return args -> {
            if (!demoSeed) return;
            if (circleRepository.count() > 0) return;

            Circle oakwood = circleRepository.save(Circle.builder().ownerUserId("superadmin").name("Oakwood Apartments").type("APARTMENT").radiusMiles(2.0).policiesJson("{\"verifiedOnly\":true}").createdAt(Instant.now()).build());
            Circle buildingA = circleRepository.save(Circle.builder().ownerUserId("oakwood_admin").name("Building A").type("SUB").createdAt(Instant.now()).build());
            featureRepository.saveAll(List.of(
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("RESERVATIONS").enabled(true).build(),
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("INCIDENTS").enabled(true).build(),
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("ANNOUNCEMENTS").enabled(true).build(),
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("EVENTS").enabled(true).build(),
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("POLLS").enabled(true).build(),
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("DIRECTORY").enabled(true).build(),
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("GUEST_PASSES").enabled(true).build(),
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("TASKBOARD").enabled(true).build(),
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("CHAT").enabled(true).build(),
                    CircleFeature.builder().circleId(oakwood.getId()).featureKey("ANALYTICS").enabled(true).build()
            ));

            Circle riverInn = circleRepository.save(Circle.builder().ownerUserId("river_staff").name("River Inn Hotel").type("HOTEL").createdAt(Instant.now()).build());
            featureRepository.saveAll(List.of(
                    CircleFeature.builder().circleId(riverInn.getId()).featureKey("RESERVATIONS").enabled(true).build(),
                    CircleFeature.builder().circleId(riverInn.getId()).featureKey("ORDERS").enabled(true).build(),
                    CircleFeature.builder().circleId(riverInn.getId()).featureKey("ANNOUNCEMENTS").enabled(true).build(),
                    CircleFeature.builder().circleId(riverInn.getId()).featureKey("PAYMENTS").enabled(true).build()
            ));

            Circle plano = circleRepository.save(Circle.builder().ownerUserId("organizer").name("Plano Community Hub").type("COMMUNITY").createdAt(Instant.now()).build());
            featureRepository.saveAll(List.of(
                    CircleFeature.builder().circleId(plano.getId()).featureKey("ANNOUNCEMENTS").enabled(true).build(),
                    CircleFeature.builder().circleId(plano.getId()).featureKey("EVENTS").enabled(true).build(),
                    CircleFeature.builder().circleId(plano.getId()).featureKey("POLLS").enabled(true).build(),
                    CircleFeature.builder().circleId(plano.getId()).featureKey("PROMOTIONS").enabled(true).build(),
                    CircleFeature.builder().circleId(plano.getId()).featureKey("RESERVATIONS").enabled(true).build()
            ));

            Circle seven = circleRepository.save(Circle.builder().ownerUserId("merchant_admin").name("7-Seven Market").type("MERCHANT").createdAt(Instant.now()).build());
            featureRepository.save(CircleFeature.builder().circleId(seven.getId()).featureKey("PROMOTIONS").enabled(true).build());

            Circle personal = circleRepository.save(Circle.builder().ownerUserId("you").name("Anish’s Local Help").type("PERSONAL").createdAt(Instant.now()).build());
            featureRepository.save(CircleFeature.builder().circleId(personal.getId()).featureKey("TASKBOARD").enabled(true).build());

            edgeRepository.save(CircleEdge.builder().fromCircleId(oakwood.getId()).toCircleId(riverInn.getId()).allowedActionsJson("[\"VIEW_PROMOS\",\"PLACE_RESERVATION\",\"PLACE_ORDER\"]").status(CircleEdge.Status.ACTIVE).build());
            edgeRepository.save(CircleEdge.builder().fromCircleId(oakwood.getId()).toCircleId(seven.getId()).allowedActionsJson("[\"VIEW_PROMOS\"]").status(CircleEdge.Status.ACTIVE).build());

            // Menu for River Inn
            menuItemRepository.save(MenuItem.builder().circleId(riverInn.getId()).title("Club Sandwich").description("Fresh").priceCents(1099L).active(true).build());
            menuItemRepository.save(MenuItem.builder().circleId(riverInn.getId()).title("Caesar Salad").description("Crisp").priceCents(899L).active(true).build());

            // Promos
            promoRepository.save(Promo.builder().circleId(seven.getId()).title("2 for 1 Snacks").body("Today only").active(true).claimCount(0L).build());
            promoRepository.save(Promo.builder().circleId(seven.getId()).title("Free Coffee 9-11am").body("Show app").active(true).claimCount(0L).build());

            // Task posts
            taskPostRepository.save(TaskPost.builder().circleId(oakwood.getId()).authorUserId("alice").type(TaskPost.Type.BABYSIT).title("Babysit this Friday").body("6-10pm").status(TaskPost.Status.OPEN).createdAt(Instant.now()).build());
            taskPostRepository.save(TaskPost.builder().circleId(oakwood.getId()).authorUserId("bob").type(TaskPost.Type.SHARE).title("Share Ladder").body("8ft ladder available").status(TaskPost.Status.OPEN).createdAt(Instant.now()).build());
        };
    }
}