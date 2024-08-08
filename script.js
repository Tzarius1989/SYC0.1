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
            const invoiceParams = {
                title: "Feline Fedora",
                description: "Stylish hat for your cat",
                prices: [{ label: "Feline Fedora", amount: 5500 }], // 55 Stars * 100 (в минимальных единицах)
                payload: "cat_hat_001",
                currency: "XTR"
            };

            tg.openInvoice(JSON.stringify(invoiceParams), (status) => {
                if (status === 'paid') {
                    tg.showAlert('Спасибо за покупку!');
                } else if (status === 'failed') {
                    tg.showAlert('Произошла ошибка при оплате. Попробуйте еще раз.');
                } else if (status === 'cancelled') {
                    tg.showAlert('Покупка отменена.');
                }
            });
        }
    });
}
