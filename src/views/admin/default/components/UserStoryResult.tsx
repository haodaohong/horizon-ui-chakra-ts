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
  VStack,
  Stack,
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
import LineChart from "components/charts/LineChart";
import { SetStateAction, useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";

import { publish } from "event"

// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import { createUserStory,updateUserStory,askQuestion } from "services";
import React from "react";
import { ItemContext } from "contexts/SidebarContext";
import Confetti from 'react-confetti';

interface UserStoryResultProps {
  Result: string;
  onstoryid: any;
  onShowGenerateForm: any;
}
const UserStoryResult: React.FC<UserStoryResultProps> = (props) => {
  const { ...rest } = props;
  const { onstoryid, Result, onShowGenerateForm } = props;
  // Chakra Color Mode
  const [confetti, setConfetti] = useState(false);
  const [result,setResult] = useState('');
  const [disableGenerate,setDisableGenerate] = useState(false);
  const [opacity,setOpacity] = useState(1)

  const [showQuestion,setShowQuestion] = useState(false)
  const [disable, setDisable] = useState(false);
  const [btnText, setBtnText] = useState("Save");
  const [input, setInput] = useState("");
  const [resultText, setResultText] = useState(props.Result);
	const {storyId,setStoryId} = React.useContext(ItemContext);
  useEffect(() => {
    setResultText(props.Result);

    setConfetti(true);
    setTimeout(() => setConfetti(false), 10000); // 撒花特效持续2秒


  }, [props.Result]);
  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setInput(e.target.value);

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
  const handleResultInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setResultText(e.target.value);

  const handleAskQuestion = async (question:string) => {
    const endpoint = "https://ai.api.1app.site/api/A_AIUserStory/AskQuestion";

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
      body: JSON.stringify(question),
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
      setShowQuestion(true);
      //   if (stopConversationRef.current === true) {
      // 	controller.abort();
      // 	done = true;
      // 	break;
      //   }
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      text += chunkValue;
      setResult(text);
    }
    setDisableGenerate(false);
    setConfetti(true);
    const intervalId = setInterval(() => {setOpacity(opacity => (opacity - 0.23) < 0 ? 0 : (opacity - 0.23))}, 1000)
    setTimeout(() => {setConfetti(false);clearInterval(intervalId);setOpacity(1);}, 10000); 
  }

  const save = () => {
    setDisable(true);
    setBtnText("Saving...");
    console.log('resultText', resultText);
    if (resultText) {
      if(storyId > 0){
        updateUserStory(storyId ,resultText)
        .then((response) => {
          publish('storySaved');
          setStoryId(response.data.id);
          onstoryid(response.data.id)
          console.log("save", resultText);
        })
        .catch((e) => {
          console.log("err", resultText);
        })
        .finally(() => {
          setDisable(false);
          setBtnText("Save");
        });
      }else{
        createUserStory(resultText)
        .then((response) => {
          publish('storySaved');
          setStoryId(response.data.id);
          onstoryid(response.data.id)
          console.log("save", resultText);
        })
        .catch((e) => {
          console.log("err", resultText);
        })
        .finally(() => {
          setDisable(false);
          setBtnText("Save");
        });
      }
    }
  };

  return (
    <Card w="100%" mb="0px" {...rest}>
      <Flex align="center" justify="space-between" w="100%" pe="20px" pt="5px">
        <Heading m={"3"}>User Story Result：</Heading>
      </Flex>
      <VStack w={'100%'}>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <FormControl>

          <Textarea
            value={resultText}
            height={"350px"}
            size="lg"
            marginBottom={"3"}
            placeholder="Result here..."
            onChange={handleResultInputChange}
          />
        </FormControl>
      </Flex>
      <Stack direction={['column', 'row']} spacing='24px'>
        <Box w='240px' h='140px'>
              <Button
                  disabled={disable}
                  onClick={save}
                  marginTop={"3"}
                  colorScheme="facebook"
                >
                  💾 {btnText}
                </Button>
        </Box>
        <Box w='240px' h='140px'>
          
        <Button marginTop={"3"} marginLeft={"3"} colorScheme="facebook" onClick={() => handleAskQuestion(resultText)}>
                  🤖 Developer Ask
                </Button>
        </Box>
      </Stack>

      </VStack>
      {showQuestion && <VStack w={'100%'}>
      <Flex align="center" justify="space-between" w="100%" pe="20px" pt="5px">
        <Heading m={"3"}>Questions：</Heading>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <FormControl>

          <Textarea
            value={result}
            height={"350px"}
            size="lg"
            marginBottom={"3"}
            placeholder="Result here..."
          />
        </FormControl>
      </Flex>
      </VStack>}
    </Card>
  );
}
export default UserStoryResult;