const {setGlobalOptions} = require("firebase-functions");
const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
admin.initializeApp();

setGlobalOptions({maxInstances: 10});

/*
 * =====================================================================
 * Send notification to -> GeneralUser
 * On adding document on 'UserNotifications' collection
 * =====================================================================
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
/*
 * =====================================================================
 * * Send notification to -> AdminUser
 * * On adding document on 'UserNotifications' collection
 * =====================================================================
 */
exports.sendNotificationToTopic = onDocumentWritten(
    "Order/{uid}",
    async (event) => {
      const afterData = event.data?.after?.data();
      if (!afterData) {
        logger.info("No data found after write");
        return;
      }

      const {shopAddress, userName} = afterData;

      const message = {
        notification: {
          title: "New order placed",
          body: `Shop: ${shopAddress}, Owner: ${userName}`,
        },
        topic: "AdminUser",
      };

      try {
        const response = await admin.messaging().send(message);
        logger.info("Notification sent to topic:", response);
      } catch (error) {
        logger.error("Error sending topic notification:", error);
      }
    },
);
/*
 * =====================================================================
 * * Send notification to specfic user,
 * * By using FCM token
 * =====================================================================
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