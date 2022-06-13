package com.example.oauth2authserverdemo.config;

import com.example.oauth2authserverdemo.provider.AuthProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    AuthProvider authProvider;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
      /*  http.authorizeRequests(authorizeRequests ->
                        authorizeRequests.anyRequest().authenticated()
                ) */

        http.csrf().disable().authorizeRequests().antMatchers("/oauth2/token", "/login/**","/login**","/callback/", "/webjars/**", "/error**", "/oauth2/authorization/**","/sw.js").permitAll()
                .anyRequest().authenticated().and().formLogin(withDefaults());

       // http.logout(l -> l.logoutUrl("/logout1"));
        http.logout(l -> {
           // l.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK));
            l.logoutSuccessUrl("http://127.0.0.1:4200");
            l.invalidateHttpSession(true);
            l.clearAuthentication(true);
            l.deleteCookies("JSESSIONID");
        });


        http.oauth2Login(httpSecurityOAuth2LoginConfigurer -> {
            httpSecurityOAuth2LoginConfigurer.defaultSuccessUrl("/auth/success", true);
        });

        http.formLogin().defaultSuccessUrl("/auth/success", true);

        http.authenticationProvider(authProvider);

     //   http.logout().
    //  logoutSuccessHandler((new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)))
     // .invalidateHttpSession(true).clearAuthentication(true).deleteCookies("JSESSIONID", "JWT");
        return http.build();
    }

    @Bean
    public FilterRegistrationBean corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
       // config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
