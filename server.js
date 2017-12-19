var https = require('https');
var fs =require('fs');
var cheerio = require('cheerio');

const options = {
    hostname: 'www.brainyquote.com',
    port: 443,
    path: '/top_100_quotes',
    method: 'GET'
  };

  const req = https.request(options, function(res) {
      console.log(`status code: ${res.statusCode}`);
      console.log(`headers: ${res.headers}`);
      res.setEncoding("utf8");

      var body = ''

      res.once('data', function(chunk) {
        console.log(chunk);
        body += chunk;
      })

      res.on('data', function(chunk) {
        body += chunk;
      })

      res.on('end', function() {
        
        var $ = cheerio.load(body);

        $(".block-quote > a").each(function() {
            var link = $(this);
            var txt = link.text();
            var href = link.attr("href");

                       
            fs.appendFile("quotes.txt", txt, function(err) {
                if (err) throw err;
                console.log('successfully written texts');
            });
        })
      })
  });

  req.on('error', function(e) {
      console.log(e);
  });
  
  req.end()



