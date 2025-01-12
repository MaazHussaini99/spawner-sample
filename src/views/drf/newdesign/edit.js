import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import NewDesignEditScreen from '../../../ui-component/Screens/NewDesignEditScreen';

const NewDesignEdit = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <NewDesignEditScreen isLoading={isLoading} />
    </Grid>
  );
};

export default NewDesignEdit;
