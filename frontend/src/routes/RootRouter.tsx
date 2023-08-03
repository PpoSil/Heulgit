import CommitEditPage from '@pages/CommitEditPage';
import CommunityPage from '@pages/CommunityPage';
import LoginPage from '@pages/LoginPage';
import MainPage from '@pages/MainPage';
import MyActivityPage from '@pages/MyActivityPage';
import MyLikePostPage from '@pages/MyLikePostPage';
import MyLikeRepoPage from '@pages/MyLikeRepoPage';
import MyCommentPage from '@pages/MyCommentPage';
import NotFound from '@pages/NotFound';
import NotificationPage from '@pages/NotificationPage';
import ProfilePage from '@pages/ProfilePage';
import RepoViewPage from '@pages/RepoViewPage';
import SearchPage from '@pages/SearchPage';
import SearchResultPage from '@pages/SearchResultPage';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEurekaPostPage from '@pages/CreateEurekaPostPage';
import FreePostViewPage from '@pages/FreePostViewPage';
import CreateFreePostPage from '@pages/CreateFreePostPage';
import EurekaPostViewPage from '@pages/EurekaPostViewPage';
import LoginCallBackPage from '@pages/LoginCallBackPage';
import EurekaPage from '@pages/EurekaPage';
import FreeBoardPage from '@pages/FreeBoardPage';
import FollowPage from '@pages/FollowPage';
import LikeViewPage from '@pages/LikeViewPage';
import ChatDirectPage from '@pages/ChatDirectPage';
import ChatPage from '@pages/ChatPage';
import PrivateRoutes from './PrivateRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

const RootRouter = () => {
	const accessToken = useSelector((state: RootState) => state.auth.token);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/oauth/github" element={<LoginCallBackPage />}></Route>

				<Route
					element={
						<PrivateRoutes
							loginState={accessToken ? true : false}
							redirectTo="/login"
						/>
					}
				>
					<Route path="/" element={<MainPage />}></Route>
					<Route path="/profiles">
						<Route index element={<NotFound />}></Route>
						<Route path=":userId">
							<Route index element={<ProfilePage />}></Route>
							<Route path="activity" element={<MyActivityPage />}></Route>
							{/* <Route path="like" element={<MyLikePostPage />}></Route> */}
							<Route path="like-repo" element={<MyLikeRepoPage />}></Route>
							<Route path="like-post" element={<MyLikePostPage />}></Route>
							<Route path="like-comment" element={<MyCommentPage />}></Route>
							<Route path="commit-edit" element={<CommitEditPage />}></Route>
							<Route path="follow" element={<FollowPage />}></Route>
						</Route>
					</Route>
					<Route path="/community" element={<CommunityPage />}>
						<Route path="eureka" element={<EurekaPage />}></Route>
						<Route path="free" element={<FreeBoardPage />}></Route>
					</Route>
					<Route
						path="/community/eureka/post"
						element={<CreateEurekaPostPage />}
					></Route>
					<Route
						path="/community/free/post"
						element={<CreateFreePostPage />}
					></Route>
					<Route
						path="/community/eureka/:id"
						element={<EurekaPostViewPage />}
					></Route>
					<Route
						path="/community/eureka/:id/like"
						element={<LikeViewPage />}
					></Route>
					<Route
						path="/community/free/:id"
						element={<FreePostViewPage />}
					></Route>
					<Route
						path="/community/free/:id/like"
						element={<LikeViewPage />}
					></Route>
					<Route path="/notification" element={<NotificationPage />}></Route>
					<Route path="/gm">
						<Route index element={<ChatPage />}></Route>
						<Route path=":id" element={<ChatDirectPage />}></Route>
					</Route>
					<Route path="/repo">
						<Route index element={<NotFound />}></Route>
						<Route path=":repoId" element={<RepoViewPage />}></Route>
						<Route path=":repoId/like" element={<LikeViewPage />}></Route>
					</Route>
					<Route path="/search">
						<Route index element={<SearchPage />}></Route>
						<Route path=":q" element={<SearchResultPage />}></Route>
					</Route>
					<Route path="*" element={<NotFound />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RootRouter;
