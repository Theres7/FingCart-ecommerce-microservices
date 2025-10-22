import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LinkIcon from '@mui/icons-material/Link';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';

import InventoryIcon from '@mui/icons-material/Inventory';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmailIcon from '@mui/icons-material/Email';
import DiscountIcon from '@mui/icons-material/Discount';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


import {
  DashboardLayout,
  DashboardSidebarPageItem,
} from '@toolpad/core/DashboardLayout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internal';;
import { useNavigate } from 'react-router-dom';

function DashboardSideBar({ children }) {
  const NAVIGATION = [
    { kind: 'header', title: 'Main items' },
    { segment: 'dashboard', 
      title: 'Dashboard', 
      icon: <DashboardIcon /> ,
      // children: [
      //   { segment: 'sub-item-1', title: 'Categories', icon: <DescriptionIcon /> },
      //   { segment: 'sub-item-2', title: 'Products', icon: <DescriptionIcon /> },
      // ],
    },

    {
      segment: 'orders',
      title: 'Orders',
      icon: <ShoppingCartIcon />,
      children: [
        { segment: 'all-orders', title: 'All Orders', icon: <ListAltIcon /> },
        { segment: 'pending', title: 'Pending', icon: <HourglassEmptyIcon /> },
        { segment: 'completed', title: 'Completed', icon: <CheckCircleIcon /> },
        { segment: 'returns', title: 'Returns', icon: <ReplayIcon /> },
      ],
    },  

    // { segment: 'external', title: 'External Link', icon: <LinkIcon /> },
    // { segment: 'selected', title: 'Selected Item', icon: <CheckBoxIcon /> },
    // { segment: 'disabled', title: 'Disabled Item', icon: <DisabledByDefaultIcon /> },
    // { segment: 'hidden', title: 'Hidden Item', icon: <VisibilityOffIcon /> },
    // {
    //   segment: 'expanded',
    //   title: 'Expanded Folder',
    //   icon: <FolderIcon />,
    //   children: [
    //     { segment: 'sub-item-1', title: 'Categories', icon: <DescriptionIcon /> },
    //     { segment: 'sub-item-2', title: 'Products', icon: <DescriptionIcon /> },
    //   ],
    // },
    // { segment: 'custom', title: 'Custom Item' },

    {
      segment: 'products',
      title: 'Products',
      icon: <InventoryIcon />,
      children: [
        { segment: 'all-products', title: 'All Products', icon: <ListAltIcon />},
        { segment: 'add-product', title: 'Add Product', icon: <AddBoxIcon /> },
        { segment: 'brands', title: 'Brands', icon: <BrandingWatermarkIcon /> },
      ],
    },

    {
      segment: 'categories',
      title: 'Category',
      icon: <CategoryIcon />,
      children: [
        { segment: 'all-categories', title: 'All Categories', icon: <ListAltIcon />},
        { segment: 'add-category', title: 'Add Category', icon: <AddBoxIcon /> },
      ],
    },
    {
      segment: 'customers',
      title: 'Customers',
      icon: <PeopleIcon />,
      children: [
        { segment: 'all-customers', title: 'All Customers', icon: <ListAltIcon /> },
        { segment: 'segments', title: 'Segments', icon: <GroupIcon /> },
      ],
    },
    {
      segment: 'marketing',
      title: 'Marketing',
      icon: <CampaignIcon />,
      children: [
        { segment: 'promotions', title: 'Promotions', icon: <LocalOfferIcon /> },
        { segment: 'email-campaigns', title: 'Email Campaigns', icon: <EmailIcon /> },
        { segment: 'discounts', title: 'Discount Codes', icon: <DiscountIcon /> },
      ],
    },
    {
      segment: 'analytics',
      title: 'Analytics',
      icon: <BarChartIcon />,
      children: [
        { segment: 'sales', title: 'Sales', icon: <AttachMoneyIcon /> },
        { segment: 'customers', title: 'Customer Insights', icon: <PeopleAltIcon /> },
        { segment: 'products', title: 'Product Performance', icon: <TrendingUpIcon /> },
      ],
    },
    {
      segment: 'settings',
      title: 'Settings',
      icon: <SettingsIcon />,
      children: [
        { segment: 'store-settings', title: 'Store Settings', icon: <StoreIcon /> },
        { segment: 'payment', title: 'Payment', icon: <PaymentIcon /> },
        { segment: 'shipping', title: 'Shipping', icon: <LocalShippingIcon /> },
        { segment: 'taxes', title: 'Taxes', icon: <ReceiptIcon /> },
        { segment: 'user-management', title: 'Users & Roles', icon: <AdminPanelSettingsIcon /> },
      ],
    },
    {
      segment: 'support',
      title: 'Support',
      icon: <SupportAgentIcon />,
    },
  ];

  // const PAGE_CONTENT = {
  //   dashboard: <DashboardHome />
  // };

  const CustomPageItem = ({ item, mini }) => (
    <ListItem
      sx={(theme) => ({
        color: theme.palette.secondary.main,
        overflowX: 'hidden',
      })}
    >
      {mini ? (
        <IconButton
          aria-label="custom"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
          })}
        >
          <AutoAwesomeIcon />
        </IconButton>
      ) : (
        <ListItemButton>
          <ListItemIcon
            sx={(theme) => ({
              color: theme.palette.secondary.main,
            })}
          >
            <AutoAwesomeIcon />
          </ListItemIcon>
          <ListItemText primary={item.title} sx={{ whiteSpace: 'nowrap' }} />
        </ListItemButton>
      )}
    </ListItem>
  );

  CustomPageItem.propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    mini: PropTypes.bool.isRequired,
  };

  const demoTheme = createTheme({
    cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
    },
  });

  const router = useDemoRouter('/admin/dashboard/dashboardHome');
  const navigate = useNavigate();



  const renderPageItem = React.useCallback((item, { mini }) => {




    if (item.title === 'Dashboard') {
      return (
        <DashboardSidebarPageItem item={item} href="/admin/dashboard/dashboardHome" />
      );
    }

    // if(item.segment === 'allProducts'){
    //   console.log("Products")
    //   return (
    //     <DashboardSidebarPageItem item={item}>
         
    //     </DashboardSidebarPageItem>
    //   );
    // }

    if(item.title === 'All Products'){
      return (
        <DashboardSidebarPageItem item={item}  />
      );
    }

       
   
    // if (item.title === 'Selected Item') {
    //   return <DashboardSidebarPageItem item={item} selected />;
    // }
    // if (item.title === 'Disabled Item') {
    //   return <DashboardSidebarPageItem item={item} disabled />;
    // }
    // if (item.title === 'Hidden Item') {
    //   return null;
    // }
    // if (item.title === 'Expanded Folder') {
    //   return <DashboardSidebarPageItem item={item} expanded />;
    // }
    // if (item.title === 'Custom Item') {
    //   return <CustomPageItem item={item} mini={mini} />;
    // }
    

    return <DashboardSidebarPageItem item={item}  />;
  }, []);


  

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout renderPageItem={renderPageItem} >

        
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            overflow: 'auto',
          }}
          >
          {children}
        </Box>
        
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardSideBar.propTypes = {
  children: PropTypes.node,
};

export default DashboardSideBar;
