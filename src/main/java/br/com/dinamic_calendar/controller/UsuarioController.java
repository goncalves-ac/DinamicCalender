package br.com.dinamic_calendar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/usuario")
public class UsuarioController {

    @RequestMapping
    public String index(){
        return "redirect:/usuario/perfil";
    }

    @RequestMapping(value = "/perfil", method = RequestMethod.GET)
    public String usuarioPerfil(){
        return "usuario/perfil";
    }

    @RequestMapping(value = "/calendario", method = RequestMethod.GET)
    public String usuarioCalendario(){
        return "usuario/calendario";
    }

}
