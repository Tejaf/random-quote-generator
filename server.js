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

        $(".block-quote > a, .masonry-quote > a").each(function() {
            let link = $(this);
            let txt = link.text();
            txt = txt.trim().split('\n').join('') + '\n'
            let href = link.attr("href");
            let reg = /(\w+)\d/g
            let matchAuthor = href.match(reg)[0].split('_').slice(0,-1)
    
           
            matchAuthor = matchAuthor.map(e => e.length===1 ? e.toUpperCase()+'.' 
                                                            : String(e.charAt(0)).toUpperCase() + e.slice(1))
                                                            .join(' ') + '\n'
            fs.appendFile("quote.txt", txt, function(err) {
                if (err) throw err;
                console.log('successfully written texts');
            });
            fs.appendFile("author.txt", matchAuthor, function(err) {
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



