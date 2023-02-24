import jsonServer from 'json-server';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import routes from './routes.json' assert { type: 'json' };

// json-server 관련
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const rewriter = jsonServer.rewriter(routes);
const middlewares = jsonServer.defaults();

// lowdb를 사용해서 db를 생성해
const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();

// jsonserver 사용
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 로그인 코드 요청
server.use('/getCode/:where', (req, res) => {
  const redirectUrl = `http://localhost:8080/oauth/${req.params.where}?code="testCode"`;
  res.redirect(redirectUrl);
});

// // 로그인 요청
server.use('/oauth/:where', async (req, res) => {
  const { oauth } = db.data;
  const resData = oauth.find(item => item.where === req.params.where);

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );

  res.cookie('refreshToken', 'testRefreshTokenValue', {
    httpOnly: true,
    secure: true,
    domain: 'localhost',
    path: '/',
  });
  res.send(resData);
});

server.use(rewriter);
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is now running');
});
