import { createInvoiceLink } from 'telegram-bot-api';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { product, amount } = req.body;
        
        try {
            const invoiceLink = await createInvoiceLink({
                title: product,
                description: `Покупка ${product} в Cat Shelter`,
                payload: 'unique_payload',
                provider_token: process.env.TELEGRAM_PAYMENT_TOKEN,
                currency: 'XTR',
                prices: [{ label: product, amount: amount * 100 }] // Сумма в копейках
            });
            
            res.status(200).json({ success: true, invoiceLink });
        } catch (error) {
            console.error('Error creating invoice:', error);
            res.status(500).json({ success: false, error: 'Failed to create invoice' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
