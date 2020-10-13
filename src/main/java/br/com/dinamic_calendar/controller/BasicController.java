package br.com.dinamic_calendar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class BasicController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(){
        return "login";
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String qlqr_coisa(){
        return "test";
    }

}
