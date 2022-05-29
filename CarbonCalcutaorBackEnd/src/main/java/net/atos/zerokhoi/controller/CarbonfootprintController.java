package net.atos.zerokhoi.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/carbonfootprint")
public class CarbonfootprintController {
	private final RestTemplate restTemplate;
	@Autowired
	public CarbonfootprintController(RestTemplate restTemplate) {		
		this.restTemplate = restTemplate;
	}
	
	@GetMapping(value = "/cocheshuella")
	private  ResponseEntity<?> getHelloClient( @RequestParam("distance")String distance, @RequestParam("vehicle")String vehicle) {
		
		String uri = "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?distance="+distance+"&vehicle="+vehicle;
		 //Set the headers you need send
        final HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        // example of custom header
        headers.set( "X-RapidAPI-Host","carbonfootprint1.p.rapidapi.com");
        headers.set( "X-RapidAPI-Key", "d67089acf9msh2c9d7f69329b7e8p1cd044jsn24b15e1cf32d");
       
        //Create a new HttpEntity
        final HttpEntity<String> entity = new HttpEntity<String>(headers);		
		//Long result = restTemplate.getForObject(uri, Long.class);
        ResponseEntity<Map> response = restTemplate.exchange(uri, HttpMethod.GET, entity, Map.class);        
        
		return  response;
	}

}
