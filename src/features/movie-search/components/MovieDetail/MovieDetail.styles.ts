import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const DetailRoot = styled(Box)({
  padding: 20,
  overflow: 'auto',
  height: '100%',
  boxSizing: 'border-box',
});

export const Header = styled(Box)({
  display: 'flex',
  gap: 20,
  marginBottom: 20,
});

export const PosterImage = styled('img')({
  width: 160,
  height: 240,
  borderRadius: 8,
  objectFit: 'cover',
  flexShrink: 0,
});

export const GenreRow = styled(Box)({
  display: 'flex',
  gap: 8,
  marginTop: 8,
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const Actions = styled(Box)({
  display: 'flex',
  gap: 12,
  marginBottom: 24,
});
