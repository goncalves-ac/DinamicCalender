package br.com.dinamic_calendar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class BasicController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(){
        return "redirect:login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(){
        return "login";
    }

    @RequestMapping(value = "/blank", method = RequestMethod.GET)
    public String blankPage(){
        return "blankPage";
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String pagina_test(){
        return "test";
    }

}
