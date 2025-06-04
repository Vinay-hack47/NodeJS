const http = require("http");
const fs = require("fs");

const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type" : "text/html"});
  fs.readFile("index.html", (err, data) =>{
    if (err){
      res.writeHead(404);
      res.write("File not found");
      res.end();
    }
    else{
      res.write(data);
      res.end();
    }
  })
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
