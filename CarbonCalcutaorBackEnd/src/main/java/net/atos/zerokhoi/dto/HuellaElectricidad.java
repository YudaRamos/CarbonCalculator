package net.atos.zerokhoi.dto;

import java.io.Serializable;

import lombok.Data;
@Data
public class HuellaElectricidad implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private DataDto data;
	public DataDto getData() {
		return data;
	}
	public void setData(DataDto data) {
		this.data = data;
	}

}
