import NextCors from 'nextjs-cors';
let data = null;

export default async function handler(req, res) {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });

  if(req.method =='POST') {
    data = {
      name: req.body['name'],
      email: req.body['email']
    };

    res.status(200);
  }

  res.status(400).json({ ...data })
}