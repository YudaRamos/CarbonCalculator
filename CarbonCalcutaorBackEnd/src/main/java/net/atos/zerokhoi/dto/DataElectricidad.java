package net.atos.zerokhoi.dto;

import lombok.Data;

@Data
public class DataElectricidad {
	private String type = "electricity";
     private String electricity_unit;
     private Integer electricity_value;
     private String country;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getElectricity_unit() {
		return electricity_unit;
	}
	public void setElectricity_unit(String electricity_unit) {
		this.electricity_unit = electricity_unit;
	}
	public Integer getElectricity_value() {
		return electricity_value;
	}
	public void setElectricity_value(Integer electricity_value) {
		this.electricity_value = electricity_value;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
     
	
	
}
