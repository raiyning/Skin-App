# **Skin Tracker App – Product Requirements Document (PRD)**

## **TL;DR**

**Skin Tracker** is a mobile app that helps users build better skincare habits, track their skin’s progress, and receive AI-powered insights alongside expert guidance. By integrating **habit tracking**, **product inventory management**, **AI-driven ingredient analysis**, and **in-app consultations**, Skin Tracker empowers users to make informed decisions about their skin health. Built on **React Native** with a **Supabase backend**, the app is designed to scale to millions of users while maintaining seamless performance.

---

## **1. Problem Statement**

Millions of people struggle with managing their skincare routines and understanding which products actually work for their skin type. Current solutions often lack personalization, rely heavily on manual tracking, and fail to provide actionable insights. Furthermore, users with sensitive skin or specific concerns are left navigating complex ingredient lists without expert guidance.

**Skin Tracker** solves these problems by offering **personalized, AI-driven insights** combined with expert consultations, habit-building tools, and an easy-to-use product management system. Users can confidently track their skincare journey, adjust routines based on data, and see real progress over time.

---

## **2. Goals**

### **2.1 Business Goals**
- **Monetize through Subscriptions & Consultations:** Generate revenue via premium AI analytics and expert skincare consultations.
- **Build a Scalable, High-Performance App:** Ensure the platform can handle **1M+ monthly active users** with minimal latency.
- **Foster User Engagement & Retention:** Drive consistent usage through habit tracking, progress visualization, and personalized insights.

### **2.2 User Goals**
- **Personalized Skincare Guidance:** Help users discover what works for their unique skin through quizzes, AI insights, and expert feedback.
- **Track Progress Over Time:** Enable users to monitor their skincare habits and visually track improvements.
- **Simplify Routine Management:** Provide easy ways to manage products, set reminders, and receive alerts for product expirations.

### **2.3 Non-Goals**
- **No Photo-Based Skin Analysis (for MVP):** While future iterations may integrate computer vision, this won’t be included in the MVP.
- **No In-App Advertising:** The initial focus will be on subscriptions and consultations, not ad monetization.

---

## **3. User Stories**

### **Epic 1: User Onboarding & Authentication**
- *As a user,* I want to sign up using my Google, Apple, or email account, so that I can quickly access the app.
- *As a user,* I want to set up my profile with my skin goals and preferences, so the app can give me personalized recommendations.

### **Epic 2: Skin Profile & Quiz**
- *As a user,* I want to take an interactive quiz to identify my skin type, so I can tailor my skincare routine accordingly.
- *As a user,* I want to retake the skin type quiz anytime, so I can update my routine if my skin changes.

### **Epic 3: Habit Tracking & Checklist**
- *As a user,* I want to create a daily skincare checklist, so I can stay consistent with my routine.
- *As a user,* I want reminders for my skincare routine, so I don’t forget important steps.
- *As a user,* I want to see my skincare habit streaks, so I feel motivated to stay consistent.

### **Epic 4: Product Inventory Management**
- *As a user,* I want to add products to my inventory, so I can track what I’m using.
- *As a user,* I want to get alerts when a product is about to expire, so I don’t use expired products.
- *As a user,* I want to rate products based on how they worked for me, so I can remember which ones to repurchase.

### **Epic 5: AI & Expert Insights**
- *As a user,* I want AI to analyze my products’ ingredients, so I know what’s good or bad for my skin.
- *As a user,* I want personalized routine suggestions from AI, so I can optimize my skincare.
- *As a user,* I want the option to consult with skincare experts, so I can get professional advice.

### **Epic 6: In-App Payments & Monetization**
- *As a user,* I want to subscribe to premium features for detailed AI reports and insights.
- *As a user,* I want to book expert consultations directly within the app.

---

## **4. User Experience**

### **4.1 Onboarding Flow**
1. **Sign-Up/Login Screen:** Users choose between **Google**, **Apple**, or **email** sign-up.
2. **Profile Setup:** Users input their **name**, **skin goals** (e.g., reduce acne, improve hydration), and select preferences for notifications.
3. **Skin Type Quiz:** An engaging, interactive quiz helps determine skin type (oily, dry, combination, sensitive).
4. **Home Dashboard:** After onboarding, users are taken to a clean dashboard showing:
   - Today’s **habit checklist**
   - Quick links to **product inventory**
   - AI insights teaser (premium upsell)

### **4.2 Daily Routine & Habit Tracking**
- **Checklist View:** Simple UI with swipe-to-complete for each skincare step.
- **Reminders:** Push notifications prompt users to complete routines.
- **Progress Visualization:** Graphs show **weekly/monthly streaks** and habit consistency.

### **4.3 Product Inventory & AI Insights**
- **Add Products:** Users can manually add products or scan barcodes (future feature).
- **Ingredient Analysis:** AI evaluates ingredients, flags irritants, and provides a **“chemistry score”** for the entire routine.
- **Routine Rating:** AI assigns a health score based on product compatibility with the user’s skin type.

### **4.4 Graphical Insights & Reports**
- **Skin Progress Graphs:** Visualizations of skin health over time.
- **Ingredient Impact Reports:** AI-generated reports showing how specific ingredients affect the user’s skin.
- **Comparison Tool:** Users can compare past routines to current ones to see improvements.

### **4.5 Payments & Subscriptions**
- **Subscription Upsell Screens:** Highlight premium features like detailed reports and expert consultations.
- **Payment Integration:** Secure payments via **Stripe** and **PayPal**, with in-app purchase options for iOS and Android.

---

## **5. Narrative**

Imagine Sarah, a 28-year-old marketing professional struggling with unpredictable breakouts and inconsistent skincare habits. She downloads **Skin Tracker** after seeing a friend’s glowing skin progress on social media. 

Upon signing up, Sarah takes a quick skin type quiz and learns she has combination skin prone to sensitivity. She adds her daily products to the app, and the **AI immediately flags** two ingredients in her cleanser that could be irritating her skin type.

With **customized reminders**, Sarah begins sticking to her routine. After two weeks, she sees a clear improvement in her skin’s hydration levels, visualized on her **progress dashboard**. She books a virtual consultation with a dermatologist through the app, who helps refine her product choices even further.

Sarah subscribes to **premium insights** for more advanced ingredient analysis and shares her glowing results with her friends, bringing more users to the app.

---

## **6. Success Metrics**

1. **User Engagement:**
   - **Daily Active Users (DAU)** vs **Monthly Active Users (MAU)** – Target **20% DAU/MAU ratio** within 3 months.
   - **Average Daily Sessions per User:** Aim for **1.5+ sessions/day**.

2. **Monetization:**
   - **Subscription Conversion Rate:** Aim for **5%** of users upgrading to premium within the first month.
   - **Consultation Bookings:** Target **100 consultations** in the first quarter post-launch.

3. **Retention & Satisfaction:**
   - **7-Day Retention:** Target **35%** retention after one week.
   - **User NPS (Net Promoter Score):** Achieve **+40** in the first 6 months.

4. **AI Performance:**
   - **Ingredient Analysis Accuracy:** AI ingredient scoring with **85%+ user trust ratings**.
   - **Response Time:** AI analysis delivered in **under 3 seconds**.

---

## **7. Technical Considerations**

### **7.1 Tech Stack**
- **Frontend:** React Native (with **Expo** for faster development)
- **Backend:** Supabase (PostgreSQL for database, Supabase Auth for authentication)
- **AI & ML:** TensorFlow.js or OpenAI API for ingredient analysis and recommendations
- **Payments:** Stripe, PayPal, Apple Pay, Google Play Billing
- **Notifications:** Firebase Cloud Messaging (FCM)

### **7.2 Scalability**
- Use **serverless functions (Supabase Edge/AWS Lambda)** for AI inference and scalable backend operations.
- Handle **1M+ monthly active users** with Supabase’s auto-scaling features.
- **CDN (Cloudflare/Supabase Edge)** for fast content delivery globally.

### **7.3 Security & Compliance**
- **OAuth 2.0** authentication (Google, Apple, Email) with **JWT tokens**.
- Store **PII securely** using **AES-256 encryption**.
- Ensure **GDPR, CCPA, and HIPAA compliance**.
- **Automatic logout** after 15 minutes of inactivity.

---

## **8. Milestones & Sequencing**

1. **Phase 1: Research & Planning (4 Weeks)**
   - Finalize features for MVP.
   - Conduct competitive analysis and user interviews.
  
2. **Phase 2: MVP Development (12-16 Weeks)**
   - **Weeks 1-4:** User authentication, profile setup, and skin type quiz.
   - **Weeks 5-8:** Habit tracking, reminders, and basic product inventory.
   - **Weeks 9-12:** AI ingredient analysis and graphical insights.
   - **Weeks 13-16:** In-app payments, subscriptions, and consultations.

3. **Phase 3: Beta Testing & Refinement (8 Weeks)**
   - Closed beta with 100-200 users.
   - Feedback loops, bug fixes, and performance optimization.

4. **Phase 4: Launch & Growth (Ongoing)**
   - Full launch with marketing campaigns.
   - Monitor success metrics, iterate on features, and scale infrastructure.

---

## **9. Risks & Mitigation**

1. **Technical Risks:**
   - **Scalability Issues:** Use serverless architecture (Supabase, AWS Lambda) for elastic scaling.
   - **AI Trust & Accuracy:** Regularly update AI models with expert-backed datasets.

2. **Business Risks:**
   - **Low User Adoption:** Prioritize user feedback and refine the core value proposition.
   - **Monetization Resistance:** Offer clear value in premium features and free trials to encourage upgrades.

3. **Security Risks:**
   - **Data Breaches:** Implement AES-256 encryption, OAuth 2.0, and regular security audits.

---

## **10. Conclusion**

**Skin Tracker** is set to revolutionize personal skincare by combining **habit tracking**, **AI-powered insights**, and **expert consultations** into a seamless, user-friendly app. With a focus on **scalability**, **data security**, and **monetization**, the app is poised for long-term growth and user engagement.

---
