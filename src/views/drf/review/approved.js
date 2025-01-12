import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import ApprovedScreen from '../../../ui-component/Screens/ApprovedScreen';

const Approved = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <ApprovedScreen isLoading={isLoading} />
    </Grid>
  );
};

export default Approved;
