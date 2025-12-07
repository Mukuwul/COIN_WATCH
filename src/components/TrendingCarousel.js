import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Container,
  useTheme,
  alpha,
  Skeleton,
  Chip,
} from "@mui/material";
import { TrendingUp, TrendingDown, Whatshot } from "@mui/icons-material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";

const TrendingCarousel = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setTrending(data);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingCoins();
  }, []);

  const TrendingCard = ({ coin, index }) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <Card
        sx={{
          margin: "0 12px",
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.background.paper, 0.8)} 0%, 
            ${alpha(theme.palette.background.paper, 0.4)} 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 3,
          minHeight: 200,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
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
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            p: 3,
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          {/* Rank Badge */}
          <Chip
            label={`#${index + 1}`}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: alpha(theme.palette.background.paper, 0.9),
              color: theme.palette.text.secondary,
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />

          {/* Coin Avatar */}
          <Box mb={2} mt={1}>
            <Avatar
              src={coin.image}
              sx={{
                width: 56,
                height: 56,
                mb: 1,
                boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.3)}`,
                border: `2px solid ${alpha(theme.palette.background.paper, 0.8)}`,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '1rem',
              }}
            >
              {coin.symbol}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {coin.name}
            </Typography>
          </Box>

          {/* Price and Change */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontFamily: '"JetBrains Mono", monospace',
                mb: 1,
              }}
            >
              ${coin.current_price.toLocaleString()}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={0.5}
              sx={{
                background: profit 
                  ? alpha(theme.palette.success.main, 0.1)
                  : alpha(theme.palette.error.main, 0.1),
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
              }}
            >
              {profit ? (
                <TrendingUp sx={{ fontSize: 16, color: theme.palette.success.main }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: theme.palette.error.main }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: profit ? theme.palette.success.main : theme.palette.error.main,
                  fontWeight: 600,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.85rem',
                }}
              >
                {profit && '+'}{coin.price_change_percentage_24h?.toFixed(2)}%
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const SkeletonCard = () => (
    <Card
      sx={{
        margin: "0 12px",
        minHeight: 200,
        background: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Skeleton variant="circular" width={56} height={56} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto', mb: 1 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width="70%" height={28} sx={{ mx: 'auto', mb: 1 }} />
        <Skeleton variant="rectangular" width="80%" height={32} sx={{ mx: 'auto', borderRadius: 2 }} />
      </CardContent>
    </Card>
  );

  const items = loading 
    ? [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
    : trending.map((coin, index) => <TrendingCard key={coin.id} coin={coin} index={index} />);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Section Header */}
      <Box textAlign="center" mb={4}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={2}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              borderRadius: '12px',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
            }}
          >
            <Whatshot sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Trending Now
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '500px', mx: 'auto' }}
        >
          Top performing cryptocurrencies by market capitalization
        </Typography>
      </Box>

      {/* Carousel */}
      <Box
        sx={{
          '& .alice-carousel__wrapper': {
            paddingBottom: 2,
          },
          '& .alice-carousel__stage': {
            paddingBottom: 2,
          },
          '& .alice-carousel__stage-item': {
            paddingBottom: 2,
          },
        }}
      >
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={3000}
          animationDuration={1000}
          disableDotsControls
          disableButtonsControls
          responsive={{
            0: { items: 1 },
            600: { items: 2 },
            900: { items: 3 },
            1200: { items: 4 },
            1400: { items: 5 },
          }}
          autoPlay
          items={items}
          paddingLeft={0}
          paddingRight={0}
        />
      </Box>
    </Container>
  );
};

export default TrendingCarousel;