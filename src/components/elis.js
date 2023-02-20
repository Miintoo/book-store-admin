// // 프레젠터
// router.post(‘/create’, async (req, res) => {
//   const {order, orderItems} = req // 사용자 인풋에 대한 검증
//   if (orderItems.length === 0 ) throw new Error(‘상품이 없습니다.’)
//   const result = await createOrder(order, orderItems) // 비즈니스 로직 호출
//   return result.id // 호출결과 필터링해서 리턴
//   })

//   // 서비스
//   function createOrder(order, orderItems) { // 오더 생성 비즈니스 로직
//   const order = new OrderModel(order)
//   const savedOrder = await order.save()

//   const orderItmes = orderItems.map(orderItem => new OrderItemModel({
//       ...orderItem,
//       orderId: savedOrder.id
//   }))

//   for (const orderItem of orderItems) {
//       const savedORderItems = await orderItem.save()
//   }
//   return order

//   }

// 레포지토리 레이어 ORM(ODM) ~ OrderModel / OrderItemModel

//   디비 // 레포지토리

//   index ~ 디비와 연결하는 스크립트
//   모델
//   유저
//   주문
//   북
//   services // 서비스

//   userService
//   orderService
//   routers // 컨트롤러 프레젠터 레이어

//   userRouter
//   orderRouter
