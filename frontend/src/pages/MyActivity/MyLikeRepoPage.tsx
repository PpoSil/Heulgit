import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import { colors } from '@constants/colors';
import FeedItemList from '@components/Home/FeedItemList';
import { images } from '@constants/images';
import { decodeUnicode } from '@utils/markdown';

const dummyFeedList = [
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: decodeUnicode(
			`IyBDYXJib24gVHJhY2tlcgoKPGEgaHJlZj0iaHR0cHM6Ly93d3cueW91dHVi\nZS5jb20vd2F0Y2g/dj12bXhsa2IxOGlHMCI+8J+TuiBZb3V0dWJlPC9hPgoK\nIyMg66qp7KCBCgrquLDtm4TsnITquLDsnZgg7KO865CcIOybkOyduOyduCDs\np4DqtazsmKjrgpztmZTrpbwg66eJ6riwIOychO2VnCwg7YOE7IaMIOygiOqw\nkOydgCDsnbTsoJwg7J2466WYIOyDneyhtOydhCDsnITtlZwg7ZWE7IiYIOya\nlOyGjOqwgCDrkJjsl4jri6QuCuydtOyXkCDrjIDsnZHtlZjsl6wg64yA6rWs\n7IucICoq7KO87YOdIOuLqOyngOuzhCDtg4Tshowg67Cw7Lac65+JIOuwjyDt\ng4Tshowg7Y+s7J247Yq466W8IOyYiOy4oSDrsI8g7Iuc6rCB7ZmUKirtlZjs\nl6wg6rCc7J247J2YIO2DhOyGjCDsoIjqsJDqs7wg6riw6rSA7J2YIOycoOyX\nsO2VnCDquLDtm4Qg64yA7J2R7J2EIOuPleqzoOyekCDtlZzri6QuCgojIyMg\n7YOE7IaMIOuwsOy2nOufiSDsuKHsoJUg67Cp67KVCgotIO2DhOyGjCDrsLDs\ntpzrn4koa2dDTzJlcS4pID0g7JeQ64SI7KeAIOyCrOyaqeufiSB4IOq1reqw\ngCDqs6DsnKAg7Jio7IukIOqwgOyKpCDrsLDstpwg6rOE7IiYCgogIC0g7KCE\n6riwIOyYqOyLpCDqsIDsiqQg67Cw7LacIOqzhOyImDogMC40NjYzKGt3aCkK\nICAtIOqwgOyKpCDsmKjsi6Qg6rCA7IqkIOuwsOy2nCDqs4TsiJg6IDIuMjIo\nbcKzKQogIC0g7IiY64+EIOyYqOyLpCDqsIDsiqQg67Cw7LacIOqzhOyImDog\nMC4zMzMyKG3CsykKCiMjIyDsmIjsg4Eg7YOE7IaMIO2PrOyduO2KuCDsuKHs\noJUg67Cp67KVCgotIOyghOuFhCDrj5nsnbwg7JuUIOuMgOu5hCDqsJDstpXr\npaDsl5Ag65Sw6528IO2PrOyduO2KuOulvCDrtoDsl6wKCiAgLSDqsJDstpXr\npaDsl5Ag65Sw66W4IO2PrOyduO2KuCDslpHsnYAgaHR0cHM6Ly9jcG9pbnQu\nb3Iua3IvIOywuOqzoAoKLSDrsJjquLDrs4Qg7JuU67OEIO2PrOyduO2KuCDt\nlansgrDtlZwg6rCS7J2EIOyYiOyDgSDtg4Tshowg7Y+s7J247Yq466GcIOy4\noeyglQoKIyMg66y47IScCgotIDxhIGhyZWY9J2h0dHBzOi8vZGVsaWNhdGUt\nc2x1Zy00MzIubm90aW9uLnNpdGUvMDY5MWUzZjhjYWY3NGYwNzgwYTliMzkz\nN2I5ODE0ZDQ/dj02MGJhNWJiOWIxMzA0YzdmOTdkM2Y1YjhkZWMzOGJiYic+\n7IKs7Jqp7J6QIOyalOq1rOyCrO2VrSDsoJXsnZjshJw8L2E+Ci0gPGEgaHJl\nZj0naHR0cHM6Ly9kZWxpY2F0ZS1zbHVnLTQzMi5ub3Rpb24uc2l0ZS83MDVl\nOGI4NTM5Yjg0YWE0OWFkYjNhMDcyY2U4MTUyNyc+7Jyg7Iqk7LyA7J207Iqk\nIOuqheyEuOyEnDwvYT4KLSA8YSBocmVmPSdodHRwczovL2RlbGljYXRlLXNs\ndWctNDMyLm5vdGlvbi5zaXRlL2YyNDRlZDRmNzE0ZDQ3Yzg4MmJmNmYwZmJl\nNGY2ZjkyJz7snbjthLDtjpjsnbTsiqQg7ISk6rOEPC9hPgoKIyMg7Iuc7Iqk\n7YWcIOyEpOqzhAoKIVtpbWFnZV0oaHR0cHM6Ly91c2VyLWltYWdlcy5naXRo\ndWJ1c2VyY29udGVudC5jb20vMzMyMDgyNDYvMTc1Nzc1MTYxLWExMjczODFi\nLTY4MTktNGQ5ZC1iYWM4LWZkYjdhNDFlMTI1ZS5wbmcpCgojIyDsp4Ttlokg\n7IOB7ZmpCgotIFtYXSDtlYTsmpTtlZwg6rO16rO1642w7J207YSwIOyImOyn\nkSDrsI8g6rCA6rO1Ci0gW1hdIOyjvO2DnSDri6jsp4Ag7JeQ64SI7KeAIOyg\nleuztCBBUEkg6rWs7ZiECi0gW1hdIOy5tOy5tOyYpCBtYXAg7Lu07Y+s64SM\n7Yq4IOq1rO2YhAotIFtYXSBEMyDsl5DrhIjsp4Ag7IKs7Jqp65+JIOyLnOqw\nge2ZlAotIFtYXSDrj4TroZzrqoUv67KV7KCV66qFIOyjvOyGjCDsooztkZwg\n67OA7ZmYIEFQSSDqtaztmIQKLSBbWF0gRWxhc3RpY3NlYXJjaCDsobDtmowg\n6riw64qlIOq1rO2YhCDrsI8g7Jew64+ZCi0gW1hdIOqysOy4oey5mCDrjbDs\nnbTthLAg64yA7LK0IOyVjOqzoOumrOymmCDqtaztmIQKLSBbWF0g6rKA7IOJ\nIOyVjOqzoOumrOymmCDqtaztmIQg67CPIOyngOuPhCDsl7Drj5kKLSBbWF0g\n7JeQ64SI7KeAIOyCrOyaqeufiSDthYzsnbTruJQg7Iuc6rCB7ZmUIAotIFtY\nXSDsmIjsg4Eg7YOE7IaMIO2PrOyduO2KuCDqs4TsgrAgU2VydmljZSDqtazt\nmIQKLSBbWF0g6riw7ZuEIOuNsOydtO2EsOulvCDthrXtlZwg7ZWY66OoIOyY\niOyDgSDtg4Tshowg67Cw7Lac65+JIOyYiOy4oSDrqqjrjbgg7IOd7ISxCi0g\nW1hdIOyYiOyDgSDtg4Tshowg7Y+s7J247Yq4L+2DhOyGjCDrsLDstpzrn4kg\n7Lu07Y+s64SM7Yq4IOq1rO2YhAotIFsgXSDthYzsiqTtjIUg67CPIOqwnOyE\noAoKPGltZyB3aWR0aD0iMTQ0MCIgYWx0PSJpbWFnZSIgc3JjPSJodHRwczov\nL3VzZXItaW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50LmNvbS8zMzIyMDQwNC8x\nNzA4MTA1NTAtM2M4ZWM5Y2QtMDE1Ny00MzJiLWEyYTgtMjUxMzFmYTc3MjQ0\nLnBuZyI+Cgo8aW1nIHdpZHRoPSIxNDQwIiBhbHQ9ImltYWdlIiBzcmM9Imh0\ndHBzOi8vdXNlci1pbWFnZXMuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzMzMjIw\nNDA0LzE3MDgxMDU4Mi0wNzA5NTY2OS0zNjA0LTQyNDctYjY0Zi0wNjlmNzA5\nMGYyM2EucG5nIj4KCjxpbWcgd2lkdGg9IjE0NDAiIGFsdD0iaW1hZ2UiIHNy\nYz0iaHR0cHM6Ly91c2VyLWltYWdlcy5naXRodWJ1c2VyY29udGVudC5jb20v\nMzMyMjA0MDQvMTcyMzk0NTI4LTkyYTQxZjkyLWFjZTYtNDUxYy04MDM0LTUz\nYTYwODYzYjM4ZS5wbmciPgoKPGltZyB3aWR0aD0iMTQ0MCIgYWx0PSJpbWFn\nZSIgc3JjPSJodHRwczovL3VzZXItaW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50\nLmNvbS8zMzIyMDQwNC8xNzIzOTQ2NDItZmExZmU1MTQtYzZhNC00MGUwLTlj\nMTktNGE3ZjJiZTk4NmZiLnBuZyI+CgojIyBDb250cmlidXRvcgoKW0dvLUph\nZWNoZW9sXShodHRwczovL2dpdGh1Yi5jb20vR28tSmFlY2hlb2wpCgpbS2lu\nZ0RvbmdneXVdKGh0dHBzOi8vZ2l0aHViLmNvbS9LaW5nRG9uZ2d5dSkKCltT\nZW9uZ3VrQmFla10oaHR0cHM6Ly9naXRodWIuY29tL1Nlb25ndWtCYWVrKQoK\nW3dvb25nLWphZV0oaHR0cHM6Ly9naXRodWIuY29tL3dvb25nLWphZSkKCg==\n`,
		),
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
];
// 여기까지

const StyledBox = styled.div`
	height: 100vh;
	@media (min-width: 768px) {
		display: flex;
		justify-content: center;
	}
`;

const StyledSideL = styled.div`
	height: 100vh;
	left: 0;
	position: fixed;

	@media (max-width: 767px) {
		display: none;
	}
	@media (min-width: 768px) {
		width: 124px;
		background-color: ${colors.primary.primaryLighten};
	}
	@media (min-width: 1200px) {
		width: 242px;
		background-color: ${colors.primary.primary};
	}
`;
const StyledSideR = styled.div`
	height: 100vh;
	right: 0;
	position: fixed;

	@media (max-width: 767px) {
		display: none;
	}
	@media (min-width: 768px) {
		width: 124px;
		background-color: ${colors.primary.primaryLighten};
	}
	@media (min-width: 1200px) {
		width: 242px;
		background-color: ${colors.primary.primary};
	}
`;
const StyledContent = styled.div`
	@media (min-width: 768px) {
		width: 500px;
	}
`;

const StyledHeader = styled.div`
	width: 100%;
	height: 60px;
	background-color: white;
`;

const StyledLikeRepo = styled.div`
	margin-top: -123px;
`;

const MyLikeRepoPage = () => {
	// 화면 사이즈별 타이틀 변환
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<StyledBox>
			<StyledSideL>
				<div>네비게이션</div>
			</StyledSideL>

			<StyledContent>
				<StyledHeader>
					{windowWidth <= 768 ? (
						<Header title={'좋아요 한 흘깃'}></Header>
					) : (
						<BigHeader title={'좋아요 한 흘깃'}></BigHeader>
					)}
				</StyledHeader>
				<StyledLikeRepo>
					<FeedItemList feedList={dummyFeedList} />
				</StyledLikeRepo>
			</StyledContent>

			<StyledSideR>
				<div>카테고리</div>
			</StyledSideR>
		</StyledBox>
	);
};

export default MyLikeRepoPage;
