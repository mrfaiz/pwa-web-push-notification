import { NextFunction, Request, Response } from "express";
import { USER_SUBSCRIPTIONS } from "../database/in-memory-db";
import webpush from 'web-push';
export const broadcast = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (USER_SUBSCRIPTIONS.length === 0) {
            res.json({ "message": "Empty list" });
            return;
        }
        console.log("sending push....");
        const notificationPayload = {
            "notification": {
                "title": "New Title , changed",
                "body": "Simple piece of body text.\nSecond line of body text ",
                "icon": "assets/main-page-logo-small-hat.png",
                "badge": "assets/main-page-logo-small-hat.png",
                "vibrate": [100, 50, 100],
                "actions": [
                    { "action": "explore", "title": "Open App" }
                ],
                "data": {
                    "url": "tabs/tab3",
                    "primaryKey": Math.round(Math.random()),
                    "dateOfArrival": Date.now()
                },
            }
        };

        const options = {
            "TTL": 60 
        }

        Promise.all(USER_SUBSCRIPTIONS.map(sub =>
            webpush.sendNotification(
                sub,
                JSON.stringify(notificationPayload),
                options
                )))
            .then(() => res.status(200).json({ "message": `Notification sent to ${USER_SUBSCRIPTIONS.length} clients` }))
            .catch(err => {
                console.error("Error sending notification, reason: ", err);
                res.json({ "success": false, "status": err.statusCode ?? 500 });
            })
    } catch (error) {
        console.log(error);
    }
}