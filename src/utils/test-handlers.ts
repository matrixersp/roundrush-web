import { rest } from 'msw';
import { BASE_API_URL } from 'utils/constants';

export const handlers = [
  rest.post(`${BASE_API_URL}/auth`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.get(`${BASE_API_URL}/auth/verify-email`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.get(`${BASE_API_URL}/industries`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '6353e9af92e470bdef29a5a0',
          name: 'Agriculture',
        },
        {
          id: '6353e9af92e470bdef29a5a1',
          name: 'Automotive',
        },
        {
          id: '6353e9af92e470bdef29a5a2',
          name: 'Banking',
        },
        {
          id: '6353e9af92e470bdef29a5a3',
          name: 'Construction',
        },
        {
          id: '6353e9af92e470bdef29a5a4',
          name: 'Education',
        },
        {
          id: '6353e9af92e470bdef29a5a5',
          name: 'Energy',
        },
        {
          id: '6353e9af92e470bdef29a5a6',
          name: 'Entertainment',
        },
        {
          id: '6353e9af92e470bdef29a5a7',
          name: 'Fashion',
        },
        {
          id: '6353e9af92e470bdef29a5a8',
          name: 'Finance',
        },
        {
          id: '6353e9af92e470bdef29a5a9',
          name: 'Food',
        },
      ])
    );
  }),
  rest.get(`${BASE_API_URL}/employees-sizes`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '6359391023e4b4e0ea5c45d6',
          name: '1-10',
        },
        {
          id: '6359391023e4b4e0ea5c45d7',
          name: '11-50',
        },
        {
          id: '6359391023e4b4e0ea5c45d8',
          name: '51-200',
        },
        {
          id: '6359391023e4b4e0ea5c45d9',
          name: '201-500',
        },
        {
          id: '6359391023e4b4e0ea5c45da',
          name: '501-1000',
        },
        {
          id: '6359391023e4b4e0ea5c45db',
          name: '1001-5000',
        },
        {
          id: '6359391023e4b4e0ea5c45dc',
          name: '5001-10000',
        },
        {
          id: '6359391023e4b4e0ea5c45dd',
          name: '10001-50000',
        },
        {
          id: '6359391023e4b4e0ea5c45de',
          name: '50001-100000',
        },
        {
          id: '6359391023e4b4e0ea5c45df',
          name: '100001+',
        },
      ])
    );
  }),
  rest.post(`${BASE_API_URL}/users`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
