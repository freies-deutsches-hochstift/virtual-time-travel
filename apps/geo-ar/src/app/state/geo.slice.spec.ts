import { fetchGeo, geoAdapter, geoReducer } from './geo.slice';

describe('geo reducer', () => {
  it('should handle initial state', () => {
    const expected = geoAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(geoReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchGeos', () => {
    let state = geoReducer(undefined, fetchGeo.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = geoReducer(state, fetchGeo.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = geoReducer(
      state,
      fetchGeo.rejected(new Error('Uh oh'), null, null)
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
