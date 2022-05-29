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
import net.atos.zerokhoi.service.ActividadService;

@CrossOrigin(origins = { "http://localhost:4200", "https://localhost:4200/" })
@RestController
@RequestMapping("/api")
public class ActividadController {
	@Autowired
	private ActividadService actividadService;

	private final RestTemplate restTemplate;

	@Autowired
	public ActividadController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@GetMapping("/actividades")
	public List<Actividad> index() {
		return actividadService.findAll();
	}

	@GetMapping("/actividad/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Actividad optActividad = null;
		/*
		 * if (optActividad!= null){ return ResponseEntity.ok(optActividad); } else {
		 * return ResponseEntity.notFound().build(); }
		 */
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
	public ResponseEntity<?> create(@RequestBody @Valid Actividad actividad, BindingResult result) {
		Map<String, Object> response = new HashMap<>();
		Actividad actividadNew = null;
		// EN CASO DE QUE HAYA ERRORES EN LA VAILDACIÓN SE MUESTRAN EN LA RESPUESTA
		if (result.hasErrors()) {

			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			actividadNew = actividadService.save(actividad);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al insertar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La actividad ha sido creada con éxito");
		response.put("actividad", actividadNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

	}
/*// método para verificar el token de facebook
	@GetMapping(value = "/valid")
	private FacebookTokenResponse facebookValidatetoken(@RequestParam String token) {

		String url = "https://graph.facebook.com/v10.0/me?access_token="+token+"&fields=name%2Cemail%2Cpicture%2Cfirst_name%2Clast_name";
			System.out.println(url);
		return restTemplate.getForObject(url, FacebookTokenResponse.class);

	}
 * */
	@GetMapping(value = "/valid")
	private FacebookTokenResponse facebookValidatetoken(@RequestParam String token,
			@RequestParam("fields") String fields) {



			String uri = "https://graph.facebook.com/v10.0/me ?access_token=" + token + "&fields=" + fields;



			return restTemplate.getForObject(uri, FacebookTokenResponse.class);
			}
	

	@PutMapping("/actividades/{id}")
	// @ResponseStatus(HttpStatus.CREATED)
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

		response.put("mensaje", "La actividad ha sido actualizada con éxito");
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

		response.put("mensaje", "La actividad ha sido eliminada con éxito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

}
