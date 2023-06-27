// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/rtl/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import tableDataCheck from "views/admin/default/variables/tableDataCheck";
import tableDataComplex from "views/admin/default/variables/tableDataComplex";
import CreateUserStory from "./components/CreateUserStory";
import UserStoryResult from "./components/UserStoryResult";
import UserTestCaseResult from "./components/UserTestCaseResult";
import UserTaskResult from "./components/UserTaskResult";
import React, { useState, useContext, useEffect } from "react";
import { generateUserStory } from "services";
import { ItemContext } from "contexts/SidebarContext";
import Confetti from 'react-confetti';


export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [result, setResult] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [opacity, setOpacity] = useState(1.0);

  const [showStoryBox, setShowStoryBox] = useState(false);
  const [showTaskBox, setShowTaskBox] = useState(false);
  const [showTestCaseBox, setShowTestCaseBox] = useState(false);

  const [disableGenerate, setDisableGenerate] = useState(false);
	const [disableGenerateText, setDisableGenerateText] = useState('Generate');

  const {showGenerateForm, setShowGenerateForm,showNewStory,sharedItem,storyId,setStoryId, shareItem, clearItem,showEditStory,showEditTask,showEditTestCase} = useContext(ItemContext);

  useEffect(() => {
    if(sharedItem){
      setShowStoryBox(true);
      setShowTaskBox(true);
      setShowTestCaseBox(true);
      setResult(sharedItem.description);
    }
    else{
      setShowStoryBox(false);
      setShowTaskBox(false);
      setShowTestCaseBox(false);
      setResult("")
    }
  }, [sharedItem])

  async function OnGenerateUserStory(
    who: string,
    whatToDo: string,
    whyToDo: string,
    acceptance: string,
    isEnglish: string
  ) {
    setDisableGenerate(true);
    setDisableGenerateText('Generating...');
    setShowStoryBox(true);
    // setShowTaskBox(true);
    // setShowTestCaseBox(true);
    const endpoint = "https://ai.api.1app.site/api/A_AIUserStory/Generate";
    const bodyRequest = {
      who: who,
      whatToDo: whatToDo,
      whyToDo: whyToDo,
      acceptance: acceptance,
      isEnglish: isEnglish
    };

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
      body: JSON.stringify(bodyRequest),
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
      setResult(text);
    }
    setDisableGenerate(false);
    setDisableGenerateText('Generate');
    setConfetti(true);
    const intervalId = setInterval(() => {setOpacity(opacity => (opacity - 0.23) < 0 ? 0 : (opacity - 0.23))}, 1000)
    setTimeout(() => {setConfetti(false);clearInterval(intervalId);setOpacity(1);}, 5000); // 撒花特效持续2秒
  }

  const OnStorySave = (storyId: number) => {
    setStoryId(storyId);
    setShowTaskBox(true);
    setShowTestCaseBox(true);
  };

  const onShowGenerateForm = (storyId: number) => {
    if(setShowGenerateForm){
      setShowGenerateForm(true);
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
   
        {(showGenerateForm) ? (
          <CreateUserStory Generate={OnGenerateUserStory} disableGenerate={disableGenerate} disableGenerateText={disableGenerateText}/>
        ) : (
          <></>
        )}
        {showEditStory ? (
       <> 
     
       <UserStoryResult Result={result} onstoryid={OnStorySave} onShowGenerateForm={onShowGenerateForm} />
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
    </>
        ) : (
          <></>
        )}
        {showEditTask ? (
          <UserTaskResult storyId={storyId} userStoryContent={result}/>
        ) : (
          <></>
        )}
        {showEditTestCase ? (
          <UserTestCaseResult storyId={storyId} userStoryContent={result} />
        ) : (
          <></>
        )}
     
    </Box>
  );
}
