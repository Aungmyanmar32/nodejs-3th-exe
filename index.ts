import http from "http";

const PORT = 3001;
const server = http.createServer((req, res) => {
  res.writeHead(200, "ok", { "content-type": "text/html" });
  res.write("<input />");
  res.end();
});

server.listen(PORT, () => console.log("server running on port", PORT));
