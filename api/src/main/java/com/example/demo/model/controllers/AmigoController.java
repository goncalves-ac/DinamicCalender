package com.example.demo.model.controllers;

import com.example.demo.model.entities.Amigo;
import com.example.demo.model.repositories.AmigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "amigo")
public class AmigoController {

    @Autowired
    private AmigoRepository amigoRepository;

    /* Encontrar Amigos */
    @GetMapping()
    public Iterable<Amigo> getAmigos() {
        return amigoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Amigo> getById(@PathVariable int id){
        return amigoRepository.findById(id);
    }


    /* Adicionar Amigo */
    @PostMapping()
    public Amigo addAmigo(@RequestBody Amigo amigo) {
        amigoRepository.save(amigo);
        return amigo;
    }

    /* Atualizar Amigo */
    @PutMapping("/{idAmigo}")
    public Amigo updateAmigo(@PathVariable int idAmigo, @RequestBody Amigo dadosAmigo) throws Exception{
        Amigo meuAmigo = amigoRepository.findById(idAmigo)
                .orElseThrow(() -> new IllegalArgumentException());

        /* Fazer os tratamentos */

        amigoRepository.save(meuAmigo);
        return meuAmigo;
    }

    /* Delete Amigo */
    @DeleteMapping("/{id}")
    public  void deleteAmigo(@PathVariable int id) {
        amigoRepository.deleteById(id);
    }

}
