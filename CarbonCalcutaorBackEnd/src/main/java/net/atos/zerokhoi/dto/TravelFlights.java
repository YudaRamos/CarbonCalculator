package net.atos.zerokhoi.dto;

import java.io.Serializable;

import java.util.ArrayList;

import lombok.Data;


@Data
public class TravelFlights implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6199159449536137244L;
	private ArrayList<Legs> legs;
	public ArrayList<Legs> getLegs() {
		return legs;
	}
	public void setLegs(ArrayList<Legs> legs) {
		this.legs = legs;
	}
	
}
