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
import { createUserStory } from "services";

export default function UserTaskResult(props: any) {
  const { ...rest } = props;
  const { storyId, userStoryContent, selectedStory} = props;

  // Chakra Color Mode
  const [input, setInput] = useState("");
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

  // const [resultText, setResultText] = useState("");
  // const handleResultInputChange = (e: {
  //   target: { value: SetStateAction<string> };
  // }) => setResultText(e.target.value);

  const OnGenerateTasks = async (id: number) => {
    const endpoint = `https://ai.api.1app.site/api/A_AIUserTask/Create?userStoryId=${id}`;
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
  };

  return (
    <Card w="100%" mb="0px" {...rest}>
      <Flex align="center" justify="space-between" w="100%" pe="20px" pt="5px">
        <Heading m={"3"}>User Story：</Heading>
      </Flex>
      <Flex
        marginLeft={4}
        align="center"
        justify="space-between"
        w="100%"
        pe="20px"
        pt="5px"
      >
        <Text>{userStoryContent}</Text>
      </Flex>
      <Flex align="center" justify="space-between" w="100%" pe="20px" pt="5px">
        <Heading m={"3"}>Task 生成结果：</Heading>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <FormControl>
          <Textarea
            value={input}
            height={"350px"}
            size="lg"
            marginBottom={"3"}
            placeholder="这里会展示生成结果..."
            onChange={handleInputChange}
          />
          <Button marginTop={"3"} marginLeft={"3"} colorScheme="facebook" onClick={() => OnGenerateTasks(storyId)}>
            💾 立即保存
          </Button>
        </FormControl>
      </Flex>
    </Card>
  );
}
