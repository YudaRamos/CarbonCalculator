package net.atos.zerokhoi.dto;

import java.io.Serializable;

import lombok.Data;
@Data
public class DataDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private  String id;
	private String type;
	private AtributesDto attributes;
	

}
