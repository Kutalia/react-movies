import { useState, useCallback, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TheatersIcon from '@mui/icons-material/Theaters';

import SearchTooltip from '../SearchTooltip';
import SearchInput from '../SearchInput';

const SearchAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [query, setQuery] = useState('');

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

  const open = !!anchorEl;

  const openTooltip = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };

  const closeTooltip = () => {
    setAnchorEl(null);
  }

  return (
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
            Your N1 Place for Browsing  Movies
          </Typography>
          <SearchInput
            onClick={openTooltip}
            onChange={handleQueryChange}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchAppBar;
