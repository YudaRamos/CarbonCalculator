package net.atos.zerokhoi.dto;

import java.io.Serializable;

import lombok.Data;


@Data
public class RespuestaCalculoHuella implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long co2e;
	private String co2e_unit;	
	

}
