import * as React from 'react';
import {
  Box,
  ChakraProvider,
  CSSReset,
  Divider,
  extendTheme,
  Flex,
} from '@chakra-ui/react';
import theme from '../../theme/theme';
import Stories from 'views/admin/profile/components/Stories';


const ResizableLayout: React.FC = () => {
  const [leftWidth, setLeftWidth] = React.useState(300);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const newLeftWidth = e.clientX - containerRef.current.offsetLeft;
      setLeftWidth(newLeftWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Flex ref={containerRef} width="100vw" height="100vh">
        <Box bg="teal.500" width={leftWidth} height="100%" p={4}>
          <Stories />
        </Box>
        <Divider orientation="vertical" onMouseDown={handleMouseDown} />
        <Box flex="1" bg="gray.200" p={4}>
          数据展示
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default ResizableLayout;