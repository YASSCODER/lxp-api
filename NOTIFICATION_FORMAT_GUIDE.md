# Notification Format Guide

## ✅ Updated Notification Structure

Notifications sent to users now have this clean format:

```javascript
{
  type: "NEW_SKILL_CREATED",
  title: {
    en: "New Skill Available",
    ar: "مهارة جديدة متاحة"
  },
  content: {
    en: "JavaScript Basics has been added to the system",
    ar: "تمت إضافة أساسيات JavaScript إلى النظام"
  },
  link: "/skills/123",
  createdAt: "2025-10-07T22:14:00.000Z"
}
```

## 📋 Structure Breakdown

### Fields:

- **`type`**: Notification type identifier (e.g., "NEW_SKILL_CREATED")
- **`title`**: Bilingual title object
  - `en`: English title
  - `ar`: Arabic title
- **`content`**: Bilingual content/body object
  - `en`: English content
  - `ar`: Arabic content
- **`link`**: URL to navigate to when notification is clicked
- **`createdAt`**: Timestamp when notification was created

## 🔧 Implementation

### In Skill Service (`skill.service.ts`)

```typescript
const notification: NotificationPayload = {
  type: 'NEW_SKILL_CREATED',
  userId: user.id,
  title: {
    en: 'New Skill Available',
    ar: 'مهارة جديدة متاحة',
  },
  content: {
    en: `${skillSaved.title.en} has been added to the system`,
    ar: `تمت إضافة ${skillSaved.title.ar} إلى النظام`,
  },
  link: `/skills/${skillSaved.id}`,
  createdAt: new Date(),
}

this.eventEmitter.emit(
  'notification.learner.push',
  new NotificationEvent(notification),
)
```

### In Learner Subscriber (`learner-notification.subscriber.ts`)

When broadcasting to learners via WebSocket:

```typescript
const wsPayload = {
  type: event.notification.type,
  title: event.notification.title,
  content: event.notification.content,
  link: event.notification.link,
  createdAt: event.notification.createdAt,
}

await this.notificationService.sendNotificationToAllLearners(wsPayload)
```

## 📡 WebSocket Delivery

Learners receive the notification via Socket.IO:

```javascript
socket.on('newNotification', (notification) => {
  console.log('Type:', notification.type)
  console.log('Title (EN):', notification.title.en)
  console.log('Title (AR):', notification.title.ar)
  console.log('Content (EN):', notification.content.en)
  console.log('Content (AR):', notification.content.ar)
  console.log('Link:', notification.link)
})
```

## 💾 Database Storage

For database storage, title and content are combined:

```typescript
const dbContent: NotificationContentEmbedded = {
  en: `${notification.title.en}: ${notification.content.en}`,
  ar: `${notification.title.ar}: ${notification.content.ar}`,
}
```

This is stored in the `notification` table in the `content` JSONB column.

## 🎨 Frontend Display Example

### React Component:

```typescript
function NotificationItem({ notification, language }) {
  return (
    <div className="notification">
      <h3>{notification.title[language]}</h3>
      <p>{notification.content[language]}</p>
      <a href={notification.link}>View</a>
      <small>{new Date(notification.createdAt).toLocaleString()}</small>
    </div>
  )
}
```

### Vanilla JavaScript:

```javascript
function displayNotification(notification, language) {
  const title = notification.title[language]
  const content = notification.content[language]

  return `
    <div class="notification">
      <h3>${title}</h3>
      <p>${content}</p>
      <a href="${notification.link}">View</a>
      <small>${new Date(notification.createdAt).toLocaleTimeString()}</small>
    </div>
  `
}
```

## 🧪 Testing

### Test Notification:

```bash
curl -X POST http://localhost:3000/api/notifications/send-to-learners \
  -H "Content-Type: application/json" \
  -d '{
    "type": "TEST",
    "title": {
      "en": "Test Notification",
      "ar": "إشعار تجريبي"
    },
    "content": {
      "en": "This is a test message",
      "ar": "هذه رسالة تجريبية"
    },
    "link": "/test",
    "createdAt": "2025-10-07T22:00:00.000Z"
  }'
```

### Create Skill (triggers notification automatically):

```bash
curl -X POST http://localhost:3000/api/skill \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "en": "React Basics",
      "ar": "أساسيات React"
    },
    "description": "Learn React"
  }'
```

**Expected notification:**

```json
{
  "type": "NEW_SKILL_CREATED",
  "title": {
    "en": "New Skill Available",
    "ar": "مهارة جديدة متاحة"
  },
  "content": {
    "en": "React Basics has been added to the system",
    "ar": "تمت إضافة أساسيات React إلى النظام"
  },
  "link": "/skills/123",
  "createdAt": "2025-10-07T..."
}
```

## 📊 Notification Flow

1. **Skill Created** → Notification event emitted
2. **Subscriber Receives** → Event with full notification data
3. **Database Save** → Combined title + content
4. **WebSocket Broadcast** → Separate title and content
5. **Frontend Receives** → `{ title: {en, ar}, content: {en, ar}, link }`
6. **Display** → Show based on user's language preference

## ✅ Benefits

- **Clean structure**: Easy to understand and use
- **Bilingual**: Native support for EN/AR
- **Flexible display**: Frontend can choose which language to show
- **Consistent**: Same format for all notifications
- **Type-safe**: TypeScript interfaces ensure correctness

## 🎯 Summary

Your notifications are now configured with the clean format:

```
{
  title: { en, ar },
  content: { en, ar },
  link
}
```

This makes it easy for the frontend to display notifications in the user's preferred language! 🚀
