import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TheatersIcon from '@mui/icons-material/Theaters';

import SearchTooltip from '../SearchTooltip';
import SearchInput from '../SearchInput';

const Layout = () => {
  const anchorRef = useRef<HTMLInputElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');

  const open = !!anchorEl;

  const openTooltip = useCallback(() => {
    if (anchorRef.current) {
      setAnchorEl(anchorRef.current);
    }
  }, [anchorRef]);

  const closeTooltip = useCallback(() => {
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    if (query) {
      openTooltip();
    } else {
      closeTooltip();
    }
  }, [query, openTooltip, closeTooltip]);

  const handleClick = useCallback(() => {
    if (query) {
      openTooltip();
    }
  }, [query, openTooltip]);

  // debounced query change handler
  const handleQueryChange = useMemo(() => {
    let timeout: ReturnType<typeof setTimeout> | null;

    const fn: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        setQuery(e.target.value);

        timeout = null;
      }, 2000);
    };

    return fn;
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
        <SearchTooltip
          open={open}
          anchorEl={anchorEl}
          onClose={closeTooltip}
          query={query}
        />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <TheatersIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Your N1 Place for Browsing Movies
              </Link>
            </Typography>
            <SearchInput
              onChange={handleQueryChange}
              onClick={handleClick}
              ref={anchorRef}
            />
          </Toolbar>
        </AppBar>
      </Box>

      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
