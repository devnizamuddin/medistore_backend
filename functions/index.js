/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
admin.initializeApp();

setGlobalOptions({maxInstances: 10});

/**
 * Send notification to a topic when a document is written in `puppies/{uid}`.
 */
exports.sendNotificationToTopic = onDocumentWritten(
    "UserNotifications/{uid}",
    async (event) => {
      const afterData = event.data?.after?.data();
      if (!afterData) {
        logger.info("No data found after write");
        return;
      }

      const {title, content} = afterData;

        const message = {
            notification: {
                title,
                body: content,
            },
            topic: "GeneralUser",
        };

        try {
            const response = await admin.messaging().send(message);
            logger.info("Notification sent to topic:", response);
        } catch (error) {
            logger.error("Error sending topic notification:", error);
        }
    },
);

/**
 * Send notification to a specific FCM token when a document is written in `messages/{mUid}`.
 */
exports.sendNotificationToFCMToken = onDocumentWritten(
    "messages/{mUid}",
    async (event) => {
        const afterData = event.data?.after?.data();
        if (!afterData) {
            logger.info("No data found after write");
            return;
        }

      const {userUid, title, content} = afterData;

      try {
            const userDoc = await admin.firestore().doc(`users/${userUid}`).get();
            const fcmToken = userDoc.get("fcm");

            if (!fcmToken) {
                logger.warn(`No FCM token found for user: ${userUid}`);
                return;
            }

            const message = {
                notification: {
                    title,
                    body: content,
                },
                token: fcmToken,
            };

            const response = await admin.messaging().send(message);
            logger.info("Notification sent to FCM token:", response);
        } catch (error) {
            logger.error("Error sending FCM notification:", error);
        }
    },
);

//* ============================================================| Initial Given Code |====================================================================================================


/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


//* const { setGlobalOptions } = require("firebase-functions");
//* const { onRequest } = require("firebase-functions/https");
//* const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

//* setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
