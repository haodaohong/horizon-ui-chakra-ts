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
import { SetStateAction, useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import { createUserStory } from "services";
interface UserStoryResultProps {
  Result: string;
  OnStoryId: any;
}
const UserStoryResult: React.FC<UserStoryResultProps> = (props)=>{
  const { ...rest } = props;
  const { OnStoryId, Result } = props;
  // Chakra Color Mode
  const [disable, setDisable] = useState(false);
  const [btnText, setBtnText] = useState("立即保存");
  const [input, setInput] = useState("");
  const [storyId, setStoryId] = useState(0);
  const [resultText, setResultText] = useState(props.Result);
  useEffect(() => {
    setResultText(props.Result);
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

  const save = () => {
    setDisable(true);
    setBtnText("正在保存，请稍候...");
    console.log('resultText',resultText);
    if(resultText){
      createUserStory(resultText)
        .then((response) => {
        setStoryId(response.data.id);
        OnStoryId(response.data.id)
          console.log("save", resultText);
        })
        .catch((e) => {
          console.log("err", resultText);
        })
        .finally(() => {
          setDisable(false);
          setBtnText("立即保存");
        });
    }
  };

  return (
    <Card w="100%" mb="0px" {...rest}>
      <Flex align="center" justify="space-between" w="100%" pe="20px" pt="5px">
        <Heading m={"3"}>User Story 生成结果：</Heading>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <FormControl>

          <Textarea
            value={resultText}
            height={"350px"}
            size="lg"
            marginBottom={"3"}
            placeholder="这里会展示生成结果..."
            onChange={handleResultInputChange}
          />

          <Button
            disabled={disable}
            onClick={save}
            marginTop={"3"}
            colorScheme="facebook"
          >
            💾 {btnText}
          </Button>
        </FormControl>
      </Flex>
    </Card>
  );
}
export default UserStoryResult;