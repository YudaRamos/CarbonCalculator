package net.atos.zerokhoi.controller;

import java.io.IOException;
import java.net.URI;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;

import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

//******************

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;

import net.atos.zerokhoi.dto.FacebookTokenResponse;
import net.atos.zerokhoi.dto.TokenDto;

//@CrossOrigin
@RestController
@RequestMapping("/oauth")
public class OauthController {
	@Value("${google.clientId}")
	String googleClientId;

	private final RestTemplate restTemplate;

	@Autowired
	public OauthController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@PostMapping("/google")
	public ResponseEntity<?> google(@RequestBody TokenDto tokenDto) throws IOException, GeneralSecurityException {

		final NetHttpTransport transport = new NetHttpTransport();

		final String CLIENT_ID = "376408136521-dotoaa2bdl0kjage0npjivhrchnes0gu.apps.googleusercontent.com";

		final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

		// final GoogleIdToken googleIdToken=
		// GoogleIdToken.parse(verifier.getJsonFactory(), tokenDto.getValue ());
		// final GoogleIdToken.Payload payload = googleIdToken.getPayload();

		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, JSON_FACTORY)
				// Specify the CLIENT_ID of the app that accesses the backend:
				.setAudience(Collections.singletonList(CLIENT_ID))
				// Or, if multiple clients access the backend:
				// .setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
				.build();

		// (Receive idTokenString by HTTPS POST)

		GoogleIdToken idToken = verifier.verify(tokenDto.getValue());
		if (idToken != null) {
			Payload payload = idToken.getPayload();

			// Print user identifier
			String userId = payload.getSubject();
			System.out.println("User ID: " + userId);

			// Get profile information from payload
			String email = payload.getEmail();
			boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
			String name = (String) payload.get("name");
			String pictureUrl = (String) payload.get("picture");
			String locale = (String) payload.get("locale");
			String familyName = (String) payload.get("family_name");
			String givenName = (String) payload.get("given_name");

			// Use or store profile information
			// ...

		} else {
			System.out.println("Invalid ID token.");
		}

		// return new ResponseEntity(payload, HttpStatus.OK);
		return new ResponseEntity(HttpStatus.OK);
	}

	// ****************************

	@GetMapping(value = "/valid")
	private FacebookTokenResponse facebookValidatetoken(@RequestParam("access_token") String token,
			@RequestParam("fields") String fields) {

		String uri = "https://graph.facebook.com/v10.0/me ?access_token=" + token + "&fields=" + fields;	

		 return restTemplate.getForObject(uri , FacebookTokenResponse.class);
	}
	
}
