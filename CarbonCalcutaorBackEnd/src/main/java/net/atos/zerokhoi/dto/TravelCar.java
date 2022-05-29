package net.atos.zerokhoi.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;
@Data
public class TravelCar implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 6199159449536137244L;
	private String distance;
	private String vehicle;
	public String getDistance() {
		return distance;
	}
	public void setDistance(String distance) {
		this.distance = distance;
	}
	public String getVehicle() {
		return vehicle;
	}
	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}
	
}
