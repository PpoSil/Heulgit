import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { HeulGitPostType } from '@typedef/home/heulgit.types';
import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MarkdownSummaryRenderer from './MarkdownSummaryRenderer';
import MarkdownRenderer from './MarkdownRenderer';

const StyledFeedItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 16px;
`;

const StyledTopLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledProfileContainer = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
	gap: 4px;
	margin-left: 12px;
`;

const StyledProfileImage = styled.img`
	width: 36px;
	height: 36px;
`;

const StyledUserMarker = styled.img`
	width: 25px;
	height: 25px;
`;

const StyledUpdateTime = styled.p`
	color: ${colors.greyScale.grey4};
	font-size: 12px;
	font-weight: 400;
	margin-right: 12px;
`;

const StyledContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 32px 12px 0px 12px;
`;

const StyledButtonContainer = styled.div`
	display: flex;
	margin: 24px 12px 0 12px;
	gap: 16px;

	img {
		height: 24px;
		width: 24px;
	}
`;

const StyledSubDataContainer = styled.div`
	display: flex;
	align-items: center;
	color: ${colors.greyScale.grey4};
	font-size: 12px;
	font-weight: 400;
	margin: 8px 12px 0 12px;
`;

type Props = {
	feed: HeulGitPostType;
	type: 'summary' | 'full';
};

const FeedItem = ({ feed, type }: Props) => {
	const navigation = useNavigate();

	return (
		<StyledFeedItemContainer>
			<StyledTopLine>
				<StyledProfileContainer>
					<StyledProfileImage src={feed.user.avater_url} alt="user_profile" />
					<p>{feed.user.id}</p>
					{feed.user.is_registered && (
						<StyledUserMarker src={images.userMark} alt="user_marker" />
					)}
				</StyledProfileContainer>
				<StyledUpdateTime>{feed.updated_date}</StyledUpdateTime>
			</StyledTopLine>
			<StyledContentContainer onClick={() => navigation(`/repo/${feed.id}`)}>
				{type === 'full' ? (
					<MarkdownRenderer text={feed.content} />
				) : (
					<MarkdownSummaryRenderer text={feed.content} />
				)}
			</StyledContentContainer>
			<StyledButtonContainer>
				<img src={images.like} alt="like_button" />
				<img src={images.chat} alt="comment_button" />
				<img src={images.share} alt="share_button" />
			</StyledButtonContainer>
			<StyledSubDataContainer>
				{`좋아요 ${feed.likes}개 · 댓글 ${feed.comments}개`}
			</StyledSubDataContainer>
		</StyledFeedItemContainer>
	);
};

export default FeedItem;
