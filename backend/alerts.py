"""
Alert checking logic
"""
from models import Alert

def check_alerts(vehicle_data):
    """Check vehicle data for alerts"""
    alerts = []
    
    # Engine temperature alert
    if vehicle_data['engine']['temperature'] > 100:
        severity = 'critical' if vehicle_data['engine']['temperature'] > 110 else 'warning'
        alert = Alert(
            'TEMP_HIGH',
            severity,
            f"Engine temperature high: {vehicle_data['engine']['temperature']}°C",
            '🌡️'
        )
        alerts.append(alert.to_dict())
    
    # RPM alert
    if vehicle_data['engine']['rpm'] > 6000:
        alert = Alert(
            'RPM_HIGH',
            'warning',
            f"High RPM: {vehicle_data['engine']['rpm']}",
            '⚡'
        )
        alerts.append(alert.to_dict())
    
    # Engine load alert
    if vehicle_data['engine']['load'] > 90:
        alert = Alert(
            'LOAD_HIGH',
            'warning',
            f"Engine load critical: {vehicle_data['engine']['load']}%",
            '📊'
        )
        alerts.append(alert.to_dict())
    
    # Transmission temperature alert
    if vehicle_data['transmission']['fluid_temp'] > 90:
        alert = Alert(
            'TRANS_TEMP',
            'warning',
            f"Transmission fluid temperature high: {vehicle_data['transmission']['fluid_temp']}°C",
            '⚙️'
        )
        alerts.append(alert.to_dict())
    
    # O2 Sensor issues
    o2_sensors = vehicle_data['emissions'].get('o2_sensors', [])
    if any(sensor.get('status') == 'failed' for sensor in o2_sensors):
        alert = Alert(
            'O2_SENSOR_FAILED',
            'critical',
            'O2 Sensor failure detected',
            '💨'
        )
        alerts.append(alert.to_dict())
    
    return alerts
