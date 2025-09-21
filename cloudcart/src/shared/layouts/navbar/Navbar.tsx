"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

import SearchBar from "./SearchBar";
import NotificationIcons from "./NotificationIcons";
import MobileMenu from "./MobileMenu";

import ShopDrawer from "@/shared/components/Shop-Drawer/shopDrawer";

interface NavbarProps {
  title?: string;
  mailCount?: number;
  notificationCount?: number;
  onMenuClick?: () => void;
  onSearch?: (value: string) => void;
}

export default function Navbar({
  title = "MUI",
  mailCount = 4,
  notificationCount = 17,
  onMenuClick,
  onSearch,
}: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    }
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "#041f4c",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="TechMarket"
              sx={{
                height: { xs: 30, sm: 40 },
                width: "auto",
              }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{
                display: { xs: "none", sm: "inline" },
                fontWeight: "bold",
              }}
            >
              TechMarket
            </Typography>
          </Box>
          <SearchBar onSearch={onSearch} />

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Icons */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <NotificationIcons
              favoriteCount={mailCount}
              notificationCount={notificationCount}
              menuId={menuId}
            />
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <ShopDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu
        anchorEl={mobileMoreAnchorEl}
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        mobileMenuId={mobileMenuId}
        mailCount={mailCount}
        notificationCount={notificationCount}
      />
    </Box>
  );
}
