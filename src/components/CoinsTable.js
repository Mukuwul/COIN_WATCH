import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Typography,
  TextField,
  Pagination,
  Box,
  Avatar,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
  alpha,
  Skeleton,
} from '@mui/material';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  StarBorder,
  FilterList 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('market_cap');
  const navigate = useNavigate();
  const theme = useTheme();
  const { currency, symbol, coins, loading } = CryptoState();

  const handleSearch = () =>
    coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );

  useEffect(() => {
    setPage(1);
  }, [search]);

  const toggleFavorite = (coinId, event) => {
    event.stopPropagation();
    const newFavorites = new Set(favorites);
    if (favorites.has(coinId)) {
      newFavorites.delete(coinId);
    } else {
      newFavorites.add(coinId);
    }
    setFavorites(newFavorites);
  };

  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  const CoinCard = ({ coin, rank }) => {
    const profit = coin.price_change_percentage_24h > 0;
    const isFavorite = favorites.has(coin.id);

    return (
      <Card
        sx={{
          background: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 3,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.1)}`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: profit 
              ? 'linear-gradient(90deg, #10b981, #34d399)'
              : 'linear-gradient(90deg, #ef4444, #f87171)',
          },
        }}
        onClick={() => navigate(`/coins/${coin.id}`)}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header Row */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box position="relative">
                <Avatar
                  src={coin.image}
                  sx={{ 
                    width: 48, 
                    height: 48,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.3)}`,
                  }}
                />
                <Chip
                  label={`#${rank}`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    height: 20,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: alpha(theme.palette.background.paper, 0.9),
                    color: theme.palette.text.secondary,
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    fontSize: '1.1rem',
                  }}
                >
                  {coin.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {coin.symbol}
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={(e) => toggleFavorite(coin.id, e)}
              sx={{
                color: isFavorite ? '#fbbf24' : theme.palette.text.disabled,
                '&:hover': {
                  color: '#fbbf24',
                  backgroundColor: alpha('#fbbf24', 0.1),
                },
              }}
            >
              {isFavorite ? <Star /> : <StarBorder />}
            </IconButton>
          </Box>

          {/* Price Section */}
          <Box mb={2}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontFamily: '"JetBrains Mono", monospace',
                mb: 0.5,
              }}
            >
              {symbol}{coin.current_price.toLocaleString()}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              {profit ? (
                <TrendingUp sx={{ color: theme.palette.success.main, fontSize: 20 }} />
              ) : (
                <TrendingDown sx={{ color: theme.palette.error.main, fontSize: 20 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: profit ? theme.palette.success.main : theme.palette.error.main,
                  fontWeight: 600,
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {profit && '+'}{coin.price_change_percentage_24h.toFixed(2)}%
              </Typography>
            </Box>
          </Box>

          {/* Stats Section */}
          <Stack spacing={1.5}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Market Cap
              </Typography>
              <Typography 
                variant="body2" 
                fontWeight={600}
                fontFamily='"JetBrains Mono", monospace'
              >
                {symbol}{formatNumber(coin.market_cap)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                24h Volume
              </Typography>
              <Typography 
                variant="body2" 
                fontWeight={600}
                fontFamily='"JetBrains Mono", monospace'
              >
                {symbol}{formatNumber(coin.total_volume)}
              </Typography>
            </Box>
            {coin.market_cap_rank && (
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Rank
                </Typography>
                <Chip
                  label={`#${coin.market_cap_rank}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: '0.75rem',
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4}>
          <Skeleton variant="text" height={60} width="40%" />
          <Skeleton variant="rectangular" height={56} sx={{ mt: 2 }} />
        </Box>
        <Grid container spacing={3}>
          {[...Array(12)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  const filteredCoins = handleSearch();
  const paginatedCoins = filteredCoins.slice((page - 1) * 12, page * 12);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box mb={6} textAlign="center">
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Cryptocurrency Markets
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
        >
          Real-time cryptocurrency prices and market data
        </Typography>

        {/* Search Bar */}
        <TextField
          placeholder="Search cryptocurrencies..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          sx={{
            maxWidth: 500,
            '& .MuiOutlinedInput-root': {
              background: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <FilterList />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Results Info */}
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" color="text.secondary">
          Showing {paginatedCoins.length} of {filteredCoins.length} cryptocurrencies
        </Typography>
        <Chip
          label={`${filteredCoins.length} Results`}
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Coins Grid */}
      <Grid container spacing={3} mb={4}>
        {paginatedCoins.map((coin, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={coin.id}>
            <CoinCard coin={coin} rank={(page - 1) * 12 + index + 1} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {filteredCoins.length > 12 && (
        <Box display="flex" justifyContent="center" mt={6}>
          <Pagination
            count={Math.ceil(filteredCoins.length / 12)}
            page={page}
            onChange={(_, value) => {
              setPage(value);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: theme.palette.text.primary,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default CoinsTable;
