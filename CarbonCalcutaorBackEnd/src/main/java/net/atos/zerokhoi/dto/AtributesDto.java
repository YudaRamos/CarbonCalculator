package net.atos.zerokhoi.dto;

import java.io.Serializable;

import lombok.Data;
@Data
public class AtributesDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer carbon_g;
	private Integer carbon_lb;
	private Integer carbon_kg;
	private Integer carbon_mt;
	public Integer getCarbon_g() {
		return carbon_g;
	}
	public void setCarbon_g(Integer carbon_g) {
		this.carbon_g = carbon_g;
	}
	public Integer getCarbon_lb() {
		return carbon_lb;
	}
	public void setCarbon_lb(Integer carbon_lb) {
		this.carbon_lb = carbon_lb;
	}
	public Integer getCarbon_kg() {
		return carbon_kg;
	}
	public void setCarbon_kg(Integer carbon_kg) {
		this.carbon_kg = carbon_kg;
	}
	public Integer getCarbon_mt() {
		return carbon_mt;
	}
	public void setCarbon_mt(Integer carbon_mt) {
		this.carbon_mt = carbon_mt;
	}

}
