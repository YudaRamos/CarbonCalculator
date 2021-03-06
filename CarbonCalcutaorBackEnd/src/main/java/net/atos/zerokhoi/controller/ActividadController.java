package net.atos.zerokhoi.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import net.atos.zerokhoi.dto.FacebookTokenResponse;
import net.atos.zerokhoi.entity.Actividad;
import net.atos.zerokhoi.entity.Usuario;
import net.atos.zerokhoi.service.ActividadService;
import net.atos.zerokhoi.service.UsuarioService;

@CrossOrigin(origins = { "http://localhost:4200", "https://localhost:4200/" })
@RestController
@RequestMapping("/api")
public class ActividadController {
	@Autowired
	private ActividadService actividadService;
	@Autowired
	private UsuarioService usuarioService;

	private final RestTemplate restTemplate;

	@Autowired
	public ActividadController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@GetMapping("/actividades")
	public List<Actividad> index() {
		return actividadService.findAll();
	}

	@GetMapping("/user")
	public ResponseEntity<?> findByUser(@RequestParam  String email) {
		Usuario usuario = null;
		Map<String, Object> response = new HashMap<>();
		try {
			usuario = usuarioService.findByEmail(email);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta  en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if (usuario == null) {
			response.put("mensaje",
					"El usuario con email: ".concat(email.toString()).concat(" no existe en la base de datos"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);

		}
		List<Actividad> actividades= actividadService.findByUser(usuario);
		
		return new ResponseEntity<List<Actividad>>( actividades, HttpStatus.NOT_FOUND);
	}

	@GetMapping("/actividad/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Actividad optActividad = null;

		Map<String, Object> response = new HashMap<>();
		try {

			optActividad = actividadService.findById(id);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta  en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (optActividad == null) {
			response.put("mensaje",
					"La actividad con ID: ".concat(id.toString()).concat(" no existe en la base de datos"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<Actividad>(optActividad, HttpStatus.OK);

	}

	@PostMapping("/actividades")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@RequestBody @Valid Actividad actividad,@RequestParam  String email, BindingResult result) {
		Map<String, Object> response = new HashMap<>();
		Actividad actividadNew = null;
		
		Usuario usuario = null;
		// EN CASO DE QUE HAYA ERRORES EN LA VAILDACI??N SE MUESTRAN EN LA RESPUESTA
		if (result.hasErrors()) {

			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			usuario = usuarioService.findByEmail(email);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta  en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if (usuario == null) {
			response.put("mensaje",
					"El usuario con email: ".concat(email.toString()).concat(" no existe en la base de datos"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);

		}

		try {
			actividad.setUser(usuario);
			actividadNew = actividadService.save(actividad);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al insertar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La actividad ha sido creada con ??xito");
		response.put("actividad", actividadNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

	}
	/**
	 * M??todo para validar el token de acceso generado por facebook
	 * @param String token es el token desde angular genrado con el social login de facebook
	 * @param String fields es un string fijo pero necesario en la url
	 * @return devuelve un dto con los datos del usuario que devuelve el  API Graph
	 * */ 
	@GetMapping(value = "/valid")
	private FacebookTokenResponse facebookValidatetoken(@RequestParam String token,
			@RequestParam("fields") String fields) {
		String uri = "https://graph.facebook.com/v10.0/me ?access_token=" + token + "&fields=" + fields;
		return restTemplate.getForObject(uri, FacebookTokenResponse.class);
	}

	@PutMapping("/actividades/{id}")	
	public ResponseEntity<?> update(@RequestBody @Valid Actividad actividad, BindingResult result,
			@PathVariable Long id) {

		Actividad actividadActual = null;
		Actividad actividadUpdate = null;
		Map<String, Object> response = new HashMap<>();
		if (result.hasErrors()) {

			List<String> errors = result.getFieldErrors().stream()
					.map(error -> "El campo '" + error.getField() + "'" + error.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		// buscamos la actividad por el id(que esta datached)
		actividadActual = actividadService.findById(id);

		if (actividadActual == null) {
			response.put("mensaje", "Error: no se pudo editar, la actividad con ID: ".concat(id.toString())
					.concat(" no existe en la base de datos"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);

		}
		try {

			// le asignamos los datos nuevos que recibimos de la actividad

			actividadActual.setFecha(actividad.getFecha());
			actividadActual.setCategoria(actividad.getCategoria());
			actividadActual.setConsumo(actividad.getConsumo());
			// guardamos la actividad modificada
			actividadUpdate = actividadService.save(actividadActual);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "La actividad ha sido actualizada con ??xito");
		response.put("actividad", actividadUpdate);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@DeleteMapping("/actividades/{id}")
	// @ResponseStatus(HttpStatus.NO_CONTENT) // un 204
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();

		try {
			actividadService.delete(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "La actividad ha sido eliminada con ??xito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

}
