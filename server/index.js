const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Authorized admin emails
const AUTHORIZED_EMAILS = [
    'admin@trijya.in',
    'trijya@bhu.ac.in',
    'editor@trijya.in',
    // Add more authorized emails here
];

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Verify email and send OTP
app.post('/api/auth/send-otp', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'ई-मेल आवश्यक आहे'
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if email is authorized
        const isAuthorized = AUTHORIZED_EMAILS.some(
            authorizedEmail => authorizedEmail.toLowerCase() === normalizedEmail
        );

        if (!isAuthorized) {
            return res.status(403).json({
                success: false,
                message: 'हा ई-मेल अधिकृत नाही. कृपया योग्य ई-मेल प्रविष्ट करा.'
            });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

        // Store OTP
        otpStore.set(normalizedEmail, { otp, expiresAt });

        // Send email
        const mailOptions = {
            from: `"त्रिज्या Admin" <${process.env.EMAIL_USER}>`,
            to: normalizedEmail,
            subject: '🔐 त्रिज्या Admin Login OTP',
            html: `
                <div style="font-family: 'Noto Sans Devanagari', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #FFF8E7, #F5E6D3); border-radius: 15px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #8B0000; margin: 0;">त्रिज्या</h1>
                        <p style="color: #5D4037; margin: 5px 0;">मराठी साहित्य मासिक</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <h2 style="color: #8B0000; margin-top: 0;">Admin Login OTP</h2>
                        <p style="color: #333; font-size: 16px;">आपला One-Time Password (OTP):</p>
                        
                        <div style="background: linear-gradient(135deg, #8B0000, #A52A2A); color: #D4AF37; text-align: center; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px;">${otp}</span>
                        </div>
                        
                        <p style="color: #666; font-size: 14px;">
                            ⏱️ हा OTP <strong>5 मिनिटांत</strong> कालबाह्य होईल.
                        </p>
                        
                        <p style="color: #666; font-size: 14px;">
                            🔒 जर आपण हा OTP विनंती केला नसेल, तर कृपया हा ई-मेल दुर्लक्षित करा.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
                        <p>© 2026 त्रिज्या - मराठी साहित्य मासिक</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        console.log(`OTP sent to ${normalizedEmail}: ${otp}`);

        res.json({
            success: true,
            message: 'OTP यशस्वीरित्या पाठवला गेला'
        });

    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({
            success: false,
            message: 'OTP पाठवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.',
            error: error.message
        });
    }
});

// Verify OTP
app.post('/api/auth/verify-otp', (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'ई-मेल आणि OTP आवश्यक आहे'
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const storedData = otpStore.get(normalizedEmail);

        if (!storedData) {
            return res.status(400).json({
                success: false,
                message: 'OTP सापडला नाही. कृपया नवीन OTP विनंती करा.'
            });
        }

        // Check expiry
        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(normalizedEmail);
            return res.status(400).json({
                success: false,
                message: 'OTP कालबाह्य झाला. कृपया नवीन OTP विनंती करा.'
            });
        }

        // Verify OTP
        if (otp !== storedData.otp) {
            return res.status(400).json({
                success: false,
                message: 'OTP चुकीचा आहे. कृपया पुन्हा प्रयत्न करा.'
            });
        }

        // OTP verified - remove from store
        otpStore.delete(normalizedEmail);

        // Generate session token (in production, use JWT)
        const sessionToken = Buffer.from(`${normalizedEmail}:${Date.now()}`).toString('base64');

        res.json({
            success: true,
            message: 'OTP सत्यापित झाला',
            token: sessionToken,
            email: normalizedEmail
        });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({
            success: false,
            message: 'OTP सत्यापित करताना त्रुटी आली'
        });
    }
});

// Cleanup expired OTPs every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
        if (now > data.expiresAt) {
            otpStore.delete(email);
        }
    }
}, 5 * 60 * 1000);

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 त्रिज्या Backend Server Started!
📍 Port: ${PORT}
🔗 API: http://localhost:${PORT}/api
📧 Email configured: ${process.env.EMAIL_USER ? 'Yes' : 'No - Please configure .env'}
    `);
});
