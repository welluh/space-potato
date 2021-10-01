import type { NextApiRequest, NextApiResponse } from 'next';

import httpStatus from 'http-status';
import fetch from 'node-fetch';
import qs from 'qs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
        lat,
        lng,
        range,
        limit = 20,
    } = req.query;

    const params = `distance_filter=${lat},${lng},${range}&${qs.stringify({ limit })}`;
    
    const resultSet = await fetch(
        `${process.env.NEXT_PUBLIC_HELSINKI_OPENAPI_URL}/places/?${params}`,
        {
            headers: {
                'Accept': 'application/json',
            },
        },
    );
    const places = await resultSet.json();

    res.status(httpStatus.OK);
    res.json(places);
  } catch (error) {
      console.error(error);
  }
};
