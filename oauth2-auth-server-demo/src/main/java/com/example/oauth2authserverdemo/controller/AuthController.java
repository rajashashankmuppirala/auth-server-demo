package com.example.oauth2authserverdemo.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/success")
    public RedirectView redirectAfterSuccess(HttpServletRequest request) {
        String baseUrl = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("/oauth2/authorize?response_type=code&client_id=test-client&redirect_uri=http://127.0.0.1:4200&scope=openid");
        return redirectView;
    }
}
