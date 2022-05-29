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
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public AtributesDto getAttributes() {
		return attributes;
	}
	public void setAttributes(AtributesDto attributes) {
		this.attributes = attributes;
	}
	

}
