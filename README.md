# Medistore Backend

This repository contains the **Firebase Cloud Functions backend** for the **Medistore** application.  
The backend handles authentication, notifications, and other server-side logic for the Medistore ecosystem.

---

## 📌 Project Overview
- **Frontend (User App):** `user_medistore_flutter`
- **Backend:** `medistore_backend` (Firebase Cloud Functions)

The backend is responsible for:
- User authentication and token management.
- Sending push notifications via **Firebase Cloud Messaging (FCM)**.
- Exposing server-side APIs for the Medistore mobile applications.
- Enforcing security and validation rules.
- Managing background tasks and business logic.

---

## 🛠️ Tech Stack
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging)
- [Firestore](https://firebase.google.com/docs/firestore) (database)
- [Node.js](https://nodejs.org/) (runtime)

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Firebase CLI](https://firebase.google.com/docs/cli) installed globally
- Access to the Firebase project linked with **Medistore**

### 2. Clone the Repository
```bash
git clone https://github.com/<your-org>/medistore_backend.git
cd medistore_backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Login to Firebase
```bash
firebase login
```

### 5. Set the Project
```bash
firebase use <your-firebase-project-id>
```

### 6. Deploy Functions
```bash
firebase deploy --only functions
```

### 📂 Project Structure
```
medistore_backend/
│
├── functions/              # Main backend functions
│   ├── index.js            # Entry point for all functions
│   ├── notifications.js    # Push notification handlers
│   ├── auth.js             # Authentication logic
│   └── utils/              # Utility helpers
│
├── .firebaserc             # Firebase project aliases
├── firebase.json           # Firebase configuration
└── README.md               # Project documentation
```


### 🔔 Features

- Authentication
    - JWT / Firebase Authentication integration
- Notifications
    - Topic-based push notifications (e.g., order updates, promotions)
- API Endpoints
    - Secure backend APIs accessible by the Medistore apps
- Firestore Triggers
    - Automatic backend tasks triggered by database changes

### 🧪 Testing Locally

Run functions locally with the Firebase emulator:

```bash
firebase emulators:start
```
You can then test API endpoints at:
http://localhost:5001/<your-project-id>/us-central1/<functionName>

### 📦 Deployment

* To deploy all functions:
```bash
firebase deploy --only functions
```

* To deploy a single function:
```bash
firebase deploy --only functions:functionName
```


### 👥 Contributors

##### Medistore Development Team

* **Nizam Uddin Shamrat**
  *Lead & Only Developer*


### 📄 License

```
MIT License

Copyright (c) 2025 Nizam Uddin Shamrat and Medistore Development Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.
```

