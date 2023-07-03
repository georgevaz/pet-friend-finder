import useDogStore from '../src/store/dogStore';

// mock stores with Zustand/Jest brings up issues and errors involving "create" functionality within Zustand itself
// utilizing getState

describe('Testing dogStore', () => {
  const mock = useDogStore.getState();
  const { resetZips, addFavoriteDog, removeFavoriteDog } = mock;
  test('reset all zips from filter', () => {
    resetZips();
    expect(useDogStore.getState().zips).toHaveLength(0);
  });
  test('add ID to favorites', () => {
    addFavoriteDog('NXGFTIcBOvEgQ5OCx8A1');
    expect(useDogStore.getState().favoriteDogsIds).toEqual([
      'NXGFTIcBOvEgQ5OCx8A1',
    ]);
    addFavoriteDog('RXGFTIcBOvEgQ5OCx8A1');
    expect(useDogStore.getState().favoriteDogsIds).toEqual([
      'NXGFTIcBOvEgQ5OCx8A1',
      'RXGFTIcBOvEgQ5OCx8A1',
    ]);
  });
  test('remove ID from favorites', () => {
    useDogStore.setState({
      favoriteDogsIds: ['NXGFTIcBOvEgQ5OCx8A1', 'RXGFTIcBOvEgQ5OCx8A1'],
    });
    removeFavoriteDog('NXGFTIcBOvEgQ5OCx8A1');
    expect(useDogStore.getState().favoriteDogsIds).toEqual([
      'RXGFTIcBOvEgQ5OCx8A1',
    ]);
  });
});
