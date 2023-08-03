package morningrolecall.heulgit.relation.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.relation.domain.Relation;
import morningrolecall.heulgit.relation.repository.RelationRepository;

@Service
@RequiredArgsConstructor
public class RelationService {

	private final RelationRepository relationRepository;

	public boolean checkFollowState(String from, String to) {
		return relationRepository.existsByFromIdAndToId(from, to);
	}

	@Transactional
	public void cancelFollow(String from, String to) {
		int deleteCount = relationRepository.deleteByFromIdAndToId(from, to);

		if (deleteCount == 0) {
			throw new RuntimeException("삭제할 정보가 없습니다.");
		}
	}

	@Transactional
	public void addFollow(String from, String to) {
		// 이미 팔로우 관계가 존재하면 아무 작업을 하지 않는다.
		if (relationRepository.existsByFromIdAndToId(from, to)) {
			return;
		}

		// 팔로우 관계가 존재하지 않는 경우 새로운 Relation 엔티티를 생성하여 저장한다.
		Relation relation = new Relation().builder()
			.fromId(from)
			.toId(to)
			.build();

		relationRepository.save(relation);
	}

	public List<String> getFollowers(String userId) {
		List<Relation> relations = relationRepository.findByToId(userId);
		return relations.stream().map(Relation::getFromId).collect(Collectors.toList());
	}

	public List<String> getFollowings(String userId) {
		List<Relation> relations = relationRepository.findByFromId(userId);
		return relations.stream().map(Relation::getToId).collect(Collectors.toList());
	}
}

