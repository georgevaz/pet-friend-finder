import useDogStore from '../src/store/dogStore';

// TODO
// mock stores with Zustand/Jest brings up issues and errors involving "create" functionality within Zustand itself
// utilizing getState with the stores for now

describe('Testing dogStore', () => {
  const mock = useDogStore.getState();
  const { addFavoriteDog } = mock;

  test('should add ID to empty state', () => {
    addFavoriteDog('NXGFTIcBOvEgQ5OCx8A1');
    expect(useDogStore.getState().favoriteDogsIds).toStrictEqual([
      'NXGFTIcBOvEgQ5OCx8A1',
    ]);
  });

  test('testing', () => {
    expect(true).toBe(true);
  });
});
