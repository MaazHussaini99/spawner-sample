import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography, IconButton } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM TABLE CARD ||============================== //

const TableCard = forwardRef(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      shadow,
      sx = {},
      title,
      onToggleTheme,
      isDarkTheme,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        style={{
          backgroundColor: '#ffffff',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          borderRadius: '12px',
          boxShadow: 'none',
          backgroundImage: 'none',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: '#90caf925'
        }}
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {title && (
          <CardHeader
            sx={headerSX}
            title={
              <Typography
                variant="h3"
                style={{ fontSize: '1.125rem', fontFamily: "'Roboto', sans-serif", lineHeight: '1.334', fontWeight: '500' }}
              >
                {title}
              </Typography>
            }
            action={<IconButton onClick={onToggleTheme}>{isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton>}
          />
        )}
        {title && <Divider />}
        {content && (
          <CardContent style={{ padding: '0px' }} sx={{ padding: '0px', ...contentSX }} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

TableCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  onToggleTheme: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired
};

export default TableCard;
