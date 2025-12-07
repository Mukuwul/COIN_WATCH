import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const SelectButton = styled(Button)(({ theme, selected }) => ({
  border: '1px solid gold',
  borderRadius: 5,
  padding: 10,
  cursor: 'pointer',
  backgroundColor: selected ? 'gold' : '',
  color: selected ? 'black' : 'gold',
  fontWeight: selected ? 700 : 500,
  '&:hover': {
    backgroundColor: 'gold',
    color: 'black',
  },
  width: '22%',
  margin: 5,
}));

export default SelectButton;
