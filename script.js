const tg = window.Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    const buyButton = document.getElementById('buyButton');
    buyButton.addEventListener('click', handleBuyClick);
});

function handleBuyClick() {
    tg.showConfirm('Вы хотите купить "Feline Fedora" в Cat Shelter за 55 Stars?', (confirmed) => {
        if (confirmed) {
            tg.sendData(JSON.stringify({
                action: 'buy',
                product: 'Feline Fedora',
                amount: 55
            }));
        }
    });
}
