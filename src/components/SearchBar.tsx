import React, { useState } from 'react';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import FilterContainer from '../components/FilterContainer';
import Drawer from '@mui/material/Drawer';
import { Sort } from '../types/types';
import { useStore } from 'zustand';
import useDogStore from '../store/dogStore';
import ConfettiExplosion from 'react-confetti-explosion';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SearchBar = () => {
  const {
    favoritesContainerState,
    matchedDog,
    sortState,
    setSortState,
    toggleFavoritesContainer,
    fetchMatch,
  } = useStore(useDogStore);
  const [drawerState, setDrawerState] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerState(open);
  };

  const toggleFavorites = () => {
    toggleFavoritesContainer();
  };

  const toggleSort = (sort: Sort, next: Sort) => () => {
    setSortState(sort, next);
  };

  const findMatch = async () => {
    await fetchMatch();
    setDialogOpen(true);
    setIsExploding(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {isExploding && (
        <ConfettiExplosion
          particleCount={200}
          width={2500}
          height="150vh"
          onComplete={() => setIsExploding(false)}
        />
      )}
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        hideBackdrop={true}>
        <DialogContent className="match-container">
          {matchedDog ? (
            <>
              <img src={matchedDog.img} className="match-image" />
              <h1 className="sub-page-h1">🥳</h1>
              <h1 className="sub-page-h1">hooray!</h1>
              <p className="p-large">
                {matchedDog.name} picked you to be their friend!
              </p>
            </>
          ) : (
            <></>
          )}
        </DialogContent>
      </Dialog>

      <Drawer
        anchor={'left'}
        open={drawerState}
        onClose={toggleDrawer(false)}
        keepMounted={true}>
        <FilterContainer />
      </Drawer>
      <div className="search-bar-container">
        {favoritesContainerState ? (
          <Button
            variant="text"
            className={
              dialogOpen ? 'button-secondary-active' : 'button-secondary'
            }
            onClick={findMatch}>
            Find My Pet Friend!
          </Button>
        ) : sortState['off'] ? (
          <Button
            variant="text"
            className="button-secondary"
            onClick={toggleSort('off', 'ascend')}>
            Sort Breed
            <ArrowDropUpRoundedIcon />
          </Button>
        ) : sortState['ascend'] ? (
          <Button
            variant="text"
            className="button-secondary-active"
            onClick={toggleSort('ascend', 'descend')}>
            Sort Breed
            <ArrowDropUpRoundedIcon />
          </Button>
        ) : (
          <Button
            variant="text"
            className="button-secondary-active"
            onClick={toggleSort('descend', 'off')}>
            Sort Breed
            <ArrowDropDownRoundedIcon />
          </Button>
        )}
        <div style={{ justifySelf: 'center', alignSelf: 'center' }}>
          {favoritesContainerState ? (
            <></>
          ) : (
            <IconButton
              className={
                drawerState
                  ? 'search-bar-icon-button-active'
                  : 'search-bar-icon-button'
              }
              onClick={toggleDrawer(true)}>
              <FilterAltRoundedIcon />
            </IconButton>
          )}
          <IconButton
            className={
              favoritesContainerState
                ? 'search-bar-icon-button-active'
                : 'search-bar-icon-button'
            }
            onClick={toggleFavorites}>
            <FavoriteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
