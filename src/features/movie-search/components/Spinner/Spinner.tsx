import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const SpinnerWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '32px 0',
});

export function Spinner() {
  return (
    <SpinnerWrapper>
      <CircularProgress />
    </SpinnerWrapper>
  );
}
