package com.example.demo.model.repositories;

import com.example.demo.model.entities.Amigo;
import org.springframework.data.repository.CrudRepository;

public interface AmigoRepository extends CrudRepository<Amigo, Integer> {

}
