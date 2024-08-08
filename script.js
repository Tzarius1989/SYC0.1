const tg = window.Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    
    const buyButton = document.getElementById('buyButton');
    buyButton.addEventListener('click', handleBuyClick);
});

function handleBuyClick() {
    tg.showPopup({
        title: 'Подтвердите покупку',
        message: 'Вы хотите купить "Feline Fedora" в Cat Shelter за 55 Stars?',
        buttons: [
            { id: 'buy', type: 'ok', text: 'Подтвердить и оплатить ⭐ 55' },
            { type: 'cancel' }
        ]
    }, (buttonId) => {
        if (buttonId === 'buy') {
            const purchaseData = {
                action: 'buy',
                product: 'Feline Fedora',
                amount: 55
            };

            tg.sendData(JSON.stringify(purchaseData));
            tg.close();
        }
    });
}
