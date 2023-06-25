// chakra imports
import { Box, Flex, Stack,Text, Button } from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import Stories from 'views/admin/profile/components/Stories';
import { ItemContext } from 'contexts/SidebarContext';
import React from 'react';
// FUNCTIONS

function SidebarContent(props: { routes: RoutesType[] }) {
	const { routes } = props;
	const {setShowGenerateForm, setShowEditStory,setShowEditTask,setShowEditTestCase,setStoryId} = React.useContext(ItemContext);

	const handleCreateUserStory = (e: any,) => {
		setShowEditStory(true);
		setShowGenerateForm(true);
	}

	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />

			<Stack direction='column' mt='8px' mb='auto'>
				
				<Box alignItems={"center"} alignContent={"center"} ps='0px' pe={{ lg: '16px', '2xl': '16px' }}>
					{/* <Links routes={routes} /> */}
					<Text style={{textAlign: "center"}} alignItems={"middle"} alignContent={"center"} fontWeight='bold' fontSize='2xl' mt='10px' mb='4px'>
						User Stories
					</Text>
					<Button width={"100%"} padding={"8px"} alignItems={"center"} alignContent={"center"} onClick={(event) => handleCreateUserStory(event)}>Create New User Story</Button>
					<Stories></Stories>
				</Box>
			</Stack>

			{/* <Box ps='20px' pe={{ lg: '16px', '2xl': '20px' }} mt='60px' mb='40px' borderRadius='30px'>
				<SidebarCard />
			</Box> */}
		</Flex>
	);
}

export default SidebarContent;
