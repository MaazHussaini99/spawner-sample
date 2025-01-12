export default function componentStyleOverrides(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? 'rgb(237, 231, 246)' : 'rgb(41, 49, 79)',
          color: isLight ? 'rgb(103, 58, 183)' : 'rgb(124, 77, 255)'
        }
      }
    },
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? '#fff' : 'rgb(17, 25, 54)'
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          position: 'relative',
          '&::after': {
            backgroundColor: 'rgba(189, 200, 240, 0.26)'
          }
        }
      }
    },
    // header
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? '#fff' : 'rgb(17, 25, 54)',
          color: isLight ? 'rgb(17, 25, 54)' : 'rgb(189, 200, 240)'
        }
      }
    },
    // navbar
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: isLight ? '#fff' : 'rgb(17, 25, 54)',
          color: isLight ? '#fff' : 'rgb(189, 200, 240)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '5px',
          backgroundColor: isLight ? 'rgb(103, 58, 183)' : 'rgb(124, 77, 255)',
          color: isLight ? 'rgb(237, 231, 246)' : 'rgb(237, 231, 246)',
          '&:hover': {
            backgroundColor: isLight ? 'rgb(124, 77, 255)' : 'rgb(94, 53, 177)'
          }
        }
      }
    },
    // Form Containers
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? '#fff' : 'rgb(33, 41, 70)',
          color: isLight ? 'rgb(33, 41, 70)' : 'rgb(189, 200, 240)'
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: isLight ? 'rgb(17, 25, 54)' : 'rgb(189, 200, 240)',
          padding: '24px'
        },
        title: {
          fontSize: '1.125rem'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px'
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px'
        }
      }
    },
    // navbar items
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: isLight ? 'rgb(54, 65, 82)' : 'rgb(189, 200, 240)',
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: isLight ? 'rgb(103, 58, 183)' : 'rgb(124, 77, 255)',
            backgroundColor: isLight ? 'rgb(237, 231, 246)' : 'rgba(124, 77, 255, 0.15)',
            '&:hover': {
              backgroundColor: isLight ? 'rgb(237, 231, 246)' : 'rgba(124, 77, 255, 0.15)'
            },
            '& .MuiListItemIcon-root': {
              color: isLight ? 'rgb(103, 58, 183)' : 'rgb(124, 77, 255)'
            }
          },
          '&:hover': {
            backgroundColor: isLight ? 'rgb(237, 231, 246)' : 'rgba(124, 77, 255, 0.15)',
            color: isLight ? 'rgb(103, 58, 183)' : 'rgb(124, 77, 255)',
            '& .MuiListItemIcon-root': {
              color: isLight ? 'rgb(103, 58, 183)' : 'rgb(124, 77, 255)'
            }
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: isLight ? 'rgb(54, 65, 82)' : 'rgb(189, 200, 240)'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: isLight ? 'rgb(54, 65, 82)' : 'rgb(189, 200, 240)',
          minWidth: '36px'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textDark,
          backgroundColor: isLight ? 'rgb(248, 250, 252)' : 'rgba(26, 34, 63)',
          '&::placeholder': {
            color: theme.darkTextSecondary,
            fontSize: '0.875rem'
          }
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? 'rgb(248, 250, 252)' : 'rgba(26, 34, 63)',
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.colors?.grey400
          },
          '&:hover $notchedOutline': {
            borderColor: theme.colors?.primaryLight
          },
          '&.MuiInputBase-multiline': {
            padding: 1
          }
        },
        input: {
          fontWeight: 500,
          color: isLight ? 'rgb(54, 65, 82)' : 'rgb(189, 200, 240)',
          padding: '15.5px 14px',
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0
            }
          }
        },
        inputAdornedStart: {
          paddingLeft: 4
        },
        notchedOutline: {
          borderRadius: `${theme?.customization?.borderRadius}px`
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.grey[300]
          }
        },
        mark: {
          backgroundColor: theme.palette.background.paper,
          width: '4px'
        },
        valueLabel: {
          color: theme.palette.primary.light
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
          opacity: 1
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.dark,
          background: theme.palette.primary[200]
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit'
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.background.paper,
          background: theme.palette.grey[700]
        }
      }
    },
    MUIDataTable: {
      styleOverrides: {
        paper: {
          boxShadow: 'none'
        }
      }
    },
    MUIDataTableToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? '#f5f5f5' : 'rgb(33, 41, 70)',
          padding: '10px'
        },
        icon: {
          color: isLight ? 'rgb(33, 41, 70)' : '#f5f5f5',
          backgroundColor: isLight ? '#f5f5f5' : 'rgb(33, 41, 70)'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? 'inherit' : 'inherit',
          color: isLight ? '#212121' : 'inherit',
          padding: '10px'
        }
      }
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? '#dfdfdf' : '#212121',
          fontWeight: 'bold',
          border: isLight ? '1px solid rgb(255 255 255)' : 'none'
        },
        fixedHeader: {
          backgroundColor: isLight ? '#dfdfdf' : '#212121'
        },
        sortActive: {
          color: isLight ? 'rgb(94, 53, 177)' : 'rgb(190 157 255)'
        },
        sortAction: {
          '& .MuiButtonBase-root': {
            marginRight: '5px'
          }
        },
        toolButton: {
          backgroundColor: 'inherit',
          color: 'inherit'
        }
      }
    },
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          padding: '10px 20px'
        }
      }
    },
    MUIDataTableBodyRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: isLight ? '#f9f9f9' : 'rgb(33, 41, 70)'
          },
          '&:hover': {
            backgroundColor: isLight ? '#f1f1f1' : 'rgb(33, 41, 70)'
          }
        }
      }
    },
    MUIDataTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? '#f5f5f5' : 'rgb(33, 41, 70)',
          padding: '10px'
        }
      }
    },
    MUIDataTableFilterList: {
      styleOverrides: {
        root: {
          marginBottom: '10px'
        }
      }
    },
    MUIDataTableFilter: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? '#fafafa' : 'rgb(33, 41, 70)'
        }
      }
    },
    MUIDataTableViewCol: {
      styleOverrides: {
        root: {
          padding: '10px'
        }
      }
    }
  };
}
