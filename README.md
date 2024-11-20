# Mini CRM & Campaign Management App 

This repository contains the Mini CRM & Campaign Management App built as part of the SDE Internship assignment for Xeno. The application implements core CRM functionalities, enabling data ingestion, audience segmentation, and campaign management, aligned with Xeno's mission of delivering meaningful, data-driven customer interactions.

---
![Xeno Harsh Agrawal  drawio](https://github.com/user-attachments/assets/a2ab4ed1-a67f-49d4-a9fc-ae17ead028ee)

## Demonstration
# Demo Video
A narrated video showcasing the app’s features and functionality is included in the submission.
https://www.youtube.com/watch?v=DfiXCQ4LiIw



## Features 

### 1. **Data Ingestion API**  
- APIs to accept and store customer and order data in a database.  
- Demonstration via Postman for data validation and successful population of tables.  
- **Bonus:** Implemented a scalable pub-sub architecture using a message broker for validated data.

### 2. **Campaign & Audience Management**  
- **Audience Segmentation:**  
  - Define audience segments using AND/OR logic across multiple conditions such as:  
    - Total spending > INR 10,000  
    - Spending > INR 10,000 and visits <= 3  
    - Customers inactive for the last 3 months  
  - Real-time calculation of audience size before saving.  

- **Campaign History & Stats:**  
  - Google-based authentication for secure access.  
  - View past campaigns in reverse chronological order.  

- **Message Sending:**  
  - Save audience data in a `communications_log` table.  
  - Dummy API to send personalized messages (e.g., “Hi [Name], here’s 10% off on your next order!”).  
  - Integrated “Delivery Receipt” API to update communication statuses with randomized delivery results (90% SENT, 10% FAILED).  
  - **Bonus:** Batched database updates via pub-sub model.  
  - Campaign statistics displayed, including audience size, sent messages, and failures.

---

## Tech Stack 

- **Frontend:** React.js  
- **Backend:** Node.js  
- **Database:** MongoDB

---


