package br.com.dinamic_calendar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "")
public class BasicController {

    @RequestMapping
    public String index(){
        return "redirect:/login";
    }
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(){
        return "login";
    }
    @RequestMapping(value = "/cadastro", method = RequestMethod.GET)
    public String cadastro(){
        return "cadastro";
    }
    @RequestMapping(value = "/sair", method = RequestMethod.GET)
    public String sair(){
        return "redirect:/login";
    }
    @RequestMapping(value = "/blank", method = RequestMethod.GET)
    public String blankPage(){
        return "blankPage";
    }

}
