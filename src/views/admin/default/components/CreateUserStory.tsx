// Chakra imports
import { Box,FormErrorMessage,FormControl,FormHelperText, Button, Editable, EditablePreview, EditableTextarea, Flex, FormLabel, Icon, Input, Text, useColorModeValue, useBoolean, WrapItem, Heading, Switch, VStack } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import { ItemContext } from 'contexts/SidebarContext';
import { SetStateAction, useContext, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from 'variables/charts';

export default function GenerateUserStory(props: { [x: string]: any }) {
	const { ...rest } = props;
	const [disableGenerate, setDisableGenerate] = useState(false);
	const [disableGenerateText, setDisableGenerateText] = useState('Generate');
  
	// Chakra Color Mode
	const [who, setWho] = useState('')
	const [whatToDo, setWhatToDo] = useState('')
	const [whyToDo, setWhyToDo] = useState('')
	const [acceptance, setAcceptance] = useState('')
	const [isEnglish, setIsEnglish] = useState(false)
	const handleWhoInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setWho(e.target.value)
	const handleWhatToDoInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setWhatToDo(e.target.value)
	const handleWhyToDoInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setWhyToDo(e.target.value)
	const handleAcceptanceInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setAcceptance(e.target.value)
	const handleIsEnglishInputChange = (e: { target: { checked: SetStateAction<boolean>; }; }) => setIsEnglish(e.target.checked)

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
	const {setShowEditStory,sharedItem, shareItem, clearItem} = useContext(ItemContext);


	const handleClickOnNew = () => {
		clearItem();
		
	}

	const handleGenerateNew = () => {
		setDisableGenerate(true);
		setDisableGenerateText('Generating...')
	}
	return (
		<Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
			<Flex  align='center' justify='space-between' w='100%' pe='20px' pt='5px'>
				<Heading m={"3"}>Create New User Story</Heading>
			</Flex>
			<VStack w={'100%'}>
			<Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }}>
				<FormControl>
					<FormLabel>Who is the intended audience?</FormLabel>
					<Input marginBottom={'5'}  value={who} onChange={handleWhoInputChange} colorScheme='facebook'/>
					<FormLabel>What functions does the target user desire?</FormLabel>
					<Input marginBottom={'5'}  value={whatToDo} onChange={handleWhatToDoInputChange} />
					<FormLabel>Why does the user require these capabilities?</FormLabel>
					<Input marginBottom={'5'}  value={whyToDo} onChange={handleWhyToDoInputChange} />
					<FormLabel>What are the acceptance criteria?</FormLabel>
					<Input marginBottom={'5'}  value={acceptance} onChange={handleAcceptanceInputChange} />
					<FormLabel htmlFor='email-alerts'>Response in English?</FormLabel>
					<Switch marginBottom={'5'} id='email-alerts' onChange={handleIsEnglishInputChange}/>
					{/* <Button marginLeft={'3'} marginTop={'3'} onClick={handleClickOnNew}>{'创建新的用户故事'}</Button> */}
				</FormControl>
			</Flex>
					<Button disabled={props.disableGenerate} onClick={()=>{if(!props.Generate){return;};props.Generate(who,whatToDo,whyToDo,acceptance,isEnglish);setShowEditStory(true);}} marginTop={'3'} colorScheme='facebook'>🪄 {props.disableGenerateText}</Button>
			</VStack>
		</Card>
	);
}
