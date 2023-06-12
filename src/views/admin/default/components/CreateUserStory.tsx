// Chakra imports
import { Box,FormErrorMessage,FormControl,FormHelperText, Button, Editable, EditablePreview, EditableTextarea, Flex, FormLabel, Icon, Input, Text, useColorModeValue, useBoolean, WrapItem, Heading } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import { SetStateAction, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from 'variables/charts';

export default function GenerateUserStory(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const [who, setWho] = useState('')
	const [whatToDo, setWhatToDo] = useState('')
	const [whyToDo, setWhyToDo] = useState('')
	const [acceptance, setAcceptance] = useState('')
	const handleWhoInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setWho(e.target.value)
	const handleWhatToDoInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setWhatToDo(e.target.value)
	const handleWhyToDoInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setWhyToDo(e.target.value)
	const handleAcceptanceInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setAcceptance(e.target.value)

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
	return (
		<Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
			<Flex  align='center' justify='space-between' w='100%' pe='20px' pt='5px'>
				<Heading m={"3"}>欢迎使用 WorkMan！</Heading>
			</Flex>
			<Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }}>
				<FormControl>
					<FormLabel>目标用户是谁？</FormLabel>
					<Input marginBottom={'5'}  value={who} onChange={handleWhoInputChange} colorScheme='facebook'/>
					<FormLabel>目标用户想做什么功能？</FormLabel>
					<Input marginBottom={'5'}  value={whatToDo} onChange={handleWhatToDoInputChange} />
					<FormLabel>用户为什么需要这些功能？</FormLabel>
					<Input marginBottom={'5'}  value={whyToDo} onChange={handleWhyToDoInputChange} />
					<FormLabel>验收标准有哪些？</FormLabel>
					<Input marginBottom={'5'}  value={acceptance} onChange={handleAcceptanceInputChange} />
					<Button onClick={()=>{if(!props.Generate){return;};props.Generate(who,whatToDo,whyToDo,acceptance);}} marginTop={'3'} colorScheme='facebook'>🪄 立即生成</Button>
				</FormControl>
			</Flex>
		</Card>
	);
}
