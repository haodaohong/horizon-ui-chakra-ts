// Chakra imports
import { Box, Button, Flex, Icon, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { MdEdit,MdDeleteForever } from 'react-icons/md';

export default function Project(props: {
	key: any;
	title: string;
	ranking: number | string;
	link: string;
	image: string;
	onEditClick: any;
	onTaskClick: any;
	onTestCaseClick: any;
	onDeleteClick: any;
	[x: string]: any;
}) {
	const { key, title, ranking, link, image, onDeleteClick, onEditClick, onTaskClick, onTestCaseClick, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const brandColor = useColorModeValue('brand.500', 'white');
	const bg = useColorModeValue('white', 'navy.700');

	const handleEditClick = (e: any,) => {
		e.preventDefault();
		onEditClick(e);
	} 

	const handleTaskClick = (e: any,) => {
		e.preventDefault();
		onTaskClick(e);
	} 

	const handleTestCaseClick = (e: any,) => {
		e.preventDefault();
		onTestCaseClick(e);
	} 

	const handleDeleteClick = (e: any,) => {
		e.preventDefault();
		onDeleteClick(e);
	}

	return (
		<Card bg={bg} {...rest} p='14px'>
			<Flex align='center' direction={{ base: 'column', md: 'row' }}>
				<Box mt={{ base: '10px', md: '0' }}>
				<Link variant='no-hover' me='16px' ms='auto' p='0px !important' onClick={(event) => handleEditClick(event)} >
					<Text color={textColorPrimary} fontWeight='500' fontSize='md' mb='4px'>
					{title}
					</Text>
				</Link>
					 
					
					<Text fontWeight='500' color={textColorSecondary} fontSize='sm' me='4px'>
						<Flex direction={{base: 'row'}} style={{marginTop: "15px"}}>
							<Button marginRight={2} onClick={(event) => handleTaskClick(event)}>Task</Button>
							<Button onClick={(event) => handleTestCaseClick(event)}>Test Case</Button>
						</Flex>
					</Text>
				</Box>
				<Link href={link} variant='no-hover' me='16px' ms='auto' p='0px !important' onClick={(event) => handleDeleteClick(event)}>
					<Icon as={MdDeleteForever} color='secondaryGray.500' h='18px' w='18px' />
				</Link>
			</Flex>
		</Card>
	);
}
