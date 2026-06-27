import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  height: '100%',
  maxWidth: 1400,
  margin: '0 auto',
  padding: 24,
  boxSizing: 'border-box',
});

export const ContentGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
  flex: 1,
  minHeight: 0,
});

export const Panel = styled(Paper)({
  minHeight: 0,
  overflow: 'hidden',
});

export const BackButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
}));
