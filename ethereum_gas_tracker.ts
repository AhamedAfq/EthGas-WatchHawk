import { request } from 'playwright';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const GAS_THRESHOLD = Number(process.env.GAS_THRESHOLD) || 30;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

async function fetchGasPrice(): Promise<number> {
    try {
        const context = await request.newContext();
        const response = await context.get(
            `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
        );

        if (!response.ok()) {
            throw new Error(`Failed to fetch gas price: ${response.status()} ${response.statusText()}`);
        }

        const data = await response.json();
        const gasPrice = Number(data.result?.SafeGasPrice);

        if (isNaN(gasPrice)) {
            throw new Error('Invalid gas price received from API');
        }

        return gasPrice;
    } catch (error) {
        console.error('❌ Failed to fetch gas price:', error);
        throw error;
    }
}

async function sendEmailAlert(gasPrice: number) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS, // Ensure this is an "App Password"
            },
        });

        const mailOptions = {
            from: EMAIL_USER,
            to: RECIPIENT_EMAIL,
            subject: 'Ethereum Gas Price Alert 🚀',
            text: `⛽ Gas price is now ${gasPrice} Gwei! Consider making transactions now.`,
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email alert sent successfully!');
    } catch (error) {
        console.error('❌ Failed to send email:', error);
    }
}

(async () => {
    try {
        const gasPrice = await fetchGasPrice();
        console.log(`📊 Current Gas Price: ${gasPrice} Gwei`);

        if (gasPrice <= GAS_THRESHOLD) {
            await sendEmailAlert(gasPrice);
        } else {
            console.log(`ℹ️ Gas price (${gasPrice} Gwei) is above the threshold (${GAS_THRESHOLD} Gwei). No email sent.`);
        }
    } catch (error) {
        console.error('❌ Error in execution:', error);
    }
})();
