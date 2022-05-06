import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import webpush from './config/webpush';
import { broadcast } from "./services/SubscriptionBroadcastService";
import { storeSubscription } from "./services/SubscriptionStoringService";
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 8101;
webpush(); // init webpush config

app.get("/", (req, res) => {
    console.log("get ----------found")
    res.json({ "success": true });
})

app.get("/push", (req, res) => {
    console.log("GET", req.body);
    res.json({ "success": true });
})
app.post("/push", storeSubscription)
app.get('/broadcast', broadcast);
app.listen(port, () => {
    console.log('Server running at port:', port);
});
