import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import StandardScreen from '../../../ui-component/Screens/StandardScreen';

const Standard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <StandardScreen isLoading={isLoading} />
    </Grid>
  );
};

export default Standard;
