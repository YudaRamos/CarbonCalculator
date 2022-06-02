package net.atos.zerokhoi.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

import net.atos.zerokhoi.dto.TravelFlights;

//@CrossOrigin(origins = {"http://localhost:4200/","https://localhost:4200/"})
@RestController
@RequestMapping("/climatic")
public class ClimaticController {
	private final RestTemplate restTemplate;

	@Autowired
	public ClimaticController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	/**
	 * Método para calcular la huella de carbono de un viaje en avion
	 * 
	 * @param TravelFlights data son los datos del vuelo recibidos del front
	 * @return response la huella generada
	 */
	@PostMapping(value = "/huella")
	private ResponseEntity<?> onbtenerHuella(@RequestBody TravelFlights data) {
		//url del API de Climatic
		String uri = "https://beta3.api.climatiq.io/travel/flights";
		final HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", "application/json");
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		//en la cabecera debe ir el API key
		headers.set("Authorization", "Bearer 6CZHVT9SWWMMPHQ87YPWRF89TB3D");

		Gson gson = new Gson();
		String representacionJSON = gson.toJson(data);

		final HttpEntity<String> entity = new HttpEntity<String>(representacionJSON, headers);

		ResponseEntity<Map> response = restTemplate.postForEntity(uri, entity, Map.class);

		return response;
	}
}
