const app = require('./server/server')
const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
    console.log(`Server Started On http://localhost:${PORT}`);
})