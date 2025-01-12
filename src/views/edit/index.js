import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import NewCard from 'ui-component/cards/NewCard';

// ==============================|| STANDARD SCREEN ||============================== //

const New = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <NewCard isLoading={isLoading} />
    </Grid>
  );
};

export default New;
