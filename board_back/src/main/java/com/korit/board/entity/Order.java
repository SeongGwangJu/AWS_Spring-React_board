package com.korit.board.entity;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
	private int orderId;
	private int ProductId;
	private String email;
	private LocalDateTime orderDate;
}
