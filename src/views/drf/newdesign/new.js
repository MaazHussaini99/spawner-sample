import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import NewDesignNewScreen from '../../../ui-component/Screens/NewDesignNewScreen';

const NewDesign = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <NewDesignNewScreen isLoading={isLoading} />
    </Grid>
  );
};

export default NewDesign;
