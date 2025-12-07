import React, { useState, useEffect } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  Chip,
  Avatar,
  useTheme,
  alpha
} from "@mui/material";
import { 
  TrendingUp, 
  Notifications, 
  Settings, 
  AccountCircle,
  DarkMode,
  LightMode
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.background.paper, 0.9)} 0%, 
            ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo Section */}
          <Box 
            display="flex" 
            alignItems="center" 
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                borderRadius: '12px',
                p: 1,
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
              }}
            >
              <TrendingUp sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                CoinWatch
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Advanced Analytics
              </Typography>
            </Box>
          </Box>

          {/* Center Section - Market Status */}
          <Box display="flex" alignItems="center" gap={2}>
            <Chip
              icon={<Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                bgcolor: '#10b981',
                animation: 'pulse 2s infinite'
              }} />}
              label="Markets Live"
              variant="outlined"
              size="small"
              sx={{
                color: theme.palette.text.primary,
                borderColor: alpha(theme.palette.success.main, 0.3),
                '& .MuiChip-icon': { ml: 1 }
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              {currentTime.toLocaleTimeString()}
            </Typography>
          </Box>

          {/* Right Section - User Controls */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }
              }}
            >
              <Notifications />
            </IconButton>
            
            <IconButton
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }
              }}
            >
              <Settings />
            </IconButton>

            <IconButton
              onClick={handleMenu}
              sx={{
                p: 0.5,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                }
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                CW
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  background: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2,
                  mt: 1,
                }
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Portfolio</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 3,
          background: `
            radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%),
            radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
          `,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            letterSpacing: '-0.02em',
          }}
        >
          Track. Analyze. Profit.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: '600px',
            mx: 'auto',
            mb: 4,
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Advanced cryptocurrency analytics platform with real-time data, 
          professional charts, and portfolio management tools.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Chip
            label="Real-time Data"
            variant="outlined"
            sx={{ 
              borderColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.primary.main,
            }}
          />
          <Chip
            label="Advanced Charts"
            variant="outlined"
            sx={{ 
              borderColor: alpha(theme.palette.secondary.main, 0.3),
              color: theme.palette.secondary.main,
            }}
          />
          <Chip
            label="Portfolio Tracking"
            variant="outlined"
            sx={{ 
              borderColor: alpha(theme.palette.success.main, 0.3),
              color: theme.palette.success.main,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Header;