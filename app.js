console.log("Hello, World!");

const http = require('http');

const { parse } = require('querystring');

const fs = require("fs");
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
    const { headers, method, url } = req;
    console.log(`> ${method} ${url}`);
    if (url === '/api/message' && method === 'POST') {
	    let body = '';
    	req.on('data', chunk => {
        	body += chunk.toString(); // convert Buffer to string
    	});
    	req.on('end', () => {
        	console.log(`> BODY: ${body}`);
			b = parse(body);
            console.log(`> b: ${JSON.stringify(b)}`);
			message = b.message;
			enc = { encoding: 'utf8' }
			existingcontents = fs.readFileSync('msgs/msg-1.txt', enc);
            newcontents = message + '\n' + existingcontents;
			fs.writeFileSync('msgs/msg-1.txt', 
                newcontents,
				enc);
	        res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        	res.end(JSON.stringify({'data': newcontents}));
    	});
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
