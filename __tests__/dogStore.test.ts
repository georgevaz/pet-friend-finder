import useDogStore from '../src/store/dogStore';
// import create from '../src/__mocks__/zustand';

// const mock = create(useDogStore);

describe('Testing dogStore', () => {
  // const { favoriteDogsIds } = useStore.getState();
  console.log(useDogStore);
  // afterEach(() => {
  //   // Reset all stores after each test run
  //   storeResetFns.forEach(resetFn => resetFn());
  // });

  test('should add ID to empty state', async () => {
    const { favoriteDogsIds, addFavoriteDog } = useDogStore();

    // Mock the addFavoriteDog function
    // store.setState({ addFavoriteDog: jest.fn() });

    addFavoriteDog('NXGFTIcBOvEgQ5OCx8A1');
    // expect(store.getState().addFavoriteDog).toHaveBeenCalledWith(
    //   'NXGFTIcBOvEgQ5OCx8A1',
    // );
  });

  test('testing', () => {
    expect(true).toBe(true);
  });
});
