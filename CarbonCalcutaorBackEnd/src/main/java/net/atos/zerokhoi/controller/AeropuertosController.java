package net.atos.zerokhoi.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import net.atos.zerokhoi.entity.Aeropuerto;

import net.atos.zerokhoi.service.AeropuertoService;

@CrossOrigin(origins = {"http://localhost:4200/","https://localhost:4200/" })
@RestController
@RequestMapping("/aeropuertos")
public class AeropuertosController {
	@Autowired
	private AeropuertoService aeropuertoService;
	

	@GetMapping
	public List<Aeropuerto> index() {
		return aeropuertoService.findAll();
	}

	@GetMapping("pais/{pais}")
	public List<Aeropuerto> showByPais(@PathVariable String pais) {	
		
		
		return aeropuertoService.findByPais(pais);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Aeropuerto optAeropuerto = null;		
		Map<String, Object> response = new HashMap<>();
		try {

			optAeropuerto = aeropuertoService.findById(id);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta  en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (optAeropuerto == null) {
			response.put("mensaje", "El Aeropuerto ID: ".concat(id.toString()).concat(" no existe en la base de datos"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<Aeropuerto>(optAeropuerto, HttpStatus.OK);

	}
	
	@GetMapping("/aeropuerto/{nombre}")
	public ResponseEntity<?> showByNombre(@PathVariable String nombre) {
		Aeropuerto optAeropuerto = null;		
		Map<String, Object> response = new HashMap<>();
		try {

			optAeropuerto = aeropuertoService.findByNombre(nombre);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta  en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (optAeropuerto == null) {
			response.put("mensaje", "El Aeropuerto nombre: ".concat(nombre).concat(" no existe en la base de datos"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<Aeropuerto>(optAeropuerto, HttpStatus.OK);

	}
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@RequestBody @Valid Aeropuerto aeropuerto, BindingResult result) {
		Map<String, Object> response = new HashMap<>();
		Aeropuerto aeropuertoNew = null;
		// EN CASO DE QUE HAYA ERRORES EN LA VAILDACIÓN SE MUESTRAN EN LA RESPUESTA
		if (result.hasErrors()) {

			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			aeropuertoNew = aeropuertoService.save(aeropuerto);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al insertar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El aeropuerto ha sido creado con éxito");
		response.put("usuario", aeropuertoNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	// @ResponseStatus(HttpStatus.NO_CONTENT) // un 204
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();

		try {
			aeropuertoService.delete(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El aeropuerto ha sido eliminado con éxito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
}
