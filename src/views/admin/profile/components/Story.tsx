// Chakra imports
import { Box, Button, Flex, Icon, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { MdEdit } from 'react-icons/md';

export default function Project(props: {
	key: any;
	title: string;
	ranking: number | string;
	link: string;
	image: string;
	onEditClick: any;
	[x: string]: any;
}) {
	const { key, title, ranking, link, image, onEditClick, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const brandColor = useColorModeValue('brand.500', 'white');
	const bg = useColorModeValue('white', 'navy.700');

	const handleClick = (e: any,) => {
		e.preventDefault();
		onEditClick(e);
	} 

	return (
		<Card bg={bg} {...rest} p='14px'>
			<Flex align='center' direction={{ base: 'column', md: 'row' }}>
				<Box mt={{ base: '10px', md: '0' }}>
					<Text color={textColorPrimary} fontWeight='500' fontSize='md' mb='4px'>
					{/* {ranking} •  */}
					{title}
					</Text>
					<Text fontWeight='500' color={textColorSecondary} fontSize='sm' me='4px'>
						<Button marginRight={2}>Task</Button>
						<Button>Test Case</Button>
					</Text>
				</Box>
				<Link href={link} variant='no-hover' me='16px' ms='auto' p='0px !important' onClick={(event) => handleClick(event)}>
					<Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
				</Link>
			</Flex>
		</Card>
	);
}
