package com.korit.board.controller;

import com.korit.board.dto.OrderReqDto;
import com.korit.board.dto.ProductRespDto;
import com.korit.board.service.OrderService;
import com.korit.board.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StoreController {

	private final OrderService orderService;

	@PostMapping("/order")
public ResponseEntity<?> order(@RequestBody OrderReqDto orderReqDto) {
	return ResponseEntity.ok(orderService.order(orderReqDto));

	}
}
