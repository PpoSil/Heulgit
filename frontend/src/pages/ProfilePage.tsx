import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Category from '@components/profile/Category';
import Navigation from '@components/common/Navigation';
import { useNavigate } from 'react-router-dom';
import MyFreeboard from '@components/profile/MyFreeboard';
import MyEureka from '@components/profile/MyEureka';
import MyProfile from '@components/profile/MyProfile';
import { images } from '@constants/images';
import { authHttp } from '@utils/http';
import { ChatRoomType } from '@typedef/gm/gm.types';

const StyledProfilePage = styled.div``;
const StyledProfileHigh = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
`;

const StyledUserProfile = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 150px;
`;

const StyledUserImage = styled.img`
	display: flex;
	justify-content: flex-start;
	background-color: black;
	height: 100px;
	width: 100px;
	border-radius: 50px;
`;

const StyledUserInformation = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
`;

const StyledActivityButton = styled.button`
	height: 25px;
	background-color: transparent;
	img {
		height: 25px;
	}
`;

const StyledProfileLow = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

const StyledFooter = styled.div`
	height: 70px;
`;

const deleteKeysFromSession = (keys: string[]) => {
	console.log('Deleting keys:', keys);
	keys.forEach((key) => sessionStorage.removeItem(key));
};

const ProfilePage: React.FC = () => {
	const navigation = useNavigate();

	const [selectedMenu, setSelectedMenu] = useState('');
	const handleMenuClick = (menu: '프로필' | '유레카' | '자유') => {
		setSelectedMenu(menu);
		sessionStorage.setItem('selectedMenu', menu);
	};

	const onClickMessage = useCallback(() => {
		console.log('채팅방 생성!');

		authHttp
			.get<ChatRoomType>('gm/room/access/Jungu12')
			.then((res) => {
				console.log('[채팅방 있는지 확인]', res);
				navigation(`/gm/${res.roomId}`, { state: { room: res } });
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		// selectedMenu가 변경될 때마다 sessionStorage에 저장.
		const categoryItem = sessionStorage.getItem('selectedMenu') as
			| '프로필'
			| '유레카'
			| '자유';

		if (categoryItem) {
			setSelectedMenu(categoryItem);
		} else {
			setSelectedMenu('프로필');
		}
	}, []);

	// 페이지 이동 시 세션 삭제 -> 다시 해당 페이지 이동 시 첫 화면 보이도록
	useEffect(() => {
		const keysToDelete = ['selectedMenu', 'selectedFollow'];

		if (window.location.pathname === '/profiles/1') {
			deleteKeysFromSession(keysToDelete);
		}
	}, []);

	return (
		<StyledProfilePage>
			<StyledProfileHigh>
				{' '}
				<StyledUserProfile>
					<StyledUserImage src={''} alt="user_profile" />
					<StyledUserInformation>
						<div>유저 이름</div>
						<div onClick={() => navigation('/profiles/1/follow')}>
							팔로잉 팔로워
						</div>
						<div>추가 정보</div>
						<button onClick={onClickMessage}>메시지 테스트 버튼</button>
					</StyledUserInformation>
				</StyledUserProfile>
				<StyledActivityButton
					onClick={() => navigation('/profiles/1/activity')}
				>
					<img src={images.menu} alt="내활동" />
				</StyledActivityButton>
			</StyledProfileHigh>
			<Category
				menu1={'프로필'}
				menuRouter1={() => handleMenuClick('프로필')}
				menu2={'유레카'}
				menuRouter2={() => handleMenuClick('유레카')}
				menu3={'자유'}
				menuRouter3={() => handleMenuClick('자유')}
				selectedMenu={selectedMenu} // Category 컴포넌트에 선택된 메뉴 이름을 전달
			/>
			{selectedMenu === '프로필' && (
				<StyledProfileLow>
					<MyProfile />
				</StyledProfileLow>
			)}
			{selectedMenu === '유레카' && (
				<StyledProfileLow>
					<MyEureka />
				</StyledProfileLow>
			)}
			{selectedMenu === '자유' && (
				<StyledProfileLow>
					<MyFreeboard />
				</StyledProfileLow>
			)}
			<StyledFooter>
				<Navigation />
			</StyledFooter>
		</StyledProfilePage>
	);
};

export default ProfilePage;
