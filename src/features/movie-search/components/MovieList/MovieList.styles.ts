import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

export const ListWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const SortBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 8,
  padding: '8px 16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}));

export const StyledList = styled(List)({
  overflow: 'auto',
  flex: 1,
  minHeight: 0,
});

export const MetaRow = styled('span')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 4,
});

export const GenreGroup = styled('span')({
  display: 'flex',
  gap: 4,
  flexWrap: 'wrap',
});

export const PosterImage = styled('img')({
  width: 48,
  height: 72,
  borderRadius: 4,
  objectFit: 'cover',
});

export const PosterFallback = styled('div')(({ theme }) => ({
  width: 48,
  height: 72,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.7rem',
  color: theme.palette.text.disabled,
}));
