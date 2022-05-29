package net.atos.zerokhoi.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Legs implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4093149109485672367L;
	private String from;
	private String to;
	private Integer passengers;
	//private String class;
}
