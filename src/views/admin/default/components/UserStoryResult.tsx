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
import { createUserStory,updateUserStory } from "services";
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

  const [disable, setDisable] = useState(false);
  const [btnText, setBtnText] = useState("Save");
  const [input, setInput] = useState("");
  const [resultText, setResultText] = useState(props.Result);
	const {storyId,setStoryId} = React.useContext(ItemContext);
  useEffect(() => {
    setResultText(props.Result);

    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000); // 撒花特效持续2秒


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

  const handleShowGenerateForm = (e:number) => {
    if(onShowGenerateForm){
      onShowGenerateForm(e);
    }
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


          {/* <Button marginTop={"3"} marginLeft={"3"} colorScheme="facebook" onClick={() => handleShowGenerateForm(storyId)}>
            🤖 Regenerate
          </Button> */}
        </FormControl>
      </Flex>

      <Button
            disabled={disable}
            onClick={save}
            marginTop={"3"}
            colorScheme="facebook"
          >
            💾 {btnText}
          </Button>
      </VStack>
    </Card>
  );
}
export default UserStoryResult;