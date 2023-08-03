import { colors } from '@constants/colors';
import React, { useState } from 'react';
import { styled } from 'styled-components';

// 댓글 컨테이너
const StyledCommentComtainer = styled.div`
	display: flex;
	position: fixed;
	justify-content: space-evenly;
	align-items: center;

	bottom: 0;
	left: 0;
	right: 0;
	/* z-index: 1; */

	height: 50px;

	border-top: solid 1px ${colors.greyScale.grey3};
	background-color: #fff;
`;

// 프로필 이미지
const StyledProfileImg = styled.img`
	width: 30px;
	height: 30px;

	border-radius: 50%;
	background-color: #000000;
`;

const StyledCommentInputContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	width: 80%;
`;

// 댓글 input창
const StyledCommentInput = styled.input.attrs({
	maxLength: 50,
	placeholder: '댓글은 50자까지 입력이 가능합니다.',
})`
	border: solid 1px ${colors.greyScale.grey3};
	border-radius: 8px;

	padding: 0 40px 0 10px;
	width: 100%;
	height: 30px;

	font-size: 13px;
	font-weight: bold;
	color: ${colors.primary.primatyDark};
	white-space: nowrap;

	&:focus {
		outline: none;
		border: solid 1px ${colors.primary.primatyDark};
	}
`;

// 등록 버튼
const StyledRegisterButton = styled.button<{ $active: boolean }>`
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);

	border: none;
	background-color: transparent;

	color: ${({ $active }) =>
		$active ? colors.primary.primary : colors.greyScale.grey4};
	font-weight: bold;
	font-size: 13px;
`;

const CommentInput = () => {
	const [keyword, setKeyword] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (keyword.trim() !== '') {
				console.log('등록할 댓글:', keyword);
				setKeyword('');
			}
		}
	};

	const handleClick = () => {
		if (keyword.trim() !== '') {
			console.log('등록할 댓글:', keyword);
			setKeyword('');
		}
	};

	const isKeywordValid = keyword.trim().length > 0;

	return (
		<StyledCommentComtainer>
			<StyledProfileImg />
			<StyledCommentInputContainer>
				<StyledCommentInput
					value={keyword}
					onChange={handleChange}
					onKeyDown={handleEnter}
				/>
				<StyledRegisterButton $active={isKeywordValid} onClick={handleClick}>
					등록
				</StyledRegisterButton>
			</StyledCommentInputContainer>
		</StyledCommentComtainer>
	);
};

export default CommentInput;
