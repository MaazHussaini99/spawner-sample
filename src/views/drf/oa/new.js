import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import OANewScreen from '../../../ui-component/Screens/OANewScreen';

const New = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <OANewScreen isLoading={isLoading} />
    </Grid>
  );
};

export default New;
