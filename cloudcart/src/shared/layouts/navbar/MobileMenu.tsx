"use client";

import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";

export interface MenuProps {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
}

interface MobileMenuPropsExtended extends MenuProps {
  mobileMenuId: string;
  mailCount?: number;
  notificationCount?: number;
}

export default function MobileMenu({
  anchorEl,
  isOpen,
  onClose,
  mobileMenuId,
  mailCount = 0,
  notificationCount = 0,
}: MobileMenuPropsExtended) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isOpen}
      onClose={onClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label={`show ${mailCount} new mails`}
          color="inherit"
        >
          <Badge badgeContent={mailCount} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label={`show ${notificationCount} new notifications`}
          color="inherit"
        >
          <Badge badgeContent={notificationCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
}
