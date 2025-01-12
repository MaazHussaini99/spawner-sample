import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import OAEditScreen from '../../../ui-component/Screens/OAEditScreen';

const EditOA = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <OAEditScreen isLoading={isLoading} />
    </Grid>
  );
};

export default EditOA;
