import { Commentary } from '../../types';
import { Typography, Box } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Comment from './Comment';

interface PropTypes {
  children?: React.ReactNode;
  deepComments: Commentary[];
}

export default function DeepComments({ deepComments }: PropTypes): any {
  return deepComments.map((comment: Commentary) => (
    <Box key={comment.id}>
      <Box>
        <Box sx={{ my: 3, gap: 1 }} display="flex" flexDirection={'column'}>
          <Box display="flex" alignItems="center">
            <AccountCircleRoundedIcon
              sx={{ color: '#555', mr: 1 }}
              fontSize="large"
            />
            <Typography variant="h6">{comment.by}</Typography>
          </Box>
          <Typography
            variant="subtitle2"
            fontWeight={'regular'}
            sx={{ pb: 1, color: '#777' }}
          >
            {`Commented - ${new Date(comment.time * 1000).toLocaleString(
              'ru-RU',
              {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              }
            )}`}
          </Typography>
          <Typography variant="body1" fontWeight={'regular'}>
            {comment.text}
          </Typography>
          {comment.kids?.length !== 0 && comment.kids?.length !== undefined ? (
            <Comment comment={comment} />
          ) : null}
        </Box>
      </Box>
    </Box>
  ));
}
