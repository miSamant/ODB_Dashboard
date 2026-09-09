let autoRefreshInterval = null;
const REFRESH_INTERVAL = 10000; // 10 seconds

// Connect to dashboard
async function connectDashboard() {
  const backendUrl = document.getElementById('backendUrl').value;
  
  if (!backendUrl) {
    alert('Please enter backend URL');
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/api/health`);
    if (response.ok) {
      updateStatus(true, 'Connected');
      refreshData();
      startAutoRefresh();
    } else {
      updateStatus(false, 'Connection Failed');
    }
  } catch (error) {
    updateStatus(false, 'Connection Error');
    console.error('Connection error:', error);
  }
}

// Refresh vehicle data
async function refreshData() {
  const backendUrl = document.getElementById('backendUrl').value;
  
  if (!backendUrl) return;

  try {
    const response = await fetch(`${backendUrl}/api/vehicle/data`);
    const result = await response.json();

    if (result.success && result.data) {
      updateDashboard(result.data);
      updateLastUpdate();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Update dashboard with vehicle data
function updateDashboard(data) {
  // Engine data
  document.getElementById('rpm').textContent = data.engine.rpm.toFixed(0);
  document.getElementById('temp').textContent = data.engine.temperature.toFixed(1);
  document.getElementById('load').textContent = data.engine.load.toFixed(1);
  document.getElementById('fuelPressure').textContent = data.engine.fuelPressure.toFixed(1);

  // Transmission data
  document.getElementById('gear').textContent = data.transmission.gear;
  document.getElementById('transTemp').textContent = data.transmission.fluidTemp.toFixed(1);

  // Emissions data
  const o2Status = data.emissions.o2Sensors.every(s => s.status === 'good') ? '✓ Good' : '⚠️ Check';
  document.getElementById('o2Status').textContent = o2Status;
  document.getElementById('catStatus').textContent = data.emissions.catalyticConverterStatus === 'good' ? '✓ Good' : '⚠️ Check';

  // Alerts
  updateAlerts(data.alerts);
}

// Update alerts display
function updateAlerts(alerts) {
  const container = document.getElementById('alertsContainer');
  container.innerHTML = '';

  if (alerts.length === 0) {
    container.innerHTML = '<div class="alert-item alert-info"><span>✓ All systems normal</span></div>';
    return;
  }

  alerts.forEach(alert => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-item alert-${alert.severity === 'critical' ? 'error' : 'warning'}`;
    alertDiv.innerHTML = `<span>${alert.icon} ${alert.message}</span>`;
    container.appendChild(alertDiv);
  });
}

// Update status indicator
function updateStatus(connected, message) {
  const indicator = document.getElementById('statusIndicator');
  const dot = indicator.querySelector('.status-dot');
  
  if (connected) {
    dot.className = 'status-dot connected';
  } else {
    dot.className = 'status-dot disconnected';
  }
  
  indicator.querySelector('span:last-child').textContent = message;
}

// Update last update timestamp
function updateLastUpdate() {
  const now = new Date();
  document.getElementById('lastUpdate').textContent = now.toLocaleTimeString();
}

// Start auto-refresh
function startAutoRefresh() {
  if (autoRefreshInterval) clearInterval(autoRefreshInterval);
  autoRefreshInterval = setInterval(refreshData, REFRESH_INTERVAL);
}

// Clear alerts
async function clearAlerts() {
  const backendUrl = document.getElementById('backendUrl').value;
  
  try {
    await fetch(`${backendUrl}/api/alerts/clear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    refreshData();
  } catch (error) {
    console.error('Error clearing alerts:', error);
  }
}

// Initialize
window.addEventListener('load', () => {
  updateStatus(false, 'Disconnected');
  updateLastUpdate();
});

window.addEventListener('beforeunload', () => {
  if (autoRefreshInterval) clearInterval(autoRefreshInterval);
});
