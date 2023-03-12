import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import { Story } from '../../types';
import { HackerNewsContext, DispatchContext } from '../../context';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Divider from '@mui/material/Divider';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LoopIcon from '@mui/icons-material/Loop';

export default function NewsList() {
  const hackerNews = useContext(HackerNewsContext);
  const dispatch = useContext(DispatchContext);
  const [forceUpdate, setForceUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStoryList() {
      const { data } = await axios.get(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      );

      const topStories = data
        .sort((a: number, b: number) => b - a)
        .slice(0, 100);

      let sliceNumber = 0;
      const storyPromises = [];

      for (let i = 0; i < 100; i++) {
        if (topStories[i] === hackerNews.topHundred[0]) {
          sliceNumber = i;
          break;
        }
        storyPromises.push(
          axios
            .get(
              `https://hacker-news.firebaseio.com/v0/item/${topStories[i]}.json`
            )
            .then((res) => res.data)
        );
      }

      let relevantTop =
        sliceNumber === 0
          ? topStories
          : [
              ...topStories.slice(0, sliceNumber),
              ...hackerNews.topHundred.slice(0, 100 - sliceNumber),
            ];

      dispatch({ type: 'updated_top_hundred', payload: relevantTop });

      let storyResponse = await Promise.all(storyPromises);

      if (sliceNumber === 0 && hackerNews.storyList.length === 0) {
        dispatch({ type: 'updated_story_list', payload: [...storyResponse] });
      } else if (sliceNumber === 0 && hackerNews.storyList.length !== 0) {
        dispatch({
          type: 'updated_story_list',
          payload: [...hackerNews.storyList],
        });
      } else {
        dispatch({
          type: 'updated_story_list',
          payload: [
            ...storyResponse,
            ...hackerNews.storyList.slice(0, 100 - sliceNumber),
          ],
        });
      }
    }
    fetchStoryList();

    const interval = setInterval(() => {
      fetchStoryList();
    }, 60000);

    return () => clearInterval(interval);
  }, [forceUpdate]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h3"
          component={'h1'}
          color="#fff"
          fontWeight="bold"
        >
          THE NEWS
        </Typography>
        <Button
          variant="outlined"
          sx={{ borderRadius: 6, px: 2 }}
          size="small"
          onClick={() => setForceUpdate(!forceUpdate)}
          startIcon={<LoopIcon />}
        >
          Update
        </Button>
      </Box>
      {hackerNews.storyList.length !== 0 ? (
        hackerNews.storyList.map((story: Story) => (
          <Box
            key={story.id}
            sx={{
              textAlign: 'left',
              py: { xs: 2, md: 2 },
              px: 3,
              my: 1,
              borderRadius: { xs: 3, md: 4 },
              backgroundColor: '#24282B',
              color: '#D9D9D9',
            }}
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
                })}
              </Typography>
            </Box>
            <Typography variant="body1" py={1}>
              {story.title}
            </Typography>
            <Grid container display="flex" justifyContent="space-between">
              <Grid
                item
                xs={12}
                md={8}
                display="flex"
                // justifyContent="space-between"
                alignContent="center"
                sx={{ columnGap: 2, justifyContent: { xs: 'start' } }}
              >
                <Box display="flex" alignItems="center">
                  <StarRoundedIcon sx={{ color: '#ffb200', mr: 0.5 }} />
                  <Typography alignItems="start" variant="subtitle2">
                    {story.score}
                  </Typography>
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
              </Grid>
              <Grid item xs={12} md={3} display="flex" justifyContent="end">
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => {
                    navigate(`/${story.id}`);
                  }}
                  endIcon={
                    <ArrowForwardIosRoundedIcon
                      sx={{ display: { xs: 'none', md: 'block' } }}
                    />
                  }
                  size="small"
                  sx={{
                    borderRadius: 4,
                    px: 2,
                    width: { xs: 1, md: '10ch' },
                    mt: { xs: 2, md: 0 },
                  }}
                  color="warning"
                >
                  Open
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))
      ) : (
        <Skeleton
          variant="rectangular"
          height={'90vh'}
          animation="wave"
          sx={{
            py: 2,
            px: 3,
            my: 1,
            borderRadius: 4,
            bgcolor: '#24282B',
          }}
        />
      )}
    </>
  );
}
