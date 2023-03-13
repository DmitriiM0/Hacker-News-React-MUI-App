import { useState, useEffect, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { HackerNewsContext } from '../../context';
import { Story, Commentary } from '../../types';
import CommentSection from '../components/CommentSection';
import axios from 'axios';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import {
  Button,
  Box,
  Skeleton,
  Typography,
  Grid,
  Divider,
} from '@mui/material';

export default function NewsPage() {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [commentList, setCommentList] = useState<Commentary[]>([]);
  const [storyId, data] = useLoaderData() as string;
  let story: any;
  const hackerNews = useContext(HackerNewsContext || data);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStoryList() {
      const commentPromises: any = [];
      story.kids.forEach((commentId: number) =>
        commentPromises.push(
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
            .then((res) => res.data)
        )
      );

      let commentResponse = await Promise.all(commentPromises);
      setCommentList(
        commentResponse.sort((a: Commentary, b: Commentary) => b.time - a.time)
      );
    }
    fetchStoryList();
  }, [forceUpdate]);

  hackerNews.storyList.length === 0
    ? (story = data)
    : (story = hackerNews.storyList.filter(
        (data: Story) => data.id === +storyId
      )[0]);

  return (
    <>
      <Box
        sx={{
          textAlign: 'left',
          px: 4,
          pb: 3,
          my: 1,
          borderRadius: 4,
          backgroundColor: '#24282B',
          color: '#D9D9D9',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ pt: 4, pb: 4 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2">
              {new Date(story.time * 1000).toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                //   hour: '2-digit',
                //   minute: '2-digit',
              })}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/Hacker-News-React-MUI-App/')}
              size="small"
              sx={{ borderRadius: 4, px: 2 }}
              color="warning"
            >
              Back
            </Button>
          </Box>
          <Typography variant="h4" component="h1" sx={{ width: 0.9 }}>
            {story.title}
          </Typography>
          <Grid container display="flex" justifyContent="space-between">
            <Grid
              item
              xs={12}
              md={8}
              display="flex"
              alignContent="center"
              sx={{ columnGap: 2, justifyContent: { xs: 'start' } }}
            >
              <Box display="flex" alignItems="center">
                <StarRoundedIcon sx={{ color: '#ffb200', mr: 0.5 }} />
                <Typography variant="subtitle2">{story.score}</Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                color="#666"
                sx={{ my: 0.4 }}
              />
              <Box display="flex" alignItems="center">
                <AccountCircleRoundedIcon sx={{ color: '#555', mr: 1 }} />
                <Typography variant="subtitle2">{story.by}</Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                color="#666"
                sx={{ my: 0.4 }}
              />
              <Box display="flex" alignItems="center">
                <CommentRoundedIcon sx={{ color: '#555', mr: 1 }} />
                <Typography variant="subtitle2">{story.descendants}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="end">
              <Button
                variant="contained"
                href={`${story.url}`}
                size="small"
                sx={{
                  borderRadius: 4,
                  px: 2,
                  width: { xs: 1, md: '19ch' },
                  mt: { xs: 2, md: 0 },
                }}
                target="_blank"
                color="warning"
                startIcon={<OpenInNewOutlinedIcon />}
              >
                Go to Source
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Divider flexItem color="#666" />
        <Box
          display="flex"
          alignItems="end"
          alignContent="center"
          sx={{ mt: 3, color: '#777' }}
        >
          <Typography variant="subtitle2" alignSelf="center">
            {story.descendants === 0 ? 'NO COMMENTS' : 'COMMENTS'}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<LoopIcon />}
            size="small"
            sx={{ borderRadius: 4, px: 2, ml: 2 }}
            color="warning"
            onClick={() => setForceUpdate(!forceUpdate)}
          >
            Update
          </Button>
        </Box>
        {commentList.length !== 0 ? (
          <CommentSection comments={commentList} />
        ) : story?.kids === undefined ? null : (
          <Skeleton
            variant="rectangular"
            height={'80vh'}
            animation="wave"
            sx={{
              px: 4,
              pb: 1,
              my: 1,
              borderRadius: 4,
              backgroundColor: '#24282B',
            }}
          />
        )}
      </Box>
    </>
  );
}
