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

import com.ProgramacionAvanzada.AutoSA.dto.ClienteDto;
import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.service.ClienteService;

@RestController
@RequestMapping("/cliente")
@CrossOrigin("*")
public class ClienteController {
    @Autowired
    ClienteService clienteService;

    @GetMapping("/list")
    public ResponseEntity<List<Cliente>> findAll(){

        List<Cliente> list = clienteService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ClienteDto clienteDto){
        
        try {
            Cliente clienteNuevo = new Cliente(
            clienteDto.getNombre(),
            clienteDto.getApellido(),
            clienteDto.getDni(),
            clienteDto.getTelefono(),
            clienteDto.getEmail()
        );

        clienteService.save(clienteNuevo);
        return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }   
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody ClienteDto clienteDto){
        
        if(!clienteService.existsById(id)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Cliente cliente = clienteService.findById(id).get();

        cliente.setNombre(clienteDto.getNombre());
        cliente.setApellido(clienteDto.getApellido());
        cliente.setDni(clienteDto.getDni());
        cliente.setTelefono(clienteDto.getTelefono());
        cliente.setEmail(clienteDto.getEmail());

        clienteService.save(cliente);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){

        if(!clienteService.existsById(id)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        clienteService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/by/{dni}")
    public ResponseEntity<Cliente> findByDni(@PathVariable("dni")int dni){

        try {
            Cliente cliente = clienteService.findByDni(dni).get();
            return new ResponseEntity<>(cliente, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        
    }
}
