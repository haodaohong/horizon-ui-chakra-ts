/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
// Assets
import Usa from 'assets/img/dashboards/usa.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from 'react-icons/md';
import CheckTable from 'views/admin/rtl/components/CheckTable';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
import CreateUserStory from './components/CreateUserStory';
import UserStoryResult from './components/UserStoryResult';
import UserTestCaseResult from './components/UserTestCaseResult';
import UserTaskResult from './components/UserTaskResult';
import React from 'react';
import { generateUserStory } from 'services';

export default function UserReports() {
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

		async function OnGenerateUserStory(){
			const endpoint = 'https://ai.api.1app.site/api/A_AIUserStory/Generate';
			const bodyRequest = {
				"who": "admin",
				"whatToDo": "login the web admin portal",
				"whyToDo": "need to view the list data",
				"acceptance": "can login"
			  };

			const controller = new AbortController();
			const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...({
					Authorization: `Bearer WM5ABA9E202D94C43ASW3CA6600F2BF77FWM`
				})
			},
			signal: controller.signal,
			body: JSON.stringify(bodyRequest),
			});
			if (!response.ok) {
				console.error(response.statusText);
				return;
			}
			const data = response.body;
			if (!data) {
				console.error(response.statusText);
				return;
			}
			const reader = data.getReader();
			const decoder = new TextDecoder();
			let done = false;
			let isFirst = true;
			let text = '';
			while (!done) {
			//   if (stopConversationRef.current === true) {
			// 	controller.abort();
			// 	done = true;
			// 	break;
			//   }
			  const { value, done: doneReading } = await reader.read();
			  done = doneReading;
			  const chunkValue = decoder.decode(value);
			  text += chunkValue;
			  console.log(text);
			  }
			}



	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			

			<SimpleGrid height={'100%'} columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				<CreateUserStory onGenerate={OnGenerateUserStory} />
				<UserStoryResult />
				<UserTaskResult />
				<UserTestCaseResult />
				
			</SimpleGrid>
		</Box>
	);
}
