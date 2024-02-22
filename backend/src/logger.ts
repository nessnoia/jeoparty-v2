import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.use(express.json({limit: '120kb'}));

app.get("/", (_: Request, res: Response) => {
    res.send("Logging server");
});

app.post('/', (req, res) => {
    console.log(new Date().toString(), req.body);
    res.status(200).send('POST received')
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});