import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Mock Data
let patients = [];

// API Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Backend is running' }));

// Auth Mock API
app.post('/api/auth/login', (req, res) => {
    const { email, password, role } = req.body;
    // Mock login logic
    res.json({ token: 'mock-jwt-token', user: { email, role, id: 'user123' } });
});

// Vitals Simulation via Socket.io
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    let vitalsInterval;
    
    socket.on('start-vitals', (patientId) => {
        console.log(`Starting vitals simulation for patient: ${patientId}`);
        // Simulate reading real-time vitals every 3 seconds
        vitalsInterval = setInterval(() => {
            const vitals = {
                heartRate: Math.floor(Math.random() * (100 - 60) + 60),
                bloodPressure: `${Math.floor(Math.random() * (140 - 110) + 110)}/${Math.floor(Math.random() * (90 - 70) + 70)}`,
                spo2: Math.floor(Math.random() * (100 - 94) + 94),
                temperature: (Math.random() * (99.5 - 97.5) + 97.5).toFixed(1),
                glucose: Math.floor(Math.random() * (120 - 80) + 80),
                timestamp: new Date().toISOString()
            };
            
            // Check for critical thresholds
            const alerts = [];
            if(vitals.heartRate > 95) alerts.push("High Heart Rate Warning");
            if(vitals.spo2 < 95) alerts.push("Low SPO2 Warning");
            
            socket.emit('vitals-update', { vitals, alerts });
        }, 3000);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        clearInterval(vitalsInterval);
    });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
