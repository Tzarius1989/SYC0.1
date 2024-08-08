const tg = window.Telegram.WebApp;
const BOT_TOKEN = '7483616995:AAEnUk-MPPC7j6SAa6oo6wY06jgJMgJNhzc'; // Не рекомендуется хранить токен в коде

document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    const buyButton = document.getElementById('buyButton');
    buyButton.addEventListener('click', handleBuyClick);
});

async function handleBuyClick() {
    const result = await tg.showConfirm('Вы хотите купить "Feline Fedora" в Cat Shelter за 55 Stars?');
    if (result) {
        const purchaseData = {
            title: 'Feline Fedora',
            description: 'Покупка Feline Fedora в Cat Shelter',
            payload: 'cat_shelter_purchase',
            provider_token: BOT_TOKEN,
            currency: 'XTR',
            prices: [{ label: 'Feline Fedora', amount: 5500 }] // 55 Stars в копейках
        };

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData)
            });

            const data = await response.json();
            if (data.ok && data.result) {
                window.open(data.result, '_blank');
            } else {
                tg.showAlert('Произошла ошибка при создании счета на оплату.');
            }
        } catch (error) {
            console.error('Error:', error);
            tg.showAlert('Произошла ошибка. Пожалуйста, попробуйте позже.');
        }
    }
}
