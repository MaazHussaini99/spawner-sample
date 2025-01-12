import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import CheckedScreen from '../../../ui-component/Screens/CheckedScreen';

const Checked = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <CheckedScreen isLoading={isLoading} />
    </Grid>
  );
};

export default Checked;
