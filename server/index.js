const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Works persistence setup
const worksFilePath = path.join(__dirname, 'data', 'works.json');

const getWorksFromFile = () => {
    try {
        if (!fs.existsSync(worksFilePath)) {
            return [];
        }
        const data = fs.readFileSync(worksFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading works file:', err);
        return [];
    }
};

const saveWorksToFile = (works) => {
    try {
        const dir = path.dirname(worksFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(worksFilePath, JSON.stringify(works, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error saving works file:', err);
        return false;
    }
};

const CATEGORY_MAP = {
    'Poetry': 'कविता',
    'Short Stories': 'कथा',
    'Drama': 'अनुवादित साहित्य',
    'Translations': 'पुस्तक परीक्षण',
    'All': 'शोधनिबंध / समीक्षा लेख'
};

const DEFAULT_COVERS = {
    'Poetry': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
    'Short Stories': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    'Drama': 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800',
    'Translations': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
    'All': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800'
};

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Authorized admin emails - strictly trijya.sahitya@gmail.com
const AUTHORIZED_EMAILS = [
    'trijya.sahitya@gmail.com'
];

// Email transporter helper
const getTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: (process.env.EMAIL_USER || '').trim(),
            pass: (process.env.EMAIL_PASS || '').replace(/\s+/g, '')
        }
    });
};

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});


// ==========================================
// SAHITYA / WORKS CRUD API ENDPOINTS
// ==========================================

// GET all works
app.get('/api/works', (req, res) => {
    try {
        const works = getWorksFromFile();
        res.json({
            success: true,
            count: works.length,
            works
        });
    } catch (error) {
        console.error('Error fetching works:', error);
        res.status(500).json({ success: false, message: 'साहित्य मिळवताना त्रुटी आली' });
    }
});

// GET single work by ID
app.get('/api/works/:id', (req, res) => {
    try {
        const works = getWorksFromFile();
        const work = works.find(w => String(w.id) === String(req.params.id));
        if (!work) {
            return res.status(404).json({ success: false, message: 'साहित्य सापडले नाही' });
        }
        res.json({ success: true, work });
    } catch (error) {
        console.error('Error fetching work:', error);
        res.status(500).json({ success: false, message: 'साहित्य शोधताना त्रुटी आली' });
    }
});

// CREATE new work
app.post('/api/works', (req, res) => {
    try {
        const {
            title,
            titleEnglish,
            authorId,
            authorName,
            category,
            categoryMarathi,
            publishDate,
            excerpt,
            content,
            coverImage,
            relatedWorks
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ success: false, message: 'साहित्याचे शीर्षक आवश्यक आहे' });
        }

        const selectedCat = category || 'All';
        const mappedCatMarathi = categoryMarathi || CATEGORY_MAP[selectedCat] || 'शोधनिबंध / समीक्षा लेख';
        const fallbackCover = DEFAULT_COVERS[selectedCat] || DEFAULT_COVERS['All'];

        const works = getWorksFromFile();
        const newWork = {
            id: String(Date.now()),
            title: title.trim(),
            titleEnglish: (titleEnglish || '').trim(),
            authorId: authorId || 'custom',
            authorName: (authorName || 'त्रिज्या लेखक').trim(),
            category: selectedCat,
            categoryMarathi: mappedCatMarathi,
            publishDate: publishDate || new Date().toISOString().split('T')[0],
            excerpt: (excerpt || '').trim() || (content ? content.slice(0, 120) + '...' : ''),
            content: (content || '').trim(),
            coverImage: (coverImage && coverImage.trim()) ? coverImage.trim() : fallbackCover,
            relatedWorks: Array.isArray(relatedWorks) ? relatedWorks : []
        };

        // Add to front of array so newest shows first
        works.unshift(newWork);
        const saved = saveWorksToFile(works);

        if (!saved) {
            return res.status(500).json({ success: false, message: 'साहित्य सेव्ह करण्यात अयशस्वी' });
        }

        console.log(`✅ [New Work Added]: "${newWork.title}" by ${newWork.authorName} (ID: ${newWork.id})`);

        res.status(201).json({
            success: true,
            message: 'नवीन साहित्य यशस्वीरित्या जोडले गेले!',
            work: newWork
        });
    } catch (error) {
        console.error('Error creating work:', error);
        res.status(500).json({ success: false, message: 'साहित्य जोडताना त्रुटी आली', error: error.message });
    }
});

// UPDATE existing work
app.put('/api/works/:id', (req, res) => {
    try {
        const { id } = req.params;
        const works = getWorksFromFile();
        const workIndex = works.findIndex(w => String(w.id) === String(id));

        if (workIndex === -1) {
            return res.status(404).json({ success: false, message: 'साहित्य सापडले नाही' });
        }

        const current = works[workIndex];
        const updateData = req.body;

        const selectedCat = updateData.category || current.category || 'All';
        const mappedCatMarathi = updateData.categoryMarathi || CATEGORY_MAP[selectedCat] || current.categoryMarathi;

        const updatedWork = {
            ...current,
            ...updateData,
            id: current.id, // preserve original id
            category: selectedCat,
            categoryMarathi: mappedCatMarathi,
            updatedAt: new Date().toISOString()
        };

        works[workIndex] = updatedWork;
        const saved = saveWorksToFile(works);

        if (!saved) {
            return res.status(500).json({ success: false, message: 'साहित्य अपडेट करण्यात अयशस्वी' });
        }

        console.log(`🔄 [Work Updated]: "${updatedWork.title}" (ID: ${id})`);

        res.json({
            success: true,
            message: 'साहित्य यशस्वीरित्या अद्ययावत केले!',
            work: updatedWork
        });
    } catch (error) {
        console.error('Error updating work:', error);
        res.status(500).json({ success: false, message: 'साहित्य अपडेट करताना त्रुटी आली', error: error.message });
    }
});

// DELETE work
app.delete('/api/works/:id', (req, res) => {
    try {
        const { id } = req.params;
        const works = getWorksFromFile();
        const initialLength = works.length;
        const filteredWorks = works.filter(w => String(w.id) !== String(id));

        if (filteredWorks.length === initialLength) {
            return res.status(404).json({ success: false, message: 'हटवण्यासाठी साहित्य सापडले नाही' });
        }

        const saved = saveWorksToFile(filteredWorks);

        if (!saved) {
            return res.status(500).json({ success: false, message: 'साहित्य हटवण्यात अयशस्वी' });
        }

        console.log(`🗑️ [Work Deleted]: (ID: ${id})`);

        res.json({
            success: true,
            message: 'साहित्य यशस्वीरित्या हटवले गेले!'
        });
    } catch (error) {
        console.error('Error deleting work:', error);
        res.status(500).json({ success: false, message: 'साहित्य हटवताना त्रुटी आली', error: error.message });
    }
});

// Contact form submission - sends details to Gmail
app.post('/api/contact', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({
                success: false,
                message: 'ई-मेल आणि संदेश आवश्यक आहेत'
            });
        }

        const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'अनामिक वाचक';
        const senderEmail = email.trim();
        const senderPhone = phone ? phone.trim() : 'उपलब्ध नाही';
        const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER || 'trijya.sahitya@gmail.com';
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        console.log(`📬 [Contact Form Submission] From: ${fullName} (${senderEmail}), Phone: ${senderPhone}`);

        // Construct Email
        const mailOptions = {
            from: `"त्रिज्या वेबसाइट संपर्क" <${process.env.EMAIL_USER || 'trijya.sahitya@gmail.com'}>`,
            to: receiverEmail,
            replyTo: senderEmail,
            subject: `📬 नवीन संपर्क संदेश: ${fullName} (${senderEmail})`,
            text: `त्रिज्या वेबसाइटवरून नवीन संदेश प्राप्त झाला:\n\nनाव: ${fullName}\nई-मेल: ${senderEmail}\nफोन: ${senderPhone}\n\nसंदेश:\n${message}\n\nवेळ: ${timestamp} IST`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FFF8E7; border-radius: 12px; border: 1px solid #D4AF37;">
                    <div style="text-align: center; padding-bottom: 16px; border-bottom: 2px solid #8B0000;">
                        <h1 style="color: #8B0000; margin: 0; font-size: 28px; letter-spacing: 1px;">त्रिज्या</h1>
                        <p style="color: #5D4037; margin: 4px 0 0 0; font-weight: 600; font-size: 15px;">मराठी भाषा- साहित्य व संशोधन यासाठीचा मंच</p>
                        <p style="color: #A52A2A; margin: 4px 0 0 0; font-size: 13px;">होमपेज संपर्क फॉर्म सूचना</p>
                    </div>

                    <div style="background: #ffffff; padding: 24px; border-radius: 8px; margin-top: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #F5E6D3;">
                        <h2 style="color: #8B0000; font-size: 18px; margin: 0 0 16px 0; border-bottom: 1px solid #f0e6dc; padding-bottom: 8px;">
                            📬 नवीन संदेश तपशील
                        </h2>

                        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                            <tr>
                                <td style="padding: 10px 12px; font-weight: 600; color: #5D4037; width: 30%; background: #FAF7F2; border-bottom: 1px solid #eee;">नाव:</td>
                                <td style="padding: 10px 12px; color: #222; border-bottom: 1px solid #eee;"><strong>${fullName}</strong></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 12px; font-weight: 600; color: #5D4037; background: #FAF7F2; border-bottom: 1px solid #eee;">ई-मेल:</td>
                                <td style="padding: 10px 12px; color: #222; border-bottom: 1px solid #eee;">
                                    <a href="mailto:${senderEmail}" style="color: #8B0000; text-decoration: underline; font-weight: 500;">${senderEmail}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 12px; font-weight: 600; color: #5D4037; background: #FAF7F2; border-bottom: 1px solid #eee;">फोन नंबर:</td>
                                <td style="padding: 10px 12px; color: #222; border-bottom: 1px solid #eee;">
                                    ${phone ? `<a href="tel:${senderPhone}" style="color: #222; text-decoration: none;">${senderPhone}</a>` : '<span style="color: #888;">दिला नाही</span>'}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 12px; font-weight: 600; color: #5D4037; background: #FAF7F2; border-bottom: 1px solid #eee;">तारीख व वेळ:</td>
                                <td style="padding: 10px 12px; color: #666; border-bottom: 1px solid #eee;">${timestamp} IST</td>
                            </tr>
                        </table>

                        <div style="margin-top: 20px;">
                            <p style="font-weight: 600; color: #8B0000; margin: 0 0 8px 0; font-size: 14px;">संदेश:</p>
                            <div style="background: #FFFDF9; border-left: 4px solid #8B0000; padding: 14px 16px; border-radius: 4px; color: #333; line-height: 1.6; white-space: pre-wrap; font-size: 15px; border: 1px solid #F0E8D8; border-left-width: 4px;">${String(message).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                        </div>

                        <div style="margin-top: 24px; text-align: center;">
                            <a href="mailto:${senderEmail}?subject=Re: त्रिज्या संपर्क" style="background: linear-gradient(135deg, #8B0000, #A52A2A); color: white; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: bold; display: inline-block;">
                                ✉️ थेट उत्तर द्या (Reply)
                            </a>
                        </div>
                    </div>

                    <div style="text-align: center; margin-top: 18px; color: #8C6D62; font-size: 12px;">
                        <p style="margin: 0;">हा संदेश त्रिज्या (trijya.in) च्या होमपेजवरील संपर्क फॉर्मद्वारे पाठवण्यात आला आहे.</p>
                    </div>
                </div>
            `
        };

        const transporter = getTransporter();
        await transporter.sendMail(mailOptions);
        console.log(`✅ Contact email sent successfully to ${receiverEmail}`);

        res.json({
            success: true,
            message: 'तुमचा संदेश यशस्वीरित्या पाठवला गेला आहे! आम्ही लवकरच संपर्क करू.'
        });

    } catch (error) {
        console.error('Error in /api/contact:', error);
        const isAuthError = error.code === 'EAUTH' || (error.message && error.message.includes('Username and Password not accepted'));
        
        res.status(isAuthError ? 503 : 500).json({
            success: false,
            message: isAuthError 
                ? 'ई-मेल सर्व्हर प्रमाणीकरण आवश्यक आहे. कृपया server/.env मध्ये वैध Gmail App Password सेट करा किंवा थेट trijya.sahitya@gmail.com वर संपर्क करा.' 
                : 'संदेश पाठवताना त्रुटी आली. कृपया थोड्या वेळाने प्रयत्न करा किंवा थेट trijya.sahitya@gmail.com वर संपर्क करा.',
            error: error.message
        });
    }
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

        // Exact match check: strictly trijya.sahitya@gmail.com
        if (normalizedEmail !== 'trijya.sahitya@gmail.com') {
            return res.status(403).json({
                success: false,
                message: 'अनधिकृत प्रवेश (Invalid Access): हा ई-मेल अधिकृत प्रशासकीय खात्याशी जुळत नाही.'
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

        const transporter = getTransporter();
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

        if (normalizedEmail !== 'trijya.sahitya@gmail.com') {
            return res.status(403).json({
                success: false,
                message: 'अनधिकृत प्रवेश (Invalid Access): हा ई-मेल अधिकृत प्रशासकीय खात्याशी जुळत नाही.'
            });
        }
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
