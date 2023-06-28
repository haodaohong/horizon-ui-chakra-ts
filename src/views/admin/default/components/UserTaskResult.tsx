// Chakra imports
import {
  Box,
  FormErrorMessage,
  FormControl,
  FormHelperText,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  FormLabel,
  Icon,
  Input,
  Text,
  useColorModeValue,
  useBoolean,
  WrapItem,
  Heading,
  Textarea,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import CardBody from "components/card/Card";
import LineChart from "components/charts/LineChart";
import { SetStateAction, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import { createUserTask, getAllUserStories } from "services";
import React from "react";
import { ItemContext } from "contexts/SidebarContext";
import Confetti from 'react-confetti';

export default function UserTaskResult(props: any) {
  const { ...rest } = props;
  const { storyId, userStoryContent } = props;
	const {editTask, setStories, setAllUserStories} = React.useContext(ItemContext);
  const [confetti, setConfetti] = useState(false);
  const [opacity, setOpacity] = useState(1.0);
  // Chakra Color Mode
  const [input, setInput] = useState(editTask);
  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setInput(e.target.value);

  const [disableGenerate, setDisableGenerate] = useState(false);
  const [disableGenerateText, setDisableGenerateText] = useState('Generate');

  const [disableSave, setDisableSave] = useState(false);
  const [disableSaveText, setDisableSaveText] = useState('Save');


  const isError = input === "";
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const OnSave =async (data:string) => {
    createUserTask(storyId, JSON.stringify(data)).then(e=>{
      console.log('save', e)

      getAllUserStories().then(e => {
				setStories(e.data);
				setAllUserStories(e.data);
			}).catch(e => {
				console.error('getAllUserStories error:', e);
			});	
    });
  }

  const OnGenerateTasks = async (id: number) => {
    setDisableGenerate(true);
    setDisableGenerateText('Generating...')
    const endpoint = `https://ai.api.1app.site/api/A_AIUserTask/Generate?storyId=${id}`;
    const controller = new AbortController();
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...{
          Authorization: `Bearer WM5ABA9E202D94C43ASW3CA6600F2BF77FWM`,
        },
      },
      signal: controller.signal,
      body: null,
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
    let text = "";
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
      setInput(text);
    }
    setDisableGenerate(false);
    setDisableGenerateText('Generate');
    setConfetti(true);
    const intervalId = setInterval(() => {setOpacity(opacity => (opacity - 0.23) < 0 ? 0 : (opacity - 0.23))}, 1000)
    setTimeout(() => {setConfetti(false);clearInterval(intervalId);setOpacity(1);}, 10000); // 撒花特效持续2秒
  };

  return (
    <Card w="100%" {...rest}>
      <CardBody>
      <Flex align="center" justify="space-between" w="100%" pe="20px" pt="5px">
        <Heading m={"3"}>Generate Task：</Heading>
      </Flex>
      <Flex
        marginLeft={4}
        align="center"
        justify="space-between"
        w="100%"
        pe="20px"
        pt="5px"
      >
        <Text style={{ whiteSpace: 'pre-wrap' }}>{userStoryContent}</Text>
      </Flex>
      <Flex align="center" justify="space-between" w="100%" pe="20px" pt="5px">
        <Heading m={"3"}>Task Result：</Heading>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>

      { confetti && <Confetti
        opacity={opacity}
        drawShape={ctx => {
          ctx.beginPath()
          for(let i = 0; i < 22; i++) {
            const angle = 0.35 * i
            const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
            const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
            ctx.lineTo(x, y)
          }
          ctx.stroke()
          ctx.closePath()
        }}
      />}

        <FormControl>
          <Textarea
            value={input}
            height={"550px"}
            size="lg"
            marginBottom={"3"}
            placeholder="这里会展示生成结果..."
            onChange={handleInputChange}
          />

          <Button disabled={disableGenerate} marginTop={"3"} marginLeft={"3"} colorScheme="facebook" onClick={() => OnGenerateTasks(storyId)}>
            🤖 {disableGenerateText}
          </Button>
          <Button disabled={disableSave} marginTop={"3"} marginLeft={"3"} colorScheme="facebook" onClick={() => OnSave(input)}>
            💾 {disableSaveText}
          </Button>
        </FormControl>
      </Flex>
      </CardBody>
    </Card>
  );
}
