import PropTypes from 'prop-types';
import MuiChip from '@mui/material/Chip';

const Chip = ({ sx = {}, ...others }) => {
  return <MuiChip {...others} sx={sx} />;
};

Chip.propTypes = {
  sx: PropTypes.object
};

export default Chip;
