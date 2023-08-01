import CommentList from '@components/Home/CommentList';
import FeedItem from '@components/Home/FeedItem';
import Header from '@components/common/Header';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { decodeUnicode } from '@utils/markdown';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

// 더미 게시물
const dummyFeed = {
	id: 1,
	name: '레전드 프로젝트',
	user: {
		id: 'bbing.pong',
		avater_url: images.dummy.dummy1,
		is_registered: true,
	},
	updated_date: '2023-07-24',
	content: decodeUnicode(
		`IyBBbGdvcml0aG0gU3R1ZHkK7L2U65Sp7YWM7Iqk7Yq47J2YIOqwleyekOqw\ngCDrkJjquLAg7JyE7ZWcIOyKpO2EsOuUlOyeheuLiOuLpC4KCioq7KCV6riw\nIO2ajOydmCoqIDog66ek7KO8IOuqqeyalOydvCDsoIDrhYEKCioq66eI6rCQ\nIOq4sO2VnCoqIDog66ek7KO8IOyImOyalOydvCDsmKTtm4QgNuyLnAotIOuy\njOq4iCA6IOusuOygnOuLuSA0MDAw7JuQICjrsozquIjsnYAg7KCc7J6R7KeE\n65Ok7J20IO2ajOyLneu5hOuhnCDrp5vsnojqsowg7IKs7Jqp7ZWgIOyYiOyg\nleyeheuLiOuLpC4pCgojIyDwn5GlIOywuOyXrOyekAo+IFtTZW9uZ3VrQmFl\na10oaHR0cHM6Ly9naXRodWIuY29tL1Nlb25ndWtCYWVrKQo+IAo+IFtKdW5n\ndTEyXShodHRwczovL2dpdGh1Yi5jb20vSnVuZ3UxMikKPiAKPiBba3NnMjM4\nOF0oaHR0cHM6Ly9naXRodWIuY29tL2tzZzIzODgpCj4gCj4gW1llYWhMaW1d\nKGh0dHBzOi8vZ2l0aHViLmNvbS9ZZWFoTGltKQo+IAo+IFt0bGFsc3duMjNd\nKGh0dHBzOi8vZ2l0aHViLmNvbS90bGFsc3duMjMpCj4gCj4gW0h5ZVddKGh0\ndHBzOi8vZ2l0aHViLmNvbS9IeWVXKSAtICjsobjsl4Xwn5Gp4oCN8J+OkykK\nCiMjIPCfkoHigI3imYLvuI8g7Iqk7YSw65SUIOq3nOy5mQojIyMg66y47KCc\nIO2SgOydtArrp6Tso7wgKio166y47KCcKirslKkg7ZW06rKw7ZWY6rOgLCDs\nmKTtlITrnbzsnbjsnLzroZwg7KeE7ZaJ65CY64qUICoq66as67ewIOyLnOqw\nhCoq7JeQIOydmOqyrOydhCDqs7XsnKDtlanri4jri6QuPGJyLz4K7ZW06rKw\n7ZWcIOusuOygnOydmCAqKu2SgOydtOyZgCDsvZTrk5wg7J6R7ISxIOydtOyc\noCoq66W8IOyemCDshKTrqoXtlaAg7IiYIOyeiOuPhOuhnSDtlanri4jri6Qu\nCgo+IOyekOyLoOydmCDsvZTrk5zripQg64iE6rWs67O064uk64+EIOyekOyL\noOydtCDqsIDsnqUg7J6YIOydtO2VtO2VoCDsiJgg7J6I7Ja07JW8IO2VqeuL\niOuLpC4K7ISk66qF6rO8IOqwgOuPheyEseydhCDsnITtlZwg6rmU64GU7ZWc\nIOyjvOyEneydhCDsnpgg7J6R7ISx7ZWgIOyImCDsnojrj4TroZ0g7ZWp7Iuc\n64ukIQoKIyMjIOumrOuTnOuvuCDqt5zsuZkK7IKs7Jqp7ZWcIOyVjOqzoOum\nrOymmCwg7KSR7JqUIOq1rO2YhCDroZzsp4Eg67CPIOyEpOuqhSwg7ZKA7J20\nIO2bhOq4sAoKIyMjIOy7pOuwiyDqt5zsuZkKMS4gKipSZXBvc2l0b3J5IGNs\nb25lKioKYGBgYmFzaApnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL1Nl\nb25ndWtCYWVrL2FsZ29TdHVkeS5naXQKYGBgCgoyLiAqKlJlcG9zaXRvcnkg\nb3BlbioqCi0gdnNjb2RlIG9yIEludGVsbGlKCgozLiAqKuuzuOyduOydmCBC\ncmFuY2gg7IOd7ISxKioKLSBicmFuY2jripQg7KO87LCo67OE66GcIOyDneyE\nse2VnOuLpC4KCmBgYGJhc2gKZ2l0IGNoZWNrb3V0IC1iIHvrs7jsnbjsnZgg\n6rmD7ZeI67iMIOydtOumhH0ve+yjvOywqOuqhX0KYGBgCj4gZXguIGdpdCBj\naGVja291dCAtYiBTVWJiYi8xd2VlawoKNC4gKirrrLjsoJzrs4Qg65SU66CJ\n7Yag66asIOyDneyEsSDrsI8g7L2U65OcLCBSRUFETUUg7KCA7J6lKioKYGBg\nCnvtlIzrnqvtj7x9L1t766y47KCcIOuyiO2YuH1dIHvrrLjsoJzrqoV9L+uz\nuOyduOydmCDquYPtl4jruIwg7J2066aECmBgYAo+IGV4LiBCT0ovWzE3NTld\nIOyVlO2YuCDrp4zrk6TquLAvU1ViYmIKCjUuICoqUHVzaCoqCmBgYGJhc2gK\nZ2l0IGFkZCAuCmdpdCBjb21taXQgLW0gInvso7zssKjrqoV9IDoge+2UjOue\nq+2PvH1be+usuOygnOuyiO2YuH1dIHvrrLjsoJzrqoV9IgpnaXQgcHVzaCBv\ncmlnaW4ge+yDneyEse2VnCDruIzrnpzsuZh9CmBgYAoKPiBleC4gZ2l0IGNv\nbW1pdCAtbSAiMXdlZWsgOiBCT0pbMTc1OV0g7JWU7Zi4IOunjOuTpOq4sCIK\nCjYuICoqUHVsbCByZXF1ZXN0IOyDneyEsSoqCi0gUHVsbCBSZXF1ZXN0IE5h\nbWUgOiB767O47J247J2YIOq5g+2XiOu4jCDsnbTrpoR9IDogW3vso7zssKjr\nqoV9XQogID4gZXguIFNVYmJiIDogWzF3ZWVrXQotIENvbnRlbnQgOiDrrLjs\noJzrqoUsIOyLnOqwhOuzteyeoeuPhCwg7Iuc6rCEIOuwjyDrqZTrqqjrpqwg\n7Lqh7LKYCi0gTGFiZWwgOiDtlIzrnqvtj7wsIOyWuOyWtAotIEFzc2lnbmVl\ncyA6IOuzuOyduAoKNy4gKirsiqTthLDrlJQg7ZqM7J2YIO2bhCwgbWVyZ2Uq\nKgoKIyMjIOumrOu3sCDqt5zsuZkK7Iqk7YSw65SUIOyLnOyekSDsoIQsIOuL\npOuluCDsgqzrnozsnZgg7L2U65Oc66W8IOuztOqzoCDsi6DrnoTtlZwg7Y+J\n6rCA7JmAIOy9lOupmO2KuOulvCDrtoDtg4Hrk5zrpr3ri4jri6QuCgo+ICoq\n7L2U65OcIOumrOu3sOuKlCDssL3qs7wg67Cp7Yyo7J2YIOyLuOybgC4qKgoK\nLS0tCiMjIPCfkrsg66y47KCcCjxkZXRhaWxzPjxzdW1tYXJ5PvCfk44gMuyb\nlCDrrLjsoJzsp5E8L3N1bW1hcnk+Cgp87KO87LCofDF8MnwzfDR8NXwKfDot\nLS06fDotLS06fDotLS06fDotLS06fDotLS06fDotLS06fAp8Kiox7KO87LCo\nKio8YnI+ICgwMS4yNSB+IDAxLjMxKXxb67aA65Ox7Zi4XShodHRwczovL3d3\ndy5hY21pY3BjLm5ldC9wcm9ibGVtLzI1MjkpfFvslZTtmLgg66eM65Ok6riw\nXShodHRwczovL3d3dy5hY21pY3BjLm5ldC9wcm9ibGVtLzE3NTkpfHwKfCoq\nMuyjvOywqCoqPGJyPiAoMDIuMDEgfiAwMi4wNyl8W+2FjO2KuOuhnOuvuOuF\nuF0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8xNDUwMCl8W+qw\nleydmOyLpCDrsLDsoJVdKGh0dHBzOi8vd3d3LmFjbWljcGMubmV0L3Byb2Js\nZW0vMTEwMDApfFvriIgg7LmY7Jqw6riwXShodHRwczovL3d3dy5hY21pY3Bj\nLm5ldC9wcm9ibGVtLzI2MjE1KXxb7JWU7Zi47IOd7ISx6riwXShodHRwczov\nL3N3ZXhwZXJ0YWNhZGVteS5jb20vbWFpbi9jb2RlL3Byb2JsZW0vcHJvYmxl\nbURldGFpbC5kbz9wcm9ibGVtTGV2ZWw9MyZjb250ZXN0UHJvYklkPUFWMTR1\nV2w2QUYwQ0ZBWUQmY2F0ZWdvcnlJZD1BVjE0dVdsNkFGMENGQVlEJmNhdGVn\nb3J5VHlwZT1DT0RFJnByb2JsZW1UaXRsZT0mb3JkZXJCeT1SRUNPTU1FTkRf\nQ09VTlQmc2VsZWN0Q29kZUxhbmc9SkFWQSZzZWxlY3QtMT0zJnBhZ2VTaXpl\nPTEwJnBhZ2VJbmRleD0yKXxb7ZaE67KE6rGwIOuLpOydtOyWtO2KuF0oaHR0\ncHM6Ly9zd2V4cGVydGFjYWRlbXkuY29tL21haW4vY29kZS9wcm9ibGVtL3By\nb2JsZW1EZXRhaWwuZG8/cHJvYmxlbUxldmVsPTMmY29udGVzdFByb2JJZD1B\nV1QtbFBCNmRIVURGQVZUJmNhdGVnb3J5SWQ9QVdULWxQQjZkSFVERkFWVCZj\nYXRlZ29yeVR5cGU9Q09ERSZwcm9ibGVtVGl0bGU9Jm9yZGVyQnk9UkVDT01N\nRU5EX0NPVU5UJnNlbGVjdENvZGVMYW5nPUpBVkEmc2VsZWN0LTE9MyZwYWdl\nU2l6ZT0xMCZwYWdlSW5kZXg9Mil8fAp8Kioz7KO87LCoKio8YnI+ICgwMi4w\nOCB+IDAyLjE1KXxb6rWs6rCEIO2VqSDqtaztlZjquLAgNV0oaHR0cHM6Ly93\nd3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8xMTY2MCl8W+2GoOuniO2GoF0oaHR0\ncHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS83NTc2KXxb67K9IOu2gOyI\nmOqzoCDsnbTrj5ntlZjquLBdKGh0dHBzOi8vd3d3LmFjbWljcGMubmV0L3By\nb2JsZW0vMjIwNil8W+u5hOuwgOuyiO2YuF0oaHR0cHM6Ly9zd2V4cGVydGFj\nYWRlbXkuY29tL21haW4vY29kZS9wcm9ibGVtL3Byb2JsZW1EZXRhaWwuZG8/\ncHJvYmxlbUxldmVsPTMmY29udGVzdFByb2JJZD1BVjE0X0RFS0FKY0NGQVlE\nJmNhdGVnb3J5SWQ9QVYxNF9ERUtBSmNDRkFZRCZjYXRlZ29yeVR5cGU9Q09E\nRSZwcm9ibGVtVGl0bGU9Jm9yZGVyQnk9UkVDT01NRU5EX0NPVU5UJnNlbGVj\ndENvZGVMYW5nPUpBVkEmc2VsZWN0LTE9MyZwYWdlU2l6ZT0xMCZwYWdlSW5k\nZXg9Myl8W+ywveyaqSDrp4jsnYQg66y066as7J2YIOqwnOyImF0oaHR0cHM6\nLy9zd2V4cGVydGFjYWRlbXkuY29tL21haW4vY29kZS9wcm9ibGVtL3Byb2Js\nZW1EZXRhaWwuZG8/cHJvYmxlbUxldmVsPTQmY29udGVzdFByb2JJZD1BV25n\nZlpWYTlYd0RGQVFVJmNhdGVnb3J5SWQ9QVduZ2ZaVmE5WHdERkFRVSZjYXRl\nZ29yeVR5cGU9Q09ERSZwcm9ibGVtVGl0bGU9Jm9yZGVyQnk9UEFTU19SQVRF\nJnNlbGVjdENvZGVMYW5nPUpBVkEmc2VsZWN0LTE9NCZwYWdlU2l6ZT0xMCZw\nYWdlSW5kZXg9NCYmJiYmJiYmJiYpfAp8Kio07KO87LCoKio8YnI+ICgwMi4x\nNiB+IDAyLjIyKXxb66y47J6Q7Je0IO2PreuwnF0oaHR0cHM6Ly93d3cuYWNt\naWNwYy5uZXQvcHJvYmxlbS85OTM1KXxb6rOg64Ol7J20XShodHRwczovL3d3\ndy5hY21pY3BjLm5ldC9wcm9ibGVtLzE2NDcyKXxb6rCA64ql7ZWcIOyLnO2X\nmCDsoJDsiJhdKGh0dHBzOi8vc3dleHBlcnRhY2FkZW15LmNvbS9tYWluL2Nv\nZGUvcHJvYmxlbS9wcm9ibGVtRGV0YWlsLmRvP3Byb2JsZW1MZXZlbD00JmNv\nbnRlc3RQcm9iSWQ9QVdIUGtxQnFBRXNERkFVbiZjYXRlZ29yeUlkPUFXSFBr\ncUJxQUVzREZBVW4mY2F0ZWdvcnlUeXBlPUNPREUmcHJvYmxlbVRpdGxlPSZv\ncmRlckJ5PVJFQ09NTUVORF9DT1VOVCZzZWxlY3RDb2RlTGFuZz1KQVZBJnNl\nbGVjdC0xPTQmcGFnZVNpemU9MTAmcGFnZUluZGV4PTEmJiYmJiYmJiYmKXxb\n67Cw7Je0IOuPjOumrOq4sCA0XShodHRwczovL3d3dy5hY21pY3BjLm5ldC9w\ncm9ibGVtLzE3NDA2KXxb7YyM7J207ZSEIOyYruq4sOq4sCAxXShodHRwczov\nL3d3dy5hY21pY3BjLm5ldC9wcm9ibGVtLzE3MDcwKXwKfCoqNeyjvOywqCoq\nPGJyPiAoMDIuMjMgfiAwMy4wMSl8W+yXsOq1rOyGjF0oaHR0cHM6Ly93d3cu\nYWNtaWNwYy5uZXQvcHJvYmxlbS8xNDUwMil8W+qwgOyKpOq0gF0oaHR0cHM6\nLy93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8yOTMxKXxb7Iu47JuA65WFXSho\ndHRwczovL3d3dy5jb2RldHJlZS5haS90cmFpbmluZy1maWVsZC9mcmVxdWVu\ndC1wcm9ibGVtcy9iYXR0bGUtZ3JvdW5kL2Rlc2NyaXB0aW9uP3BhZ2U9MyZw\nYWdlU2l6ZT0yMCZ1c2VybmFtZT1ic3UxMjA5KXxbMjA0OCAoRWFzeSldKGh0\ndHBzOi8vd3d3LmFjbWljcGMubmV0L3Byb2JsZW0vMTIxMDApfFvsoJDsi6wg\n7Iud7IKs7Iuc6rCEXShodHRwczovL3N3ZXhwZXJ0YWNhZGVteS5jb20vbWFp\nbi9jb2RlL3Byb2JsZW0vcHJvYmxlbURldGFpbC5kbz9jb250ZXN0UHJvYklk\nPUFWNS1CRUU2QUswREZBVmwmKXx8Cgo8L2RldGFpbHM+Cgo8ZGV0YWlscz48\nc3VtbWFyeT7wn5OOIDPsm5Qg66y47KCc7KeRPC9zdW1tYXJ5PgoKfOyjvOyw\nqHwxfDJ8M3w0fDV8Cnw6LS0tOnw6LS0tOnw6LS0tOnw6LS0tOnw6LS0tOnw6\nLS0tOnwKfCoqMeyjvOywqCoqPGJyPiAoMDMuMDIgfiAwMy4wOCl8W+ygkO2U\nhF0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8xODkwKXxb7Ja0\n66W4IOyDgeyWtF0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8x\nOTIzNyl8W+yDieyiheydtCDrtpnsnbTquLBdKGh0dHBzOi8vd3d3LmFjbWlj\ncGMubmV0L3Byb2JsZW0vMTcxMzYpfFvqsozrpqzrp6jrjZTrp4EgMl0oaHR0\ncHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8xNzc3OSl8W+yngeyCrOqw\nge2YlV0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8yNTI3KXwK\nfCoqMuyjvOywqCoqPGJyPiAoMDMuMDkgfiAwMy4xNSl8W+upgOypoe2VnCDs\ngqzqsIHtmJVdKGh0dHBzOi8vc2Nob29sLnByb2dyYW1tZXJzLmNvLmtyL2xl\nYXJuL2NvdXJzZXMvMzAvbGVzc29ucy82MjA0OCl8W+2DneuwsOyDgeyekF0o\naHR0cHM6Ly9zY2hvb2wucHJvZ3JhbW1lcnMuY28ua3IvbGVhcm4vY291cnNl\ncy8zMC9sZXNzb25zLzEzMTcwNCl8W+y9lOuUqe2FjOyKpO2KuCDqs7XrtoBd\nKGh0dHBzOi8vc2Nob29sLnByb2dyYW1tZXJzLmNvLmtyL2xlYXJuL2NvdXJz\nZXMvMzAvbGVzc29ucy8xMTg2NjgpfFvrk7HsgrDsvZTsiqQg7KCV7ZWY6riw\nXShodHRwczovL3NjaG9vbC5wcm9ncmFtbWVycy5jby5rci9sZWFybi9jb3Vy\nc2VzLzMwL2xlc3NvbnMvMTE4NjY5KXxb67Cp6riI6re46rOhXShodHRwczov\nL3NjaG9vbC5wcm9ncmFtbWVycy5jby5rci9sZWFybi9jb3Vyc2VzLzMwL2xl\nc3NvbnMvMTc2ODMpfAp8Kioz7KO87LCoKio8YnI+ICgwMy4xNiB+IDAzLjIy\nKXxb66eI67KV7J2YIOyXmOumrOuyoOydtO2EsF0oaHR0cHM6Ly9zY2hvb2wu\ncHJvZ3JhbW1lcnMuY28ua3IvbGVhcm4vY291cnNlcy8zMC9sZXNzb25zLzE0\nODY1Myl8W+uvuOuhnCDtg4jstpxdKGh0dHBzOi8vc2Nob29sLnByb2dyYW1t\nZXJzLmNvLmtyL2xlYXJuL2NvdXJzZXMvMzAvbGVzc29ucy8xNTk5OTMpfFvt\nkZztmIQg6rCA64ql7ZWcIOydtOynhO2KuOumrF0oaHR0cHM6Ly9zY2hvb2wu\ncHJvZ3JhbW1lcnMuY28ua3IvbGVhcm4vY291cnNlcy8zMC9sZXNzb25zLzE1\nMDM2Nyl8W+2GseuLiOuwlO2AtF0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQv\ncHJvYmxlbS8xNDg5MSl8W+y9lOuTnO2KuOumrCDrubVdKGh0dHBzOi8vd3d3\nLmNvZGV0cmVlLmFpL3RyYWluaW5nLWZpZWxkL2ZyZXF1ZW50LXByb2JsZW1z\nL2NvZGV0cmVlLW1vbi1icmVhZC9kZXNjcmlwdGlvbj9wYWdlPTMmcGFnZVNp\nemU9MjAmdXNlcm5hbWU9KXwKfCoqNOyjvOywqCoqPGJyPiAoMDMuMjMgfiAw\nMy4yOSl8W+yKpO2LsOy7pF0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJv\nYmxlbS85NDY1KXxb7Yq466asXShodHRwczovL3d3dy5hY21pY3BjLm5ldC9w\ncm9ibGVtLzQ4MDMpfFvsnbjqtawg7J2064+ZXShodHRwczovL3d3dy5hY21p\nY3BjLm5ldC9wcm9ibGVtLzE2MjM0KXxb67GAXShodHRwczovL3d3dy5hY21p\nY3BjLm5ldC9wcm9ibGVtLzMxOTApfFvqvKzrpqzsnqHquLDrhoDsnbRdKGh0\ndHBzOi8vd3d3LmNvZGV0cmVlLmFpL3RyYWluaW5nLWZpZWxkL2ZyZXF1ZW50\nLXByb2JsZW1zL3RhaWwtY2F0Y2gtcGxheS9kZXNjcmlwdGlvbj9wYWdlPTMm\ncGFnZVNpemU9MjAmdXNlcm5hbWU9KXx8Cgo8L2RldGFpbHM+Cgo8ZGV0YWls\ncz48c3VtbWFyeT7wn5OOIDTsm5Qg66y47KCc7KeRPC9zdW1tYXJ5PgoKfOyj\nvOywqHwxfDJ8M3w0fDV8Cnw6LS0tOnw6LS0tOnw6LS0tOnw6LS0tOnw6LS0t\nOnw6LS0tOnwKfCoqMeyjvOywqCoqPGJyPiAoMDMuMzAgfiAwNC4xMil8W+yg\nleyImCDsgrzqsIHtmJVdKGh0dHBzOi8vd3d3LmFjbWljcGMubmV0L3Byb2Js\nZW0vMTkzMil8W+uxgOqzvCDsgqzri6Trpqwg6rKM7J6EXShodHRwczovL3d3\ndy5hY21pY3BjLm5ldC9wcm9ibGVtLzE2OTI4KXxb7Yq466as7J2YIOyngOum\nhF0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8xMTY3KXxb66+4\n7IS466i87KeAIOyViOuFlSFdKGh0dHBzOi8vd3d3LmFjbWljcGMubmV0L3By\nb2JsZW0vMTcxNDQpfFvtjKnrp6hdKGh0dHBzOi8vd3d3LmNvZGV0cmVlLmFp\nL3RyYWluaW5nLWZpZWxkL2ZyZXF1ZW50LXByb2JsZW1zL3BhY21hbi9kZXNj\ncmlwdGlvbj9wYWdlPTMmcGFnZVNpemU9MjAmdXNlcm5hbWU9KXwKfCoqMuyj\nvOywqCoqPGJyPiAoMDQuMTMgfiAwNC4xOSl8W+yVhOq4sCDsg4HslrRdKGh0\ndHBzOi8vd3d3LmFjbWljcGMubmV0L3Byb2JsZW0vMTYyMzYpfFtEU0xSXSho\ndHRwczovL3d3dy5hY21pY3BjLm5ldC9wcm9ibGVtLzkwMTkpfFvtirjrpqzs\nnZgg7Iic7ZqMXShodHRwczovL3d3dy5hY21pY3BjLm5ldC9wcm9ibGVtLzIy\nNjMpfFvsm5ztmYBdKGh0dHBzOi8vd3d3LmFjbWljcGMubmV0L3Byb2JsZW0v\nMTg2NSl8W+uwqeusuCDquLjsnbRdKGh0dHBzOi8vc2Nob29sLnByb2dyYW1t\nZXJzLmNvLmtyL2xlYXJuL2NvdXJzZXMvMzAvbGVzc29ucy80OTk5NCl8Cnwq\nKjPso7zssKgqKjxicj4gKDA0LjIwIH4gMDQuMjYpfFsyw5duIO2DgOydvOun\ngV0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8xMTcyNil8W+y1\nnOuMgCDtnpldKGh0dHBzOi8vd3d3LmFjbWljcGMubmV0L3Byb2JsZW0vMTEy\nNzkpfFvsiKjrsJTqvK3sp4ggM10oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQv\ncHJvYmxlbS8xMzU0OSl8W+2bhOychCDtkZzquLDsi51dKGh0dHBzOi8vd3d3\nLmFjbWljcGMubmV0L3Byb2JsZW0vMTkxOCl8W+yWkeq2geuMgO2ajF0oaHR0\ncHM6Ly9zY2hvb2wucHJvZ3JhbW1lcnMuY28ua3IvbGVhcm4vY291cnNlcy8z\nMC9sZXNzb25zLzkyMzQyKXwKfCoqNOyjvOywqCoqPGJyPiAoMDQuMjcgfiAw\nNS4wMyl8W+y1nOqzoOydmCDsp5HtlaldKGh0dHBzOi8vc2Nob29sLnByb2dy\nYW1tZXJzLmNvLmtyL2xlYXJuL2NvdXJzZXMvMzAvbGVzc29ucy8xMjkzOCl8\nW+uVheuUsOuoueq4sF0oaHR0cHM6Ly9zY2hvb2wucHJvZ3JhbW1lcnMuY28u\na3IvbGVhcm4vY291cnNlcy8zMC9sZXNzb25zLzEyOTEzKXxb7KO87LCoIOya\nlOq4iCDqs4TsgrBdKGh0dHBzOi8vc2Nob29sLnByb2dyYW1tZXJzLmNvLmty\nL2xlYXJuL2NvdXJzZXMvMzAvbGVzc29ucy85MjM0MSl8W+yhsOydtOyKpO2L\nsV0oaHR0cHM6Ly9zY2hvb2wucHJvZ3JhbW1lcnMuY28ua3IvbGVhcm4vY291\ncnNlcy8zMC9sZXNzb25zLzQyODYwKXxb7YOd67CwIOuwsOuLrOqzvCDsiJjq\nsbDtlZjquLBdKGh0dHBzOi8vc2Nob29sLnByb2dyYW1tZXJzLmNvLmtyL2xl\nYXJuL2NvdXJzZXMvMzAvbGVzc29ucy8xNTAzNjkpfHwKCjwvZGV0YWlscz4K\nCjxkZXRhaWxzPjxzdW1tYXJ5PvCfk44gNeyblCDrrLjsoJzsp5E8L3N1bW1h\ncnk+Cgp87KO87LCofDF8MnwzfDR8NXwKfDotLS06fDotLS06fDotLS06fDot\nLS06fDotLS06fDotLS06fAp8Kiox7KO87LCoKio8YnI+ICgwNS4wNCB+IDA1\nLjEwKXxb7Zi87J6Q7IScIO2VmOuKlCDti7Htg53thqBdKGh0dHBzOi8vc2No\nb29sLnByb2dyYW1tZXJzLmNvLmtyL2xlYXJuL2NvdXJzZXMvMzAvbGVzc29u\ncy8xNjA1ODUpfFvtmLzsnpAg64aA6riw7J2YIOuLrOyduF0oaHR0cHM6Ly9z\nY2hvb2wucHJvZ3JhbW1lcnMuY28ua3IvbGVhcm4vY291cnNlcy8zMC9sZXNz\nb25zLzEzMTEzMCl8W+q0keusvCDsupDquLBdKGh0dHBzOi8vc2Nob29sLnBy\nb2dyYW1tZXJzLmNvLmtyL2xlYXJuL2NvdXJzZXMvMzAvbGVzc29ucy8xNzI5\nMjcpfFvtlonroKwg7YWM65GQ66asIO2ajOyghO2VmOq4sF0oaHR0cHM6Ly9z\nY2hvb2wucHJvZ3JhbW1lcnMuY28ua3IvbGVhcm4vY291cnNlcy8zMC9sZXNz\nb25zLzc3NDg1KXxb7Jew7IaNIO2OhOyKpCDrtoDrtoQg7IiY7Je07J2YIO2V\nqV0oaHR0cHM6Ly9zY2hvb2wucHJvZ3JhbW1lcnMuY28ua3IvbGVhcm4vY291\ncnNlcy8zMC9sZXNzb25zLzE2MTk4OCl8CnwqKjLso7zssKgqKjxicj4gKDA1\nLjExIH4gMDUuMTcpfFvrlJTtjpzsiqQg6rKM7J6EXShodHRwczovL3NjaG9v\nbC5wcm9ncmFtbWVycy5jby5rci9sZWFybi9jb3Vyc2VzLzMwL2xlc3NvbnMv\nMTQyMDg1KXxb66as7L2U7LOHIOuhnOu0h10oaHR0cHM6Ly9zY2hvb2wucHJv\nZ3JhbW1lcnMuY28ua3IvbGVhcm4vY291cnNlcy8zMC9sZXNzb25zLzE2OTE5\nOSl8W+yalOqyqSDsi5zsiqTthZxdKGh0dHBzOi8vc2Nob29sLnByb2dyYW1t\nZXJzLmNvLmtyL2xlYXJuL2NvdXJzZXMvMzAvbGVzc29ucy8xODExODgpfFvs\nnbjsgqwg6rOg6rO8XShodHRwczovL3NjaG9vbC5wcm9ncmFtbWVycy5jby5r\nci9sZWFybi9jb3Vyc2VzLzMwL2xlc3NvbnMvMTUyOTk1KXxb6rK97KO866Gc\nIOqxtOyEpF0oaHR0cHM6Ly9zY2hvb2wucHJvZ3JhbW1lcnMuY28ua3IvbGVh\ncm4vY291cnNlcy8zMC9sZXNzb25zLzY3MjU5KXwKfCoqM+yjvOywqCoqPGJy\nPiAoMDUuMTggfiAwNS4zMSl8W+2UvOumrCDrtoDripQg7IKs64KY7J20XSho\ndHRwczovL3d3dy5hY21pY3BjLm5ldC9wcm9ibGVtLzE2NzI0KXxbUkdC6rGw\n66asIDJdKGh0dHBzOi8vd3d3LmFjbWljcGMubmV0L3Byb2JsZW0vMTc0MDQp\nfFvqsJzrmKXrsozroIhdKGh0dHBzOi8vd3d3LmFjbWljcGMubmV0L3Byb2Js\nZW0vMzAyMCl8W+2VtO2CuV0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJv\nYmxlbS8xMDI4Mil8W+yekeyXhV0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQv\ncHJvYmxlbS8yMDU2KXx8Cgo8L2RldGFpbHM+Cgo8ZGV0YWlscz48c3VtbWFy\neT7wn5OOIDbsm5Qg66y47KCc7KeRPC9zdW1tYXJ5PgoKfOyjvOywqHwxfDJ8\nM3w0fDV8Cnw6LS0tOnw6LS0tOnw6LS0tOnw6LS0tOnw6LS0tOnw6LS0tOnwK\nfCoqMeyjvOywqCoqPGJyPiAoMDYuMDggfiAwNi4xNCl8W+2PrOuPhOyjvCDs\ni5zsi51dKGh0dHBzOi8vd3d3LmFjbWljcGMubmV0L3Byb2JsZW0vMjE1Nil8\nW+uyvSDrtoDsiJjqs6Ag7J2064+Z7ZWY6riwIDRdKGh0dHBzOi8vd3d3LmFj\nbWljcGMubmV0L3Byb2JsZW0vMTY5NDYpfFvtjIzti7BdKGh0dHBzOi8vd3d3\nLmFjbWljcGMubmV0L3Byb2JsZW0vMTIzOCl8W+2UvOuztOuCmOy5mCDsiJgg\nNl0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8xMTQ0NCl8W+yY\ngeyasOuKlCDsgqzquLDqvrw/XShodHRwczovL3d3dy5hY21pY3BjLm5ldC9w\ncm9ibGVtLzE0Njc2KXwKfCoqMuyjvOywqCoqPGJyPiAoMDYuMTUgfiAwNi4y\nMSl8W+yjvOyLneqwgOqyqV0oaHR0cHM6Ly9zY2hvb2wucHJvZ3JhbW1lcnMu\nY28ua3IvbGVhcm4vY291cnNlcy8zMC9sZXNzb25zLzQyNTg0KXxb66y07J24\n64+EIOyXrO2WiV0oaHR0cHM6Ly9zY2hvb2wucHJvZ3JhbW1lcnMuY28ua3Iv\nbGVhcm4vY291cnNlcy8zMC9sZXNzb25zLzE1NDU0MCl8W+2RnCDrs5Htlald\nKGh0dHBzOi8vc2Nob29sLnByb2dyYW1tZXJzLmNvLmtyL2xlYXJuL2NvdXJz\nZXMvMzAvbGVzc29ucy8xNTAzNjYpfFvqs6jrqqkg64yA7J6lIO2YuOyEnSAt\nIOq4sOuKpeyEsV0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8y\nMDE2OCl8W+usuOyekOyXtCDsp4DsmKXsl5Ag67mg7KeEIO2YuOyEnV0oaHR0\ncHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8yMDE2Nil8fAp8Kioz7KO8\n7LCoKio8YnI+ICgwNi4yMiB+IDA2LjI5KXxb6reA7Jes7Jq0IOudvOydtOyW\nuF0oaHR0cHM6Ly93d3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8xNTU2NSl8W+qw\ngOyepSDqsIDquYzsmrQg6rO17Ya1IOyhsOyDgV0oaHR0cHM6Ly93d3cuYWNt\naWNwYy5uZXQvcHJvYmxlbS8zNTg0KXxb6rCc6re87IOBXShodHRwczovL3d3\ndy5hY21pY3BjLm5ldC9wcm9ibGVtLzE1NjMpfFvtko3shKAg7YSw7Yq466as\n6riwXShodHRwczovL3NjaG9vbC5wcm9ncmFtbWVycy5jby5rci9sZWFybi9j\nb3Vyc2VzLzMwL2xlc3NvbnMvNjg2NDYpfFvtmLjthZQg64yA7IukXShodHRw\nczovL3NjaG9vbC5wcm9ncmFtbWVycy5jby5rci9sZWFybi9jb3Vyc2VzLzMw\nL2xlc3NvbnMvMTU1NjUxKXx8Cgo8L2RldGFpbHM+Cgrwn5aH77iPIDfsm5Qg\n66y47KCc7KeRCnzso7zssKh8MXwyfDN8NHwKfDotLS06fDotLS06fDotLS06\nfDotLS06fDotLS06fAp8Kiox7KO87LCoKio8YnI+ICgwNy4xMyB+IDA3LjE5\nKXxb66eQ7J20IOuQmOqzoO2UiCDsm5DsiK3snbRdKGh0dHBzOi8vd3d3LmFj\nbWljcGMubmV0L3Byb2JsZW0vMTYwMCl8W+uniOuyleyCrCDsg4HslrTsmYAg\n7YyM7J207Ja07Iqk7YawXShodHRwczovL3d3dy5hY21pY3BjLm5ldC9wcm9i\nbGVtLzIwMDU4KXxb6rO87KCcXShodHRwczovL3d3dy5hY21pY3BjLm5ldC9w\ncm9ibGVtLzEzOTA0KXxb7Zy06rKM7IaMIOyEuOyasOq4sF0oaHR0cHM6Ly93\nd3cuYWNtaWNwYy5uZXQvcHJvYmxlbS8xNDc3KXx8Cg==\n`,
	),
	likes: 1000,
	comments: 13,
};

// 더미 댓글
const dummyComment = [
	{
		id: 123,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '@jungu12 이거 참고해',
		updated_date: '36분 전',
		parent_id: 12,
		order: 1,
	},
	{
		id: 123,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '@jungu12 싫엉',
		updated_date: '38분 전',
		parent_id: 12,
		order: 1,
	},
];

const FeedItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 60px;
`;

const StyledViewContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Separation = styled.div`
	background-color: ${colors.greyScale.grey3};
	width: 100%;
	height: 1px;
	margin-top: 20px;
`;

const RepoViewPage = () => {
	const navigation = useNavigate();

	return (
		<StyledViewContainer>
			<Header
				title={dummyFeed.name}
				onClickBackButton={() => {
					navigation('/');
				}}
			/>
			<FeedItemContainer>
				<FeedItem feed={dummyFeed} type="full" />
			</FeedItemContainer>

			<Separation />
			<CommentList comments={dummyComment} />
		</StyledViewContainer>
	);
};

export default RepoViewPage;
