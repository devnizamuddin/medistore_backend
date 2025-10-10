const {setGlobalOptions} = require("firebase-functions");
const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
admin.initializeApp();

setGlobalOptions({maxInstances: 10});

/*
 * =====================================================================
 * 📩 AllUsersNotification added by Admin 👮
 * 🔔 Notifiy 👉 Customers 👥
 * =====================================================================
 */
exports.onAllUsersNotificationAdded = onDocumentWritten(
    "AllUsersNotification/{id}",
    async (event) => {
      const afterData = event.data?.after?.data();
      if (!afterData) {
        logger.info("No data found after write");
        return;
      }

      const {title, body, image, data} = afterData;

      const message = {
        topic: "AllUsersNotification",
        notification: {
          title: title,
          body: body,
          image: image,
        },
        data: data,
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
 * * 📦 Order added by Customer 👤
 * * 🔔 Notifiy 👉 AdminUser 👮
 * =====================================================================
 */

exports.onOrderAdded = onDocumentWritten(
    "Order/{id}",
    async (event) => {
      const afterData = event.data?.after?.data();
      if (!afterData) {
        logger.info("No data found after write");
        return;
      }

      const {shopAddress, userName} = afterData;

      const message = {
        notification: {
          title: `${userName} placed an order`,
          body: `Address: ${shopAddress}`,
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
 * 📩 UsersNotifications added by Admin 👮
 * 🔔 Notifiy 👉 Specifc User 🧑‍💼🔍
 * =====================================================================
 */

exports.onUserNotificationsAdded = onDocumentWritten(
    "UsersNotifications/{id}",
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
