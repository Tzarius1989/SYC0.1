const tg = window.Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    const buyButton = document.getElementById('buyButton');
    buyButton.addEventListener('click', handleBuyClick);
});

async function handleBuyClick() {
    try {
        const result = await tg.showConfirm('Вы хотите купить "Feline Fedora" в Cat Shelter за 55 Stars?');
        if (result) {
            const response = await fetch('/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'buy',
                    product: 'Feline Fedora',
                    amount: 55
                })
            });
            
            const data = await response.json();
            if (data.success && data.invoiceLink) {
                window.open(data.invoiceLink, '_blank');
            } else {
                tg.showAlert('Произошла ошибка при создании счета на оплату.');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        tg.showAlert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }
}
