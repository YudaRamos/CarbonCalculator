package net.atos.zerokhoi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import net.atos.zerokhoi.dto.DataElectricidad;
import net.atos.zerokhoi.dto.HuellaElectricidad;
@CrossOrigin(origins = {"http://localhost:4200/","https://localhost:4200/"})
@RestController
@RequestMapping("/carbon")
public class CarbonInterfaceController {
	private final RestTemplate restTemplate;
	
	@Autowired
	public CarbonInterfaceController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@PostMapping(value = "/huella")
	private Double obtenerHuella(@RequestBody DataElectricidad data) {
		
		String uri = "https://www.carboninterface.com/api/v1/estimates";		
		UriComponentsBuilder builderUrl = UriComponentsBuilder.fromHttpUrl(uri);

		final HttpHeaders headers = new HttpHeaders();

		headers.set("Authorization", "Bearer drmWFh0Vcy4Ny6B0SR8Rw"); //drmWFh0Vcy4Ny6B0SR8Rw    REnsO67ngkI9I8F8qIQ
		
		final HttpEntity<DataElectricidad> entity = new HttpEntity<>(data, headers);
		
		ResponseEntity<HuellaElectricidad> result= restTemplate.exchange(builderUrl.build().encode().toUri(),
				HttpMethod.POST, entity, HuellaElectricidad.class);
		
		return result.getBody().getData().getAttributes().getCarbon_kg();
		
	}
}