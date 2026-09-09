# OBD Dashboard - Python Version

A Python-based OBD (On-Board Diagnostics) monitoring system for your VW Jetta 2016 using Flask backend instead of Node.js.

## 🔄 Python vs Node.js

| Feature | Python | Node.js |
|---------|--------|---------|
| **Setup** | Easier for beginners | Faster performance |
| **Learning Curve** | Gentler | Steeper |
| **Performance** | Good for most use cases | Better for high-traffic |
| **Libraries** | Rich ecosystem (numpy, pandas) | Specialized packages |
| **Deployment** | Easy (PyPI, virtual env) | Package.json based |

This Python version uses:
- **Flask** - Lightweight web framework
- **PyOBD** - OBD protocol library
- **SQLite** - Local database (optional)

---

## 🚀 Quick Start (Python Backend)

### Prerequisites
- Python 3.8+ installed
- pip (Python package manager)
- Same Android app & web dashboard work!

### Installation

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Run the server:**
```bash
python app.py
```

✅ Backend running at `http://localhost:3000`

---

## 🔧 Python Backend Features

### Flask Server Endpoints
- `GET /api/health` - Health check
- `GET /api/vehicle/data` - Get vehicle data
- `POST /api/vehicle/data` - Update vehicle data
- `GET /api/alerts` - Get alerts
- `POST /api/alerts/clear` - Clear alerts
- `GET /api/dtc` - Get DTC codes

### OBD Data Reading
```python
from pyobd import OBDCommand, OBDPort

# Connect to OBD device
port = OBDPort("/dev/ttyUSB0", 38400, 2)

# Read RPM
rpm = port.read_rpm()

# Read Temperature
temp = port.read_temp()
```

### Database Support (Optional)
- SQLite for local storage
- Track historical data
- Export logs

---

## 📁 Python Project Structure

```
ODB_Dashboard/
├── backend/
│   ├── app.py                 # Main Flask app
│   ├── requirements.txt       # Python dependencies
│   ├── config.py             # Configuration
│   ├── models/
│   │   └── vehicle.py        # Data models
│   ├── routes/
│   │   ├── api.py            # API endpoints
│   │   └── obd.py            # OBD handling
│   └── utils/
│       └── alerts.py         # Alert logic
│
├── android-agent/            # Flutter app (same)
├── dashboard/                # Web dashboard (same)
├── README.md
└── SETUP.md
```

---

## 💻 Python Dependencies

```
Flask==2.3.0
Flask-CORS==3.0.10
pyobd==1.1.0
python-dotenv==0.21.0
SQLAlchemy==2.0.0
```

Install all at once:
```bash
pip install -r requirements.txt
```

---

## 🎯 Which Should You Choose?

**Choose Python if:**
- ✅ You're learning to code
- ✅ You want easier setup
- ✅ You like Python ecosystem
- ✅ You plan to add data analysis
- ✅ You want to add machine learning

**Choose Node.js if:**
- ✅ You need better performance
- ✅ You're already familiar with JavaScript
- ✅ You want faster response times
- ✅ You want to scale easily

**Good News:** Both versions share the same Android app and web dashboard!

---

Would you like me to create the Python version? I can create:

1. **Python Flask backend** (app.py)
2. **OBD data models** (vehicle.py)
3. **API routes** (api.py, obd.py)
4. **Database models** (SQLAlchemy)
5. **requirements.txt** (all dependencies)
6. **Config files** (.env example)

The Android app and web dashboard will work exactly the same!
