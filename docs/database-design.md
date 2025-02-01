# Skin Tracker – Database Design

Below is a **relational database design** for the **Skin Tracker** app, based on the provided PRD. Each table includes a purpose description and key relationships. This schema is compatible with a **PostgreSQL** (Supabase) setup. Adjust table or column names as needed for your specific implementation.

---

## 1. **Users & Authentication**

### **Table: `users`**
- **Purpose:** Stores core authentication info (email/password or OAuth data).  
  > In Supabase, you might rely on the built-in `auth.users` table, but we define it here for clarity.

| Column          | Type          | Constraints                      |
|-----------------|--------------|----------------------------------|
| `id`            | UUID (PK)     | Primary key.                     |
| `email`         | Text (Unique) | Unique user email.               |
| `password_hash` | Text          | Hashed password (if used).       |
| `created_at`    | Timestamp     | Default: `NOW()`.                |
| `updated_at`    | Timestamp     | On update.                       |

- **Relationships**  
  - 1-to-1 with `user_profiles` (a single profile per user).
  - 1-to-M with `subscriptions` (a user can have multiple subscription records over time).
  - 1-to-M with `consultations` (a user can book multiple consultations).

---

### **Table: `user_profiles`**
- **Purpose:** Stores additional user details (e.g., name, skin goals, preferences).

| Column                   | Type      | Constraints                         |
|--------------------------|-----------|-------------------------------------|
| `id`                     | UUID (PK) | Primary key.                        |
| `user_id`                | UUID      | FK → `users.id` (unique if strict 1:1). |
| `full_name`              | Text      | User’s full name.                   |
| `skin_goals`             | Text/JSON | E.g., “reduce acne, increase hydration”.|
| `notification_preferences` | Text/JSON | E.g., `{ "reminders": true, "newsletter": false }`. |
| `created_at`             | Timestamp | Default: `NOW()`.                   |
| `updated_at`             | Timestamp | On update.                          |

- **Relationships**  
  - 1-to-1 with `users`.
  - 1-to-M with `skin_type_quizzes`.

---

## 2. **Skin Type Quiz & Profile**

### **Table: `skin_type_quizzes`**
- **Purpose:** Logs results of any skin-type quiz a user takes. A user may retake the quiz multiple times.

| Column           | Type      | Constraints                    |
|------------------|-----------|--------------------------------|
| `id`             | UUID (PK) | Primary key.                   |
| `user_profile_id`| UUID      | FK → `user_profiles.id`.       |
| `skin_type`      | Text      | E.g., “oily”, “dry”, etc.      |
| `quiz_responses` | Text/JSON | Storing question-answer data.  |
| `created_at`     | Timestamp | Default: `NOW()`.              |

- **Relationships**  
  - M-to-1 with `user_profiles`.

---

## 3. **Habit Tracking & Daily Routine**

### **Table: `routines`**
- **Purpose:** High-level definition of a user’s skincare routines (e.g., morning/evening routines).

| Column            | Type      | Constraints                     |
|-------------------|-----------|---------------------------------|
| `id`              | UUID (PK) | Primary key.                    |
| `user_profile_id` | UUID      | FK → `user_profiles.id`.        |
| `routine_name`    | Text      | E.g., "Morning Routine".        |
| `created_at`      | Timestamp | Default: `NOW()`.               |
| `updated_at`      | Timestamp | On update.                      |

- **Relationships**  
  - M-to-1 with `user_profiles`.
  - 1-to-M with `routine_steps`.

---

### **Table: `routine_steps`**
- **Purpose:** Defines the individual steps within a routine (e.g., cleanse, tone, moisturize).

| Column         | Type      | Constraints                     |
|----------------|-----------|---------------------------------|
| `id`           | UUID (PK) | Primary key.                    |
| `routine_id`   | UUID      | FK → `routines.id`.             |
| `step_order`   | Integer   | Defines execution order.        |
| `step_name`    | Text      | E.g., "Cleanse".                |
| `created_at`   | Timestamp | Default: `NOW()`.               |
| `updated_at`   | Timestamp | On update.                      |

- **Relationships**  
  - M-to-1 with `routines`.
  - 1-to-M with `routine_checklists`.

---

### **Table: `routine_checklists`**
- **Purpose:** Tracks daily (or per-session) completion status of each step.

| Column             | Type      | Constraints                          |
|--------------------|-----------|--------------------------------------|
| `id`               | UUID (PK) | Primary key.                         |
| `user_profile_id`  | UUID      | FK → `user_profiles.id`.             |
| `routine_step_id`  | UUID      | FK → `routine_steps.id`.             |
| `date`             | Date      | Date for routine completion.         |
| `status`           | Boolean   | Completed or not.                    |
| `created_at`       | Timestamp | Default: `NOW()`.                    |

- **Relationships**  
  - M-to-1 with `routine_steps`.
  - M-to-1 with `user_profiles`.

> **Note:** You could store a `Timestamp` for `date` if you need multiple daily sessions.

---

## 4. **Product Inventory & Ratings**

### **Table: `products`**
- **Purpose:** Central registry of available skincare products (brand, name, etc.).

| Column             | Type      | Constraints                  |
|--------------------|-----------|------------------------------|
| `id`               | UUID (PK) | Primary key.                 |
| `product_name`     | Text      | Name of the product.         |
| `brand_name`       | Text      | Brand of the product.        |
| `default_shelf_life` | Integer | Optional: in days or months. |
| `created_at`       | Timestamp | Default: `NOW()`.            |
| `updated_at`       | Timestamp | On update.                   |

- **Relationships**  
  - 1-to-M with `user_products`.
  - 1-to-M with `ai_analyses`.

---

### **Table: `user_products`**
- **Purpose:** Tracks which products a user currently owns, along with personalized details (purchase/expiry dates).

| Column            | Type      | Constraints                          |
|-------------------|-----------|--------------------------------------|
| `id`              | UUID (PK) | Primary key.                         |
| `user_profile_id` | UUID      | FK → `user_profiles.id`.             |
| `product_id`      | UUID      | FK → `products.id`.                  |
| `purchase_date`   | Date      | When user bought this product.       |
| `expiry_date`     | Date      | When it expires.                     |
| `in_use`          | Boolean   | Whether currently used in routine.   |
| `created_at`      | Timestamp | Default: `NOW()`.                    |
| `updated_at`      | Timestamp | On update.                           |

- **Relationships**  
  - M-to-1 with `user_profiles`.
  - M-to-1 with `products`.
  - 1-to-M with `product_ratings` (if you allow multiple ratings per user per product).

---

### **Table: `product_ratings`**
- **Purpose:** Logs a user’s rating and review for a product.

| Column            | Type      | Constraints                          |
|-------------------|-----------|--------------------------------------|
| `id`              | UUID (PK) | Primary key.                         |
| `user_profile_id` | UUID      | FK → `user_profiles.id`.             |
| `product_id`      | UUID      | FK → `products.id`.                  |
| `rating`          | Integer   | E.g., 1–5 stars.                     |
| `review`          | Text      | Optional user comments.              |
| `created_at`      | Timestamp | Default: `NOW()`.                    |

- **Relationships**  
  - M-to-1 with `user_profiles`.
  - M-to-1 with `products`.

---

## 5. **AI & Ingredient Analysis**

### **Table: `ai_analyses`**
- **Purpose:** Stores AI-generated insights (ingredient flags, routine scores, etc.).

| Column           | Type      | Constraints                            |
|------------------|-----------|----------------------------------------|
| `id`             | UUID (PK) | Primary key.                           |
| `product_id`     | UUID      | FK → `products.id`, nullable.          |
| `user_profile_id`| UUID      | FK → `user_profiles.id`, nullable.     |
| `analysis_type`  | Text      | E.g., "ingredient_flagging", "routine_score". |
| `analysis_result`| Text/JSON | Detailed AI output (ingredient flags, suggestions). |
| `created_at`     | Timestamp | Default: `NOW()`.                      |

- **Relationships**  
  - M-to-1 with `products` (for product-level analysis).
  - M-to-1 with `user_profiles` (for user-level or routine-level analysis).

> **Note:** You could split this into multiple tables for different AI analyses if desired. A single table with a JSON payload is often more flexible.

---

## 6. **In-App Consultations**

### **Table: `consultations`**
- **Purpose:** Manages bookings for expert skincare consultations.

| Column         | Type      | Constraints                                 |
|----------------|-----------|---------------------------------------------|
| `id`           | UUID (PK) | Primary key.                                |
| `user_id`      | UUID      | FK → `users.id`.                            |
| `expert_id`    | UUID      | FK → `experts.id` or FK → `users.id` (if experts are special users). |
| `scheduled_at` | Timestamp | When the consultation is scheduled.         |
| `status`       | Text      | E.g., "scheduled", "completed", "cancelled".|
| `notes`        | Text      | For pre- or post-session notes.            |
| `created_at`   | Timestamp | Default: `NOW()`.                           |
| `updated_at`   | Timestamp | On update.                                  |

- **Relationships**  
  - M-to-1 with `users`.
  - M-to-1 with `experts` or a user in an “expert” role.

---

### **Table: `experts`** (optional)
- **Purpose:** If experts are distinct from normal users, store them here.

| Column         | Type      | Constraints                      |
|----------------|-----------|----------------------------------|
| `id`           | UUID (PK) | Primary key.                     |
| `name`         | Text      | Expert’s name.                   |
| `credentials`  | Text      | E.g., "Board-Certified Derm".    |
| `created_at`   | Timestamp | Default: `NOW()`.                |
| `updated_at`   | Timestamp | On update.                       |

- **Relationships**  
  - 1-to-M with `consultations`.

> **Note:** Alternatively, store experts in the `users` table with a role-based approach (e.g., `role = 'expert'`).

---

## 7. **In-App Payments & Subscriptions**

### **Table: `subscriptions`**
- **Purpose:** Tracks subscription status for premium AI features or consultation credits.

| Column      | Type      | Constraints                               |
|-------------|-----------|-------------------------------------------|
| `id`        | UUID (PK) | Primary key.                              |
| `user_id`   | UUID      | FK → `users.id`.                          |
| `plan_type` | Text      | E.g., "free", "premium_monthly".          |
| `start_date`| Timestamp | When subscription starts.                 |
| `end_date`  | Timestamp | When subscription ends or renews.         |
| `auto_renew`| Boolean   | True if automatically renews.             |
| `status`    | Text      | E.g., "active", "canceled", "expired".    |
| `created_at`| Timestamp | Default: `NOW()`.                         |
| `updated_at`| Timestamp | On update.                                |

- **Relationships**  
  - M-to-1 with `users`.

---

### **Table: `payments`** (optional)
- **Purpose:** Logs individual payment transactions (Stripe, PayPal, etc.).

| Column            | Type      | Constraints                        |
|-------------------|-----------|------------------------------------|
| `id`              | UUID (PK) | Primary key.                       |
| `user_id`         | UUID      | FK → `users.id`.                   |
| `subscription_id` | UUID      | FK → `subscriptions.id`, nullable if one-time purchase. |
| `payment_method`  | Text      | E.g., "Stripe", "PayPal".          |
| `amount`          | Numeric   | Amount charged.                    |
| `currency`        | Text      | E.g., "USD".                       |
| `transaction_date`| Timestamp | When payment was processed.        |
| `transaction_status`| Text    | E.g., "completed", "failed".       |
| `created_at`      | Timestamp | Default: `NOW()`.                  |

- **Relationships**  
  - M-to-1 with `users`.
  - M-to-1 with `subscriptions`.

---

## 8. **Notifications & Reminders** (Optional Enhancement)

### **Table: `notifications`**
- **Purpose:** Manages scheduled or triggered notifications (routine reminders, product expiry alerts, etc.).

| Column                   | Type      | Constraints                               |
|--------------------------|-----------|-------------------------------------------|
| `id`                     | UUID (PK) | Primary key.                              |
| `user_profile_id`        | UUID      | FK → `user_profiles.id`.                  |
| `notification_type`      | Text      | E.g., "routine_reminder", "expiry_alert". |
| `title`                  | Text      | Notification title.                       |
| `message`                | Text      | Main message body.                        |
| `scheduled_at`           | Timestamp | When the notification should be sent.     |
| `sent_at`                | Timestamp | Filled in once notification is sent.      |
| `status`                 | Text      | E.g., "pending", "sent".                  |
| `created_at`             | Timestamp | Default: `NOW()`.                         |

- **Relationships**  
  - M-to-1 with `user_profiles`.

---

## 9. **Entity Relationship Overview**

A simplified illustration of the relationships:

```
users (1) ---- (1) user_profiles ---- (M) skin_type_quizzes

user_profiles (1) ---- (M) routines ---- (M) routine_steps ---- (M) routine_checklists

user_profiles (1) ---- (M) user_products ---- (M) product_ratings
                \                      /
                 \                    /
                   (M) products

products (1) ---- (M) ai_analyses
user_profiles (1) ---- (M) ai_analyses

users (1) ---- (M) consultations ---- (M) experts (optional)

users (1) ---- (M) subscriptions ---- (M) payments (optional)

```

---

## 10. **Summary**

1. **Users & Profiles**  
   - `users` for authentication data; `user_profiles` for extended info.

2. **Skin Tracking & Habits**  
   - `routines` and `routine_steps` define a user’s routine structure.  
   - `routine_checklists` tracks daily completion for each step.

3. **Products & Ratings**  
   - `products` stores general product info.  
   - `user_products` links products to a specific user’s inventory.  
   - `product_ratings` logs user feedback.

4. **AI Insights**  
   - `ai_analyses` holds ingredient or routine analysis results (in JSON).

5. **Consultations & Monetization**  
   - `consultations` manages expert bookings.  
   - `subscriptions` and `payments` handle premium plans and transactions.

This design provides a robust, scalable foundation for **Skin Tracker** in **Supabase/PostgreSQL**, aligning with the PRD requirements for **habit tracking**, **product management**, **AI insights**, and **expert consultations**.

