// Chakra imports
import { Text, useColorModeValue } from '@chakra-ui/react';
import * as React from "react";
// Assets
import Project1 from 'assets/img/profile/Project1.png';
import Project2 from 'assets/img/profile/Project2.png';
import Project3 from 'assets/img/profile/Project3.png';
// Custom components
import Card from 'components/card/Card';
import Story from 'views/admin/profile/components/Story';

export default function Projects(props: { [x: string]: any }) {
	const { ...rest } = props;
	const [height, setHeight] = React.useState(window.innerHeight);

	React.useEffect(() => {
	  const handleResize = () => {
		setHeight(window.innerHeight - 120);
	  };
  
	  window.addEventListener("resize", handleResize);
	  return () => {
		window.removeEventListener("resize", handleResize);
	  };
	  handleResize();
	}, []);
  
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	return (
		<Card overflowY={'auto'} w={'100%'} height={`${height}px`} mb={{ base: '0px', '2xl': '20px' }} {...rest}>

			<Story
				boxShadow={cardShadow}
				mb='20px'
				image={Project1}
				ranking='1'
				link='#'
				title='Technology behind the BlockchainTechnology behind the BlockchainTechnology behind the BlockchainTechnology behind the Blockchain'
			/>
			<Story
				boxShadow={cardShadow}
				mb='20px'
				image={Project2}
				ranking='2'
				link='#'
				title='Greatest way to a good Economy'
			/>
			<Story
				boxShadow={cardShadow}
				image={Project3}
				ranking='3'
				link='#'
				title='Most essential tips for Burnout'
			/>
			<Story
				boxShadow={cardShadow}
				image={Project3}
				ranking='3'
				link='#'
				title='Most essential tips for Burnout'
			/>
			{/* <Story
				boxShadow={cardShadow}
				image={Project3}
				ranking='3'
				link='#'
				title='Most essential tips for Burnout'
			/>
			<Story
				boxShadow={cardShadow}
				image={Project3}
				ranking='3'
				link='#'
				title='Most essential tips for Burnout'
			/>
			<Story
				boxShadow={cardShadow}
				image={Project3}
				ranking='3'
				link='#'
				title='Most essential tips for Burnout'
			/>
			<Story
				boxShadow={cardShadow}
				image={Project3}
				ranking='3'
				link='#'
				title='Most essential tips for LAST ONE!'
			/> */}
		</Card>
	);
}
