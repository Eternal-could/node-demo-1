let http = require('http')
let fs = require('fs')
let url = require('url')
let port = process.argv[2]

if(!port){
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

let server = http.createServer(function(request, response){
    let parsedUrl = url.parse(request.url, true)
    let pathWithQuery = request.url
    let queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    let path = parsedUrl.pathname
    let query = parsedUrl.query
    let method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('是谁发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if(path === '/'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`
        <!doctype html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
                     <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                                 <meta http-equiv="X-UA-Compatible" content="ie=edge">
                     <title>Document</title>
                     <link rel="stylesheet" href="/style">
        </head>
        <body>
            <h1>这是我的第一个node页面</h1>
        </body>
        </html>`)
        response.end()
    } else if(path === '/style'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(`h1{color: red;}`)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你访问的页面不存在`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


