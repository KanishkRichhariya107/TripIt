# TripIt

🚀 **A personalized trip itinerary generator using AI and real-time travel data aggregation.**

---

## **Features**
- AI-generated itineraries using ChatGPT API.
- Real-time travel package data from platforms like MakeMyTrip.
- User input for destination, budget, dates, and interests.
- Interactive UI to view/edit itineraries and compare travel deals.

---

## **Quick Start**

### **Prerequisites**
- Node.js ≥ v16
- MongoDB Atlas URI
- OpenAI API Key
- Travel platform API keys

### **Installation**
1. **Clone the repo:**
   ```bash
   git clone https://github.com/KanishkRichhariya107/TripIt.git
   cd TripIt
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

---

## **Configuration**
1. **Backend Environment (.env):**
   ```
   MONGO_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_key
   PORT=5000
   ```

---

## **Run the App**
1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd ../frontend
   npm run dev
   ```

---

## **Tech Stack**
- **Frontend:** React
- **Backend:** Node.js, Express, MongoDB
- **AI:** OpenAI ChatGPT API

---

## **Contributing**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

📄 **License:** [MIT LICENSE](LICENSE)
