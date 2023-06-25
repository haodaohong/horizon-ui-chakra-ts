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
import { getAllUserStories,deleteUserStory } from 'services';

import { UserStory } from 'services';
import { ItemContext } from 'contexts/SidebarContext';

import { subscribe } from "event";

export default function Stories(props: { [x: string]: any }) {

	const { ...rest } = props;
	const [height, setHeight] = React.useState(window.innerHeight);
	const [stories, setStories] = React.useState<UserStory[]>([]);
	const [selectedStory, setSelectedStory] = React.useState<UserStory>(null);

	const {setEditTask,setEditTestCase,allUserStories,setAllUserStories,setShowGenerateForm,sharedItem, shareItem, clearItem, setShowEditStory,setShowEditTask,setShowEditTestCase,setStoryId} = React.useContext(ItemContext);

	React.useEffect(() => {
		const handleResize = () => {
			setHeight(window.innerHeight - 120);
		};

		subscribe("storySaved", () => getAllUserStories().then(e => {
			setStories(e.data)
			console.log('getAllUserStories', e);

		}).catch(e => {
			console.error('getAllUserStories error:', e);
		}));

		getAllUserStories().then(e => {
			setStories(e.data);
			setAllUserStories(e.data);
			console.log('getAllUserStories', e.data);
			console.log('allUserStories', allUserStories);
		}).catch(e => {
			console.error('getAllUserStories error:', e);
		});	


		handleResize();

	  window.addEventListener("resize", handleResize);
	  return () => {
		window.removeEventListener("resize", handleResize);
	  };
	  handleResize();
	}, [stories.length]);

	const handleEditClick = (idx: any) => {
		clearItem();
		const story = stories.find(x=>x.id === idx);
		setSelectedStory({...story});
		shareItem({...story});
		setStoryId(story.id);
		setShowGenerateForm(true);
		setShowEditStory(true);
		setShowEditTask(false);
		setShowEditTestCase(false);
	}
	const handleDeleteClick = (idx: number) => {
		deleteUserStory(idx).then(e => {
			clearItem();
			getAllUserStories().then(e => {
				setStories(e.data)
				console.log('getAllUserStories', e);
	
			}).catch(e => {
				console.error('getAllUserStories error:', e);
			});
		});
	}
	const handleTaskClick = (idx: any) => {
		clearItem();
		const story = stories.find(x=>x.id === idx);
		setSelectedStory({...story});
		shareItem({...story});
		setStoryId(story.id);
		setShowGenerateForm(false);
		setShowEditStory(false);
		setShowEditTask(true);
		setShowEditTestCase(false);
		setEditTask(story.userTasks[0]?.description);
	}
	const handleTestCaseClick = (idx: number) => {
		clearItem();
		const story = stories.find(x=>x.id === idx);
		setSelectedStory({...story});
		shareItem({...story});
		setStoryId(story.id);
		setShowGenerateForm(false);
		setShowEditStory(false);
		setShowEditTask(false);
		setShowEditTestCase(true);
		setEditTestCase(story.testCases[0]?.description);
	}
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	return (
		<Card overflowY={'auto'} w={'100%'} height={`${height}px`} mb={{ base: '0px', '2xl': '20px' }} {...rest}>
			{
				stories?.map((story, idx )=> (
				<Story
						key={idx}
						boxShadow={cardShadow}
						mb='20px'
						image={Project1}
						ranking='1'
						link='#'
						title={story.id + '. ' + story.name}
						onDeleteClick={() => handleDeleteClick(story.id)} 
						onEditClick={() => handleEditClick(story.id)} 
						onTaskClick={() => handleTaskClick(story.id)} 
						onTestCaseClick={() => handleTestCaseClick(story.id)} 			
				/>))
			}
		</Card>
	);
}
