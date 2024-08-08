const tg = window.Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    const buyButton = document.getElementById('buyButton');
    buyButton.addEventListener('click', handleBuyClick);
});

function handleBuyClick() {
    tg.showConfirm('Вы хотите купить "Feline Fedora" в Cat Shelter за 55 Stars?', (isConfirmed) => {
        if (isConfirmed) {
            tg.MainButton.setText('Подтвердить и оплатить ⭐ 55');
            tg.MainButton.show();
            tg.MainButton.onClick(() => {
                const purchaseData = {
                    action: 'buy',
                    product: 'Feline Fedora',
                    amount: 55
                };
                tg.sendData(JSON.stringify(purchaseData));
            });
        }
    });
}
