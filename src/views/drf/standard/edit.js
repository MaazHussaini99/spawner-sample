import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import StandardEditScreen from '../../../ui-component/Screens/StandardEditScreen';

const StandardEdit = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <StandardEditScreen isLoading={isLoading} />
    </Grid>
  );
};

export default StandardEdit;
