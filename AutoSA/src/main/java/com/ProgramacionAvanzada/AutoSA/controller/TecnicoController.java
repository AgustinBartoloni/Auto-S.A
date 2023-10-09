package com.ProgramacionAvanzada.AutoSA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProgramacionAvanzada.AutoSA.dto.TecnicoDto;
import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;
import com.ProgramacionAvanzada.AutoSA.service.TecnicoService;

@RestController
@RequestMapping("/tecnico")
@CrossOrigin("*")
public class TecnicoController {
    @Autowired
    TecnicoService tecnicoService;

    @GetMapping("/list")
    public ResponseEntity<List<Tecnico>> findAll(){

        List<Tecnico> list = tecnicoService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody TecnicoDto tecnicoDto){

        if(tecnicoDto.getNombre().isBlank()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Tecnico tecnicoNuevo = new Tecnico(
            tecnicoDto.getNombre(),
            tecnicoDto.getApellido(),
            tecnicoDto.getDni(),
            tecnicoDto.getTelefono(),
            tecnicoDto.getEmail(),
            tecnicoDto.getDomicilio()
        );

        tecnicoService.save(tecnicoNuevo);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody TecnicoDto tecnicoDto){
        
        if(!tecnicoService.existsById(id)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Tecnico tecnico = tecnicoService.findById(id).get();

        tecnico.setNombre(tecnicoDto.getNombre());
        tecnico.setApellido(tecnicoDto.getApellido());
        tecnico.setDni(tecnicoDto.getDni());
        tecnico.setTelefono(tecnicoDto.getTelefono());
        tecnico.setEmail(tecnicoDto.getEmail());
        tecnico.setDomicilio(tecnicoDto.getDomicilio());;

        tecnicoService.save(tecnico);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){
        if(!tecnicoService.existsById(id)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        tecnicoService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
