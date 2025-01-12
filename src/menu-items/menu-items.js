import {
  IconDashboard,
  IconKey,
  IconSettings,
  IconShoppingCart,
  IconCompass,
  IconUser,
  IconUsers,
  IconLogin,
  IconSearch,
  IconFileText,
  IconEdit,
  IconChessBishopFilled,
  IconBriefcase,
  IconBuilding,
  IconMail,
  IconPhone,
  IconCamera,
  IconFilePlus,
  IconClipboard,
  IconGlobe,
  IconFlag,
  IconPlayerTrackNext,
  IconSquareLetterX,
  IconTool,
  IconPackage,
  IconMoodLookUp,
  IconFeather,
  IconPaperclip,
  IconList,
  IconCircleCheck,
  IconArrowCurveLeft,
  IconBrandWindows,
  IconBrowser,
  IconChevronRight,
  IconChevronDown,
  IconChevronUp,
  IconArrowRightCircle,
  IconArrowDownCircle,
  IconArrowUpCircle,
  IconDeviceDesktopAnalytics
} from '@tabler/icons-react';

const icons = {
  IconDashboard,
  IconKey,
  IconSettings,
  IconShoppingCart,
  IconCompass,
  IconUser,
  IconUsers,
  IconLogin,
  IconSearch,
  IconFileText,
  IconEdit,
  IconChessBishopFilled,
  IconBriefcase,
  IconBuilding,
  IconMail,
  IconPhone,
  IconCamera,
  IconFilePlus,
  IconClipboard,
  IconGlobe,
  IconFlag,
  IconPlayerTrackNext,
  IconSquareLetterX,
  IconTool,
  IconPackage,
  IconMoodLookUp,
  IconFeather,
  IconPaperclip,
  IconList,
  IconArrowCurveLeft,
  IconBrandWindows,
  IconBrowser,
  IconChevronRight,
  IconChevronDown,
  IconChevronUp,
  IconArrowRightCircle,
  IconArrowDownCircle,
  IconArrowUpCircle,
  IconCircleCheck,
  IconDeviceDesktopAnalytics
};

// ==============================|| MENU ITEMS ||============================== //

const sidebarMenus = {
  id: 'root',
  title: 'LeakProof Admin Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      icon: icons.IconDeviceDesktopAnalytics,
      url: '/dashboard',
      breadcrumbs: false
    },
    {
      id: 'registration',
      title: 'Registration',
      type: 'item',
      icon: icons.IconUser,
      url: '/register',
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      icon: icons.IconUsers,
      url: '/users',
      breadcrumbs: false
    },
    {
      id: 'sales',
      title: 'Sales',
      type: 'collapse',
      icon: icons.IconShoppingCart,
      children: [
        { id: 'dashboard', title: 'Dashboard', type: 'item', url: '/sales/dashboard', icon: icons.IconDashboard },
        {
          id: 'ga_register',
          title: 'G.A. Register',
          type: 'collapse',
          icon: icons.IconFileText,
          children: [
            { id: 'search', title: 'Search', type: 'item', url: '/sales/ga_register/search', icon: icons.IconSearch },
            {
              id: 'ga_drawing_request',
              title: 'G.A. Drawing Request',
              type: 'item',
              url: '/sales/ga_register/ga_drawing_request',
              icon: icons.IconFilePlus,
              description: 'If drawing belongs to different branch, once request approved, they can download G.A. drawing PDF.'
            }
          ]
        },
        {
          id: 'drf',
          title: 'D.R.F',
          type: 'item',
          url: '/sales/drf',
          icon: icons.IconFileText,
          description: 'Created from other applications'
        },
        { id: 'dcr', title: 'DCR', type: 'item', url: '/sales/dcr', icon: icons.IconEdit, description: 'Drawing Change Request' }
      ]
    },
    {
      id: 'application',
      title: 'Application',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        { id: 'dashboard', title: 'Dashboard', type: 'item', url: '/application/dashboard', icon: icons.IconDashboard },
        {
          id: 'ga_register',
          title: 'G.A. Register',
          type: 'collapse',
          icon: icons.IconClipboard,
          children: [
            {
              id: 'search',
              title: 'Search',
              type: 'item',
              url: '/application/ga_register/search',
              icon: icons.IconSearch,
              description: 'Viewing no downloading option'
            }
          ]
        },
        {
          id: 'seal_selection_tool',
          title: 'Seal Selection Tool',
          type: 'item',
          url: '/application/seal_selection_tool',
          icon: icons.IconTool,
          description: 'From other applications'
        }
      ]
    },
    {
      id: 'design',
      title: 'Design',
      type: 'collapse',
      icon: icons.IconCompass,
      children: [
        { id: 'dashboard', title: 'Dashboard', type: 'item', url: '/design/dashboard', icon: icons.IconDashboard },
        {
          id: 'ga_drawing',
          title: 'G.A. Drawing',
          type: 'collapse',
          icon: icons.IconFileText,
          children: [
            {
              id: 'drf',
              title: 'D.R.F',
              type: 'collapse',
              icon: icons.IconFileText,
              children: [
                { id: 'standard', title: 'Standard', type: 'item', url: '/design/drf/standard', icon: icons.IconFileText },
                { id: 'standard_edit', title: 'Edit', type: 'item', url: '/design/drf/edit', icon: icons.IconEdit },
                {
                  id: 'new_design',
                  title: 'New Design',
                  type: 'collapse',
                  icon: icons.IconBrandWindows,
                  children: [
                    { id: 'new', title: 'New', type: 'item', url: '/design/drf/new_design/new', icon: icons.IconFilePlus },
                    { id: 'edit', title: 'Edit', type: 'item', url: '/design/drf/new_design/edit', icon: icons.IconEdit }
                  ]
                },
                {
                  id: 'review',
                  title: 'Review',
                  type: 'collapse',
                  icon: icons.IconChessBishopFilled,
                  children: [
                    { id: 'checked', title: 'Checked', type: 'item', url: '/design/drf/review/checked', icon: icons.IconSearch },
                    { id: 'approved', title: 'Approved', type: 'item', url: '/design/drf/review/approved', icon: icons.IconCircleCheck }
                  ]
                }
              ]
            },
            {
              id: 'oa',
              title: 'O.A',
              type: 'collapse',
              icon: icons.IconFileText,
              children: [
                { id: 'oa_new', title: 'New', type: 'item', url: '/design/oa/new', icon: icons.IconFileText },
                { id: 'oa_edit', title: 'Edit', type: 'item', url: '/design/oa/edit', icon: icons.IconEdit },
                {
                  id: 'review',
                  title: 'Review',
                  type: 'collapse',
                  icon: icons.IconChessBishopFilled,
                  children: [
                    {
                      id: 'approved',
                      title: 'Approved',
                      type: 'item',
                      url: '/design/oa/review/approved',
                      icon: icons.IconCircleCheck
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'ga_register',
          title: 'G.A. Register',
          type: 'item',
          url: '/design/ga_register',
          icon: icons.IconClipboard
        },
        {
          id: 'component_drawing',
          title: 'Component Drawing',
          type: 'collapse',
          icon: icons.IconSquareLetterX,
          children: [
            {
              id: 'drawing_no',
              title: 'Drawing No.',
              type: 'item',
              url: '/design/component_drawing/drawing_no',
              icon: icons.IconFileText
            },
            {
              id: 'review',
              title: 'Review',
              type: 'collapse',
              icon: icons.IconChessBishopFilled,
              children: [
                {
                  id: 'checked',
                  title: 'Checked',
                  type: 'item',
                  url: '/design/component_drawing/review/checked',
                  icon: icons.IconSearch
                },
                {
                  id: 'approved',
                  title: 'Approved',
                  type: 'item',
                  url: '/design/component_drawing/review/approved',
                  icon: icons.IconCircleCheck
                }
              ]
            }
          ]
        },
        {
          id: 'manufacturing',
          title: 'Manufacturing',
          type: 'collapse',
          icon: icons.IconTool,
          children: [
            {
              id: 'ga_drawing',
              title: 'G.A. Drawing',
              type: 'collapse',
              icon: icons.IconFileText,
              children: [
                {
                  id: 'ga_drawing_no',
                  title: 'G.A. Drawing No.',
                  type: 'item',
                  url: '/design/manufacturing/ga_drawing/ga_drawing_no',
                  icon: icons.IconFileText
                }
              ]
            },
            {
              id: 'component_drawing',
              title: 'Component Drawing',
              type: 'collapse',
              icon: icons.IconSquareLetterX,
              children: [
                {
                  id: 'drawing_no',
                  title: 'Drawing No.',
                  type: 'item',
                  url: '/design/manufacturing/component_drawing/drawing_no',
                  icon: icons.IconFileText
                },
                {
                  id: 'ecr',
                  title: 'ECR',
                  type: 'item',
                  url: '/design/manufacturing/component_drawing/ecr',
                  icon: icons.IconEdit
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default sidebarMenus;
