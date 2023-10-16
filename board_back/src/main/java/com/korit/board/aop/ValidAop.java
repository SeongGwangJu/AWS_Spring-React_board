package com.korit.board.aop;

import com.korit.board.exception.ValidException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * AOP는 필터와 같은 역할
 * chain.dofilter() : 다음 필터로 넘어갔다가 다시 돌아와서 그 아래 문장을 실행 (재귀함수처럼)
 * dofilter 위에 있으면 전처리문 밑에 있으면 후처리문
 * 필터 안에는 매개변수로 chain 객체가 들어옴
 */
@Aspect
@Component
public class ValidAop {

	//controller 패키지에있는 모든 클래스의 모든 메소드, 매개변수는 상관 없다. 그 모든 메소드들 사이에 pointCut() 를 실행해라
//	@Pointcut("execution(* com.korit.board.controller.*.*(..))")

	@Pointcut("@annotation(com.korit.board.aop.annotation.ValidAop)")
	private void pointCut() {
	}

	@Around("pointCut()") /* 포인트 컷*/
	public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {

		Object[] args = proceedingJoinPoint.getArgs();
		BeanPropertyBindingResult bindingResult = null;

		for (Object arg : args) {
			//반복돌면서 있는지 확인, 있으면 대입
			if (arg.getClass() == BeanPropertyBindingResult.class) {
				bindingResult = (BeanPropertyBindingResult) arg;
				break;
			}
			System.out.println(arg.getClass());
		}

		if (bindingResult == null) {
			return proceedingJoinPoint.proceed();
		}

		if (bindingResult.hasErrors()) {
			Map<String, String> errorMap = new HashMap<>();
//			bindingResult.getFieldErrors()는 리턴타입: List(FieldError)이므로
			bindingResult.getFieldErrors().forEach(fieldError -> {
				//'필드명'과 '에러메시지'를 출력
				errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
			});
			//예외가 있으면 여기서 바로 예외처리. ExceptionControllerAdvice로 이동.
			throw new ValidException(errorMap);
		}

		//proceed() 메소드가 호출되기 전 : 전처리문
		System.out.println("전처리");
		Object target = proceedingJoinPoint.proceed(); //실제 메소드의 body. 메소드 호출 시점
		//proceed() 메소드가 호출된 후 : 후처리문
		System.out.println("후처리");
		System.out.println(target);
		return target;
	}
}
