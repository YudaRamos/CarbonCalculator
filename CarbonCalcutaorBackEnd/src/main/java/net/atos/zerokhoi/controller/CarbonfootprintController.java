package net.atos.zerokhoi.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = {"http://localhost:4200/","https://localhost:4200/"})
@RestController
@RequestMapping("/carbonfootprint")
public class CarbonfootprintController {
	private final RestTemplate restTemplate;
	
	@Autowired
	public CarbonfootprintController(RestTemplate restTemplate) {		
		this.restTemplate = restTemplate;
	}
	
	@GetMapping(value = "/cocheshuella")
	private  ResponseEntity<?> getCochesHuella( @RequestParam("distance")String distance, @RequestParam("vehicle")String vehicle) {
		
		String uri = "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?distance="+distance+"&vehicle="+vehicle;
		 //Set the headers you need send
        final HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        // example of custom header
        headers.set( "X-RapidAPI-Host","carbonfootprint1.p.rapidapi.com");

        //headers.set( "X-RapidAPI-Key", "2ef8e71aedmshb5c9e4fb4992e53p144fc7jsn7a6e0982b183");

        headers.set( "X-RapidAPI-Key", "7da3bdf4b8msh616c8efd8873a43p1d301ejsn5428b531df98");
       // bd3ed9f383mshad347e2419e9e87p12c23ejsnd57f22376f25  //mia bd3ed9f383mshad347e2419e9e87p12c23ejsnd57f22376f25

       
        //Create a new HttpEntity
        final HttpEntity<String> entity = new HttpEntity<String>(headers);		
		//Long result = restTemplate.getForObject(uri, Long.class);
        ResponseEntity<Map> response = restTemplate.exchange(uri, HttpMethod.GET, entity, Map.class);        
        
		return  response;
	}
	
	@GetMapping(value = "/transpublihuella")
	private  ResponseEntity<?> getTransPubliHuella( @RequestParam("distance")String distance, @RequestParam("type")String type) {
		
		String uri = "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit?distance="+distance+"&type="+type;
//Set the headers you need send
        final HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        // example of custom header
        headers.set( "X-RapidAPI-Host","carbonfootprint1.p.rapidapi.com");

        headers.set( "X-RapidAPI-Key", "7da3bdf4b8msh616c8efd8873a43p1d301ejsn5428b531df98");

        //Create a new HttpEntity
        final HttpEntity<String> entity = new HttpEntity<String>(headers);		
		//Long result = restTemplate.getForObject(uri, Long.class);
        ResponseEntity<Map> response = restTemplate.exchange(uri, HttpMethod.GET, entity, Map.class);        
        
		return  response;
	}
  
  
	@GetMapping(value = "/motoshuella")
	private  ResponseEntity<?> getHuellaMoto( @RequestParam("type")String type, @RequestParam("distance")String distance) {
		
		String uri = "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromMotorBike?type="+type+"&distance="+distance;

		 //Set the headers you need send
        final HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        // example of custom header
        headers.set( "X-RapidAPI-Host","carbonfootprint1.p.rapidapi.com");

        headers.set( "X-RapidAPI-Key", "7da3bdf4b8msh616c8efd8873a43p1d301ejsn5428b531df98");

        //Create a new HttpEntity
        final HttpEntity<String> entity = new HttpEntity<String>(headers);		
		//Long result = restTemplate.getForObject(uri, Long.class);
        ResponseEntity<Map> response = restTemplate.exchange(uri, HttpMethod.GET, entity, Map.class);        
        
		return  response;
	}

}
