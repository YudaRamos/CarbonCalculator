package net.atos.zerokhoi.dto;

import lombok.Data;

@Data
public class TokenDto {
	private String value;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
