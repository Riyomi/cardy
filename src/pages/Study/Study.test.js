// import { getNextReviewDate, DIFFICULTY } from './Study';

// describe('getNextReviewDate function', () => {
//   it("tests a normal case where the user answers with 'easy'", () => {
//     const step = 2.4;
//     const streak = 5;
//     const answered = DIFFICULTY.EASY;
//     const now = Date.now();

//     const nextReviewDate =
//       now + (step + 0.5) * 3 * 2 ** streak * 60 * 60 * 1000;

//     const result = getNextReviewDate(now, step, streak, answered);
//     expect(result).toBe(nextReviewDate);
//   });

//   it("tests a normal case where the user answers with 'didn't know'", () => {
//     const step = 2.4;
//     const streak = 5;
//     const answered = DIFFICULTY.DIDNT_KNOW;
//     const now = Date.now();

//     const nextReviewDate = now + (step - 0.2) * 3 * 2 ** 0 * 60 * 60 * 1000;

//     const result = getNextReviewDate(now, step, streak, answered);
//     expect(result).toBe(nextReviewDate);
//   });

//   it('tests a case where the step value would fall below 0.1', () => {
//     const step = 0.2;
//     const streak = 5;
//     const answered = DIFFICULTY.DIDNT_KNOW;
//     const now = Date.now();

//     const nextReviewDate = now + 0.1 * 3 * 60 * 60 * 1000;

//     const result = getNextReviewDate(now, step, streak, answered);
//     expect(result).toBe(nextReviewDate);
//   });
// });
