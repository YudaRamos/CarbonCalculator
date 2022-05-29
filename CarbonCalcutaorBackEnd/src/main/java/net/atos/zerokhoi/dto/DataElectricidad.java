package net.atos.zerokhoi.dto;

import lombok.Data;

@Data
public class DataElectricidad {
	private String type = "electricity";
     private String electricity_unit;
     private Double electricity_value;
     private String country;
	
	
	
}
