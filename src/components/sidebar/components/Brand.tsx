// Chakra imports
import { Flex, useColorModeValue,Text } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			{/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
			<Text fontSize={28}>WorkMan</Text>
			<HSeparator mb='0px' />
		</Flex>
	);
}

export default SidebarBrand;
