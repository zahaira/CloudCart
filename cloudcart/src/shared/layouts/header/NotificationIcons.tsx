"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
interface NotificationIconsProps {
  favoriteCount?: number;
  notificationCount?: number;
  menuId: string;
}

export default function NotificationIcons({
  favoriteCount = 0,
  notificationCount = 0,
  menuId,
}: NotificationIconsProps) {
  return (
    <>
      <IconButton
        size="large"
        aria-label={`show ${favoriteCount} new mails`}
        color="inherit"
      >
        <Badge badgeContent={favoriteCount} color="error">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>

      <IconButton
        size="large"
        aria-label={`show ${notificationCount} new notifications`}
        color="inherit"
      >
        <Badge badgeContent={notificationCount} color="error">
          <ShoppingBagOutlinedIcon />
        </Badge>
      </IconButton>

      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircleOutlinedIcon />
      </IconButton>
    </>
  );
}
