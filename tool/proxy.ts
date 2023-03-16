import https from 'https';
import http from 'http';

function onRequest(
  clientReq: http.IncomingMessage,
  clientRes: http.ServerResponse,
) {
  console.log(`serve: ${clientReq.url}`);

  const hostname = 'www.google.com';
  const { headers } = clientReq;
  headers.host = hostname;
  const options: https.RequestOptions = {
    hostname,
    port: 443,
    path: clientReq.url,
    method: clientReq.method,
    headers,
  };

  const proxy = https.request(options, (res) => {
    if (res.statusCode) {
      clientRes.writeHead(res.statusCode, res.headers);
      res.pipe(clientRes, {
        end: true,
      });
    }
  });

  clientReq.pipe(proxy, {
    end: true,
  });
}

http.createServer(onRequest).listen(3000);
