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
	public Long getCo2e() {
		return co2e;
	}
	public void setCo2e(Long co2e) {
		this.co2e = co2e;
	}
	public String getCo2e_unit() {
		return co2e_unit;
	}
	public void setCo2e_unit(String co2e_unit) {
		this.co2e_unit = co2e_unit;
	}

}
