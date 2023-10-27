package com.korit.board.dto;

import com.korit.board.entity.Order;
import lombok.Data;

@Data
public class OrderReqDto {
	private int productId;
	private String email;

	public Order toOrderEntity() {
		return Order.builder()
				.ProductId(productId)
				.email(email)
				.build();
	}
}
