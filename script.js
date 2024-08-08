const tg = window.Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    const buyButton = document.getElementById('buyButton');
    buyButton.addEventListener('click', handleBuyClick);
});

function handleBuyClick() {
    tg.showConfirm('Do you want to buy "Feline Fedora" in Cat Shelter for 55 Stars?', (isConfirmed) => {
        if (isConfirmed) {
            tg.MainButton.setText('Confirm and Pay ⭐ 55');
            tg.MainButton.show();
            tg.MainButton.onClick(() => {
                const purchaseData = {
                    action: 'buy',
                    product: 'Feline Fedora',
                    amount: 55
                };
                tg.sendData(JSON.stringify(purchaseData));
                tg.MainButton.hide();
            });
        }
    });
}

tg.onEvent('mainButtonClicked', () => {
    tg.MainButton.hide();
});
