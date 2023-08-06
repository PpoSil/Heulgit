package morningrolecall.heulgit.gm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.gm.repository.ChatRoomRepository;
import morningrolecall.heulgit.gm.service.ChatRoomService;

@RequiredArgsConstructor
@Controller
@RequestMapping("/gm")
public class ChatRoomController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final ChatRoomService chatRoomService;
	private final ChatRoomRepository chatRoomRepository;

	// 채팅 리스트 화면
	// 화면 반환 api 삭제 예정
	@GetMapping("/room")
	public String rooms(Model model) {
		return "/chat/room";
	}

	// 모든 채팅방 목록 반환
	// Todo : 자신의 githubID 어노테이션으로 자신의 채팅방 조회하는 로직 추가
	@GetMapping("/chatrooms/{githubId}")
	@ResponseBody
	public ResponseEntity<?> chatRoomList(@AuthenticationPrincipal String githubId) {
		logger.debug("chatRoomList(), githubId = {}", githubId);

		return ResponseEntity.ok().body(chatRoomRepository.findMyChatRooms(githubId));
	}

	// 채팅방 생성
	// Todo : 자신의 githubID 어노테이션으로 들고오는 코드 추가
	@PostMapping("/room")
	@ResponseBody
	public ResponseEntity<?> chatRoomAdd(@AuthenticationPrincipal String user1, @RequestParam String user2) {
		logger.info("chatRoomAdd(), user1 = {}, user2 = {}", user1, user2);

		chatRoomService.addChatRoom(user1, user2);

		return ResponseEntity.ok().body(chatRoomService.addChatRoom(user1, user2));
	}

	// 채팅방 입장 화면(삭제 예정)
	@GetMapping("/room/enter/{roomId}")
	public String roomDetail(Model model, @PathVariable String roomId) {
		model.addAttribute("roomId", roomId);
		logger.info("roomDetail(), roomId = {}", roomId);
		return "/chat/roomdetail";
	}

	//채팅 로그 가져오기
	@GetMapping("/chats/{roomId}")
	@ResponseBody
	public ResponseEntity<?> messageList(@PathVariable String roomId) {
		logger.debug("messageList(), roomId = {}", roomId);

		//입장한 채팅방의 topic을 생성한다.
		chatRoomService.enterChatRoom(roomId);

		// Redis에서 해당 채팅방의 채팅 로그를 가져와서 반환한다.
		return ResponseEntity.ok().body(chatRoomService.findMessage(roomId));
	}

	// 상대의 포르필에서 gm기능을 활성화시키면 채팅방이 있는지 확인한 후 접속
	// 없다면 채팅방 생성 후 접속
	@GetMapping("room/access")
	@ResponseBody
	public ResponseEntity<?> chatRoomDetail(@AuthenticationPrincipal String user1, @RequestParam String user2) {
		logger.debug("chatRoomDetail(), user1 = {}, user2  = {}", user1, user2);

		return ResponseEntity.ok().body(chatRoomService.findAndAddChatRoom(user1, user2));
	}

	@PostMapping("room/")
}
