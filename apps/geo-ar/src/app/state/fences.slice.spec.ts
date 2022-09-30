// import { fetchFences, fencesAdapter, fencesReducer } from './fences.slice';

// describe('fences reducer', () => {
//   it('should handle initial state', () => {
//     const expected = fencesAdapter.getInitialState({
//       loadingStatus: 'not loaded',
//       error: null,
//     });

//     expect(fencesReducer(undefined, { type: '' })).toEqual(expected);
//   });

//   it('should handle fetchFencess', () => {
//     let state = fencesReducer(undefined, fetchFences.pending(null, null));

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: 'loading',
//         error: null,
//         entities: {},
//       })
//     );

//     state = fencesReducer(
//       state,
//       fetchFences.fulfilled([{ id: 1 }], null, null)
//     );

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: 'loaded',
//         error: null,
//         entities: { 1: { id: 1 } },
//       })
//     );

//     state = fencesReducer(
//       state,
//       fetchFences.rejected(new Error('Uh oh'), null, null)
//     );

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: 'error',
//         error: 'Uh oh',
//         entities: { 1: { id: 1 } },
//       })
//     );
//   });
// });
