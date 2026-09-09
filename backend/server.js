const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (replace with Firebase later)
let vehicleData = {
  lastUpdate: null,
  engine: {
    rpm: 0,
    temperature: 0,
    load: 0,
    fuelPressure: 0
  },
  emissions: {
    o2Sensors: [],
    catalyticConverterStatus: 'good',
    egr: 0
  },
  transmission: {
    gear: 'P',
    fluidTemp: 0
  },
  alerts: [],
  dtcCodes: []
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Get current vehicle data
app.get('/api/vehicle/data', (req, res) => {
  res.json({
    success: true,
    data: vehicleData,
    timestamp: new Date()
  });
});

// Update vehicle data (from Android agent)
app.post('/api/vehicle/data', (req, res) => {
  try {
    const newData = req.body;
    
    // Merge with existing data
    vehicleData = {
      ...vehicleData,
      ...newData,
      lastUpdate: new Date()
    };

    // Check for alerts
    const alerts = checkForAlerts(vehicleData);
    vehicleData.alerts = alerts;

    console.log('[OBD] Data received:', {
      rpm: vehicleData.engine.rpm,
      temp: vehicleData.engine.temperature,
      alerts: alerts.length
    });

    res.json({
      success: true,
      message: 'Data updated successfully',
      alerts: alerts
    });
  } catch (error) {
    console.error('[OBD] Error updating data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get alerts
app.get('/api/alerts', (req, res) => {
  res.json({
    success: true,
    alerts: vehicleData.alerts,
    totalAlerts: vehicleData.alerts.length
  });
});

// Get DTC (Diagnostic Trouble Codes)
app.get('/api/dtc', (req, res) => {
  res.json({
    success: true,
    codes: vehicleData.dtcCodes,
    totalCodes: vehicleData.dtcCodes.length
  });
});

// Clear alerts
app.post('/api/alerts/clear', (req, res) => {
  vehicleData.alerts = [];
  vehicleData.dtcCodes = [];
  res.json({
    success: true,
    message: 'Alerts cleared'
  });
});

// Alert checking logic
function checkForAlerts(data) {
  const alerts = [];

  // Engine temperature alert
  if (data.engine.temperature > 100) {
    alerts.push({
      id: 'TEMP_HIGH',
      severity: data.engine.temperature > 110 ? 'critical' : 'warning',
      message: `Engine temperature high: ${data.engine.temperature}°C`,
      timestamp: new Date(),
      icon: '🌡️'
    });
  }

  // RPM alert
  if (data.engine.rpm > 6000) {
    alerts.push({
      id: 'RPM_HIGH',
      severity: 'warning',
      message: `High RPM: ${data.engine.rpm}`,
      timestamp: new Date(),
      icon: '⚡'
    });
  }

  // Engine load alert
  if (data.engine.load > 90) {
    alerts.push({
      id: 'LOAD_HIGH',
      severity: 'warning',
      message: `Engine load critical: ${data.engine.load}%`,
      timestamp: new Date(),
      icon: '📊'
    });
  }

  // Transmission temperature alert
  if (data.transmission.fluidTemp > 90) {
    alerts.push({
      id: 'TRANS_TEMP',
      severity: 'warning',
      message: `Transmission fluid temperature high: ${data.transmission.fluidTemp}°C`,
      timestamp: new Date(),
      icon: '⚙️'
    });
  }

  // O2 Sensor issues
  if (data.emissions.o2Sensors.some(sensor => sensor.status === 'failed')) {
    alerts.push({
      id: 'O2_SENSOR_FAILED',
      severity: 'critical',
      message: 'O2 Sensor failure detected',
      timestamp: new Date(),
      icon: '💨'
    });
  }

  return alerts;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[OBD] Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  OBD Dashboard Backend                 ║
║  Running on http://localhost:${PORT}     ║
║  Ready to receive OBD data             ║
╚════════════════════════════════════════╝
  `);
});
