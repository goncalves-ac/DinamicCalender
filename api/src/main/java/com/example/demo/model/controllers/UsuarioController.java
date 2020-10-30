package com.example.demo.model.controllers;

import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /* Encontrar Usuario */
    @GetMapping()
    public Iterable<Usuario> getUsuario() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getById(@PathVariable int id){
        return usuarioRepository.findById(id);
    }

    @GetMapping("/nome")
    public Usuario getByTitulo(@RequestParam String nome) {
        return usuarioRepository.findByNome(nome);
    }

    /* Adicionar Evento */
    @PostMapping()
    public Usuario addEvento(@RequestBody Usuario usuario) {
        usuarioRepository.save(usuario);
        return usuario;
    }

    /* Atualizar Evento */
    @PutMapping("/{idEvento}")
    public Usuario updateAmigo(@PathVariable int idEvento, @RequestBody Usuario dadosUsuario) throws Exception{
        Usuario meuEvento = usuarioRepository.findById(idEvento)
                .orElseThrow(() -> new IllegalArgumentException());

        /* Fazer os tratamentos */

        usuarioRepository.save(meuEvento);
        return meuEvento;
    }

    /* Delete Usuario */
    @DeleteMapping("/{id}")
    public  void deleteUsuario(@PathVariable int id) {
        usuarioRepository.deleteById(id);
    }

}
