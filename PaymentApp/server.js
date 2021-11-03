function requireHTTPS(req, res, next) {
    if (!req.secure 
        //khusus untuk server yang kita deploy di heroku
        && req.get('x-forwarded-proto') != 'https') {
        return res.redirect(
            'https://' + req.get('host') + req.url
        )
    }
    next();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 8080

app
.use(requireHTTPS)
.use(express.static('./dist/PaymentApp'))

.get('/*', (req, res) => res.sendFile('index.html', {root: './dist/PaymentApp'}))
.listen(port, () => {
    console.log(`My Angular application is now running! https://localhost:${port}`)
})
