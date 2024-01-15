const http = require('http');
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    if (req.url === '/') {
        counter1++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Корневая страница</h1> 
        <p>Просмотров: ${counter1}</p> 
        <a href="/about">Ссылка на страницу /about</a>`);
    } else if (req.url === '/about') {
        counter2++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Страница about</h1> 
        <p>Просмотров: ${counter2}</p>  
        <a href="/">Ссылка на страницу /</a>`);
    } else {
        counter3++;
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Страница не найдена!</h1>
        <p>Просмотров: ${counter3}</p>
        <a href="/">Ссылка на страницу /</a>`);
    };

});
const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});



