# 🚗 OBD Dashboard for Cars

A comprehensive **real-time OBD (On-Board Diagnostics) monitoring system** for your VW Jetta 2016. Monitor your vehicle's health, get instant alerts for warnings, and view all diagnostic data from any device - PC, tablet, or phone.

## ✨ Features

- **🔗 Real-time OBD Data Sync** - Connect your Veepeak Bluetooth OBD scanner to an old Android phone
- **⚠️ Smart Alerts & Notifications** - Get visual warnings for engine, transmission, and emissions issues (both good and bad status)
- **📱 Beautiful Web Dashboard** - Responsive interface that works on PC, tablet, and mobile browsers
- **🤖 Android Agent App** - Lightweight Flutter app running on your old Android phone
- **☁️ Cloud/Local Sync** - Data synchronization (free backend)
- **📈 Historical Data** - Track vehicle performance over time
- **🌐 Multi-device Access** - View data from multiple devices on same network

## 🎯 Why This Project?

You can get a professional OBD scanner for your VW Jetta 2016 and build a custom dashboard that:
- Shows real-time engine metrics (RPM, temperature, load, fuel pressure)
- Monitors transmission health (gear, fluid temperature)
- Tracks emissions (O2 sensors, catalytic converter status)
- Generates intelligent alerts
- All completely free and open-source!

## 🏗️ System Architecture

```
┌──────────────────────────────┐
│  Veepeak OBD Bluetooth        │
│  Scanner                      │
└──────────────┬────────────────┘
               │
               ↓
┌──────────────────────────────┐
│  Old Android Phone           │
│  (Flutter Agent App)         │
│  • Reads OBD data            │
│  • Beautiful UI              │
│  • Syncs to backend          │
└──────────────┬────────────────┘
               │
               ↓
┌──────────────────────────────┐
│  Backend API Server          │
│  (Node.js + Express)         │
│  • Port 3000                 │
│  • REST API endpoints        │
│  • Data processing           │
│  • Alert generation          │
└──────────────┬────────────────┘
               │
       ┌───────┴────────┐
       ↓                ↓
┌─────────────┐  ┌──────────────┐
│  Web        │  │  Mobile      │
│  Dashboard  │  │  Dashboard   │
│  (PC)       │  │  (Phone)     │
└─────────────┘  └──────────────┘
```

## 🚀 Quick Start

### Prerequisites
- VW Jetta 2016 (or any OBD-II compatible vehicle)
- Veepeak OBD Bluetooth Scanner (~$30-40)
- Old Android phone (Android 6.0+)
- PC with Node.js installed
- Web browser

### Installation (5 minutes)

**1. Clone & Setup Backend**
```bash
cd backend
npm install
npm start
# Server running on http://localhost:3000
```

**2. Setup Android Agent**
```bash
cd android-agent
flutter pub get
flutter run
# App runs on your Android phone
```

**3. Open Web Dashboard**
- Open `dashboard/index.html` in any browser
- Or use Python server: `python -m http.server 8000 --directory dashboard`

**4. Configure & Connect**
- In Android app, enter backend URL (e.g., `http://192.168.1.100:3000`)
- Tap "Connect OBD"
- Tap "Sync to Dashboard"
- View live data on web dashboard!

## 📊 Dashboard Metrics

### 🔊 Engine Information
- **RPM** - Engine revolutions per minute
- **Coolant Temperature** - Engine operating temperature
- **Engine Load** - Current load percentage
- **Fuel Pressure** - Fuel system pressure

### ⚙️ Transmission Info
- **Current Gear** - P, R, N, D, S, L
- **Fluid Temperature** - Transmission health indicator

### 💨 Emissions Status
- **O2 Sensor Status** - Oxygen sensor health
- **Catalytic Converter** - Emission control efficiency
- **EGR Status** - Exhaust gas recirculation

### ⚠️ Alerts System

Real-time alerts for:
- 🌡️ **High Engine Temperature** (>100°C warning, >110°C critical)
- ⚡ **High RPM** (>6000 rpm)
- 📊 **High Engine Load** (>90%)
- ⚙️ **Transmission Overheating** (>90°C)
- 💨 **O2 Sensor Failure**
- 🔴 **Diagnostic Trouble Codes (DTC)**

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Backend** | Node.js + Express | API server & data processing |
| **Android** | Flutter | Mobile app for OBD reading |
| **Frontend** | HTML5/CSS3/JavaScript | Web dashboard |
| **Database** | In-memory (upgradeable to Firebase) | Data storage |
| **Communication** | REST API + JSON | Data exchange |

## 📁 Project Structure

```
ODB_Dashboard/
│
├── backend/                    # Node.js API Server
│   ├── server.js              # Main Express server
│   ├── package.json           # Dependencies
│   └── .env.example           # Config template
│
├── android-agent/             # Flutter Mobile App
│   ├── lib/
│   │   ├── main.dart          # App entry point
│   │   ├── providers/         # State management
│   │   ├── services/          # API & Bluetooth
│   │   ├── models/            # Data structures
│   │   ├── screens/           # UI screens
│   │   └── widgets/           # Reusable components
│   ├── pubspec.yaml           # Flutter config
│   └── .gitignore
│
├── dashboard/                 # Web Dashboard
│   ├── index.html             # Main page
│   ├── styles.css             # Styling
│   ├── script.js              # Interactive logic
│   └── README.md
│
├── README.md                  # This file
├── SETUP.md                   # Detailed setup guide
└── .gitignore
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/vehicle/data` | Get current vehicle data |
| POST | `/api/vehicle/data` | Update vehicle data (from Android) |
| GET | `/api/alerts` | Get all current alerts |
| POST | `/api/alerts/clear` | Clear all alerts |
| GET | `/api/dtc` | Get diagnostic trouble codes |

## 🌐 Network Setup

### Local Network (Same WiFi)
```
PC (Backend + Dashboard)  ←→  Android Phone (Agent)
         192.168.1.100:3000  ←→  192.168.1.101
```

1. Find your PC's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Enter in Android app: `http://192.168.1.100:3000`
3. Both devices on same WiFi network

### Remote Access
Use ngrok for tunneling:
```bash
ngrok http 3000
# Get public URL and use in Android app
```

## 📱 Android Agent Features

- ✅ Bluetooth connectivity to Veepeak scanner
- ✅ Real-time OBD parameter reading
- ✅ Beautiful status indicators
- ✅ Auto-sync capability (every 10 seconds)
- ✅ Configurable backend URL
- ✅ Alert display
- ✅ Simple, intuitive UI

## 💻 Web Dashboard Features

- ✅ Real-time data display
- ✅ Auto-refresh every 10 seconds
- ✅ Color-coded alerts (green=good, orange=warning, red=critical)
- ✅ Responsive design (works on all devices)
- ✅ Connection status indicator
- ✅ Manual refresh button
- ✅ Clear alerts function
- ✅ Timestamp tracking

## ⚙️ Configuration

### Backend Environment Variables
```env
PORT=3000                    # Server port
NODE_ENV=development         # Environment
FIREBASE_PROJECT_ID=xxx      # (Optional) Firebase config
```

### Android Agent Settings
- Backend URL configuration
- Auto-sync interval (default: 10 seconds)
- Bluetooth device selection

## 🔒 Security & Privacy

✅ **Data Privacy:**
- All data stored locally first
- No cloud storage by default
- You control all information
- Can be run entirely offline on local network

⚠️ **For Production:**
- Use HTTPS instead of HTTP
- Implement API authentication
- Add rate limiting
- Validate all inputs
- Use environment variables for sensitive data

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 3000 is in use
# Try different port:
PORT=3001 npm start
```

### Android Can't Connect
- Verify both devices on same WiFi
- Check firewall settings
- Verify correct IP address
- Restart Bluetooth on both devices

### Dashboard Not Updating
- Check backend URL is correct
- Verify backend is running
- Check Android app is syncing
- Try manual refresh button

### Bluetooth Connection Issues
- Enable Bluetooth on phone
- Pair Veepeak scanner first
- Grant location permission
- Restart app and Bluetooth

See **SETUP.md** for more detailed troubleshooting.

## 🎓 Learning & Customization

This project is perfect for learning:
- **Backend:** Node.js, Express, REST APIs
- **Mobile:** Flutter, Bluetooth connectivity, state management
- **Frontend:** HTML/CSS/JavaScript, responsive design
- **IoT:** OBD-II protocol, real-time data handling
- **Architecture:** Full-stack application design

### Extend the Project
- Add database support (Firebase, MongoDB)
- Implement user authentication
- Add data logging & analytics
- Create mobile app for iOS
- Deploy to cloud
- Add historical graphs
- Implement push notifications

## 📚 Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Express.js Guide](https://expressjs.com/)
- [OBD-II Protocol](https://en.wikipedia.org/wiki/On-board_diagnostics)
- [Veepeak Scanner Manual](https://www.veepeak.com/)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Improve documentation
- Submit pull requests

## 📄 License

MIT License - Feel free to use this for personal or commercial projects!

## 👨‍💻 Author

Created by **miSamant** for VW Jetta 2016 enthusiasts

## 🎯 Future Enhancements

- [ ] Data visualization with charts
- [ ] Trip history and fuel economy tracking
- [ ] Predictive maintenance alerts
- [ ] Cloud backup and sync
- [ ] Multi-vehicle support
- [ ] Custom alert thresholds
- [ ] iOS mobile app
- [ ] Web API documentation (Swagger)
- [ ] Database integration
- [ ] User authentication

## ❓ FAQ

**Q: Will this work with my car?**
A: Yes! Any vehicle with OBD-II port (all cars from 1996+) will work.

**Q: Do I need internet?**
A: No! Everything runs on local network. Internet optional for remote access.

**Q: Can I use new Android phone instead of old one?**
A: Yes! Any Android 6.0+ device works.

**Q: Is it safe to use while driving?**
A: Dashboard is safe, but don't read details while driving. Keep eyes on road!

**Q: Can I share this with friends?**
A: Yes! The APK can be shared and installed on other phones.

---

## 🚗 Let's Monitor Your Jetta!

Get your Veepeak OBD scanner today and start monitoring your VW Jetta 2016 like a pro!

**Questions?** Check [SETUP.md](SETUP.md) for detailed setup instructions.

---

**Made with ❤️ for car enthusiasts** 🚗💨
