import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { _mockCategories } from "../../_mock/_categories";

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CategoryDrawer({ open, onClose }: CategoryDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    _mockCategories[0].name
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const selectedSubcategories =
    _mockCategories.find((cat) => cat.name === selectedCategory)
      ?.subcategories || [];
  const drawerWidth = isMobile ? "100%" : isTablet ? 400 : 500;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          maxWidth: "100vw",
          height: "100vh",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 400, md: 500 },
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          {/* Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src="/logo.png"
              alt="TechMarket"
              sx={{ height: { xs: 30, sm: 40 }, width: "auto" }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{ display: { xs: "none", sm: "inline" }, fontWeight: "bold" }}
            >
              TechMarket
            </Typography>
          </Box>

          {/* Close button */}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {isMobile ? (
          // Mobile layout: horizontal scroll for categories
          <>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                borderBottom: "1px solid #ddd",
              }}
            >
              {_mockCategories.map((category) => (
                <ListItemButton
                  key={category.name}
                  selected={selectedCategory === category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  sx={{ flexShrink: 0, minWidth: 100 }}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
              {selectedCategory ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    {selectedCategory}
                  </Typography>
                  <List>
                    {selectedSubcategories.map((sub) => (
                      <ListItemButton key={sub.id}>
                        <ListItemText primary={sub.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Select a category
                </Typography>
              )}
            </Box>
          </>
        ) : (
          // Tablet/Desktop layout: two columns
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            {/* Left Column: Categories */}
            <List sx={{ width: "40%", borderRight: "1px solid #ddd" }}>
              {_mockCategories.map((category) => (
                <ListItemButton
                  key={category.name}
                  selected={selectedCategory === category.name}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              ))}
            </List>

            {/* Right Column: Subcategories */}
            <Box sx={{ width: "60%", p: 2 }}>
              {selectedCategory ? (
                <>
                  <List>
                    {selectedSubcategories.map((sub) => (
                      <ListItemButton key={sub.id}>
                        <ListItemText primary={sub.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Select a category
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
