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
            { id: 'buy', type: 'buy', text: 'Подтвердить и оплатить ⭐ 55' },
            { type: 'cancel' }
        ]
    }, (buttonId) => {
        if (buttonId === 'buy') {
            tg.sendData(JSON.stringify({
                action: 'buy',
                product: 'Feline Fedora',
                amount: 55
            }));
        }
    });
}
