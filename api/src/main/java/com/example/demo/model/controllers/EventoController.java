package com.example.demo.model.controllers;

import com.example.demo.model.entities.Evento;
import com.example.demo.model.repositories.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "evento")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    /* Encontrar Evento */
    @GetMapping()
    public Iterable<Evento> getEventos() {
        return eventoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Evento> getById(@PathVariable int id){
        return eventoRepository.findById(id);
    }

    @GetMapping("/titulo")
    public Evento getByTitulo(@RequestParam String titulo) {
        return eventoRepository.findByTitulo(titulo);
    }

    /* Adicionar Evento */
    @PostMapping()
    public Evento addEvento(@RequestBody Evento evento) {
        eventoRepository.save(evento);
        return evento;
    }

    /* Atualizar Evento */
    @PutMapping("/{idEvento}")
    public Evento updateAmigo(@PathVariable int idEvento, @RequestBody Evento dadosEvento) throws Exception{
        Evento meuEvento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new IllegalArgumentException());

        /* Fazer os tratamentos */

        eventoRepository.save(meuEvento);
        return meuEvento;
    }

    /* Delete Evento */
    @DeleteMapping("/{id}")
    public  void deleteAmigo(@PathVariable int id) {
        eventoRepository.deleteById(id);
    }

}
