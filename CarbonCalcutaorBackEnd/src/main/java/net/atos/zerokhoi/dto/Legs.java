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
	// private String class;
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public Integer getPassengers() {
		return passengers;
	}
	public void setPassengers(Integer passengers) {
		this.passengers = passengers;
	}
	
}
