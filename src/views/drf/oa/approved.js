import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import OAApprovedScreen from '../../../ui-component/Screens/OAApprovedScreen';

const ApprovedOA = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <OAApprovedScreen isLoading={isLoading} />
    </Grid>
  );
};

export default ApprovedOA;
