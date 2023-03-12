import axios from 'axios';
import { useState, useEffect } from 'react';
import { Commentary } from '../../types';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import DeepComments from './DeepComments';

export default function Comment({ comment }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deepComments, setDeepComments] = useState<Commentary[]>([]);

  useEffect(() => {
    async function fetchStoryList() {
      const deepCommentPromises: any = [];
      comment.kids.forEach((id: number) =>
        deepCommentPromises.push(
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((res) => res.data)
        )
      );

      let deepCommentResponse = await Promise.all(
        deepCommentPromises as Commentary[]
      );
      console.log(deepCommentResponse);
      setDeepComments(deepCommentResponse);
    }
    fetchStoryList();
  }, []);

  return (
    <Box>
      <Button
        variant="text"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen === true ? 'hide comments' : 'view comments'}
      </Button>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box display="flex">
          <Divider
            orientation="vertical"
            flexItem
            color="#666"
            sx={{ width: '2px', borderRadius: 4, bgcolor: '#F86E03', mr: 2 }}
          />
          <Box display="flex" sx={{ flexDirection: 'column' }}>
            <DeepComments deepComments={deepComments} />
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
