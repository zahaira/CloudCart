"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

import CategoryDrawer from "@/shared/components/category-Drawer/CategoryDrawer";
import Link from "next/link";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import NotificationIcons from "./NotificationIcons";
import { AppBar } from "@mui/material";

interface HeaderProps {
  mailCount?: number;
  notificationCount?: number;
  onSearch?: (value: string) => void;
}

export default function Header({
  mailCount = 4,
  notificationCount = 17,
  onSearch,
}: HeaderProps) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

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

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
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
          <Link href="/">
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
          </Link>
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

      <CategoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

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
