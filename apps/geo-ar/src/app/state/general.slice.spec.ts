import { fetchGeneral, generalAdapter, generalReducer } from './general.slice';

describe('general reducer', () => {
  it('should handle initial state', () => {
    const expected = generalAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(generalReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchGenerals', () => {
    let state = generalReducer(undefined, fetchGeneral.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = generalReducer(
      state,
      fetchGeneral.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = generalReducer(
      state,
      fetchGeneral.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
