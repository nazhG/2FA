import speakeasy from 'speakeasy';
import express from 'express';
import cors from 'cors';
import { toDataURL } from 'qrcode';


const app = express();
const port = 1729; // maths reference.

app.use(cors());
app.use(express.json());

/**
 * We will use static HTML files for our frontend.
 */
app.use(express.static('public'));

/**
 * For this example, we will generate only one secret key but in a real-world scenario,
 * you should generate a unique secret key for each user or session.
 */
const secret = speakeasy.generateSecret({ length: 20 });
console.log('Secret:', secret.base32, '🤫');

/**
 * Generates a QR code that the user can scan with the Google Authenticator App.
 */
app.get('/qr-code', (req, res) => {
    const otpAuthUrl = speakeasy.otpauthURL({
        secret: secret.base32,
        encoding: 'base32',
        label: '2FA Demo',
        issuer: 'nazhG',
    });
    toDataURL(otpAuthUrl, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error al generar el código QR:', err);
            res.status(500).send('Error al generar el código QR');
            return;
        }
        res.send(qrCodeUrl);
    });
});

/**
 * Receives a token and verifies if it is correct.
 * @param {string} token - The token that the user get from the Google Authenticator App.
 */
app.post('/verify', (req, res) => {
    const { token } = req.body;

    if (!token) {
        res.status(400).json({ verified: false, message: 'Token no proporcionado' });
        return;
    }

    const verified = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: token.toString(),
        window: 1, // check +- 1min
    });    
    
    if (verified) {
        res.status(200).json({ verified: true, message: 'Token verificado 🎉😁' });
    } else {
        res.status(400).json({ verified: false, message: 'Token incorrecto 💥🥺' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});