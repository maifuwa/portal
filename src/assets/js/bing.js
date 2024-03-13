import https from 'https';
import fs from 'fs';

const options = {
  hostname: 'www.bing.com',
  port: 443,
  path: '/HPImageArchive.aspx?format=js&idx=0&n=8',
  method: 'GET'
};

const req = https.request(options, bing_res => {
  let bing_body = [];
  bing_res.on('data', (chunk) => {
    bing_body.push(chunk);
  });
  bing_res.on('end', () => {
    bing_body = Buffer.concat(bing_body);
    const bing_data = JSON.parse(bing_body.toString());
    const img_array = bing_data.images;
    const img_urls = img_array.map(img => img.url);
    const jsonpStr = JSON.stringify(img_urls);
    fs.writeFile('./public/images.json', jsonpStr, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("JSON data is saved: " + jsonpStr);
      }
    });
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
