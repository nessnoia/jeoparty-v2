"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json({ limit: '120kb' }));
app.get("/", (_, res) => {
    res.send("Logging server");
});
app.post('/', (req, res) => {
    console.log(new Date().toString(), req.body);
    res.status(200).send('POST received');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
