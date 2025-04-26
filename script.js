document.addEventListener('DOMContentLoaded', () => {
    let freight = 15.00; // Frete padrão
    const productTable = document.querySelector('table tbody');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const finalizeButton = document.querySelector('.finalizar');

    const updateTotals = () => {
        let subtotal = 0;
        document.querySelectorAll('table tbody tr').forEach(row => {
            const totalCell = row.querySelector('.total');
            subtotal += parseFloat(totalCell.textContent.replace('R$', '').replace(',', '.'));
        });
        subtotalElement.textContent = 'R$' + subtotal.toFixed(2).replace('.', ',');

        let total = subtotal;
        if (subtotal > 80) {
            freight = 0; // Frete grátis
        } else {
            freight = 15; // Frete normal
        }
        total += freight;

        totalElement.textContent = 'R$' + total.toFixed(2).replace('.', ',');
    };

    const updateProductTotal = (row) => {
        const price = parseFloat(row.querySelector('td:nth-child(2)').textContent.replace('R$', '').replace(',', '.'));
        const quantity = parseInt(row.querySelector('.quantity').textContent);
        const totalCell = row.querySelector('.total');
        totalCell.textContent = 'R$' + (price * quantity).toFixed(2).replace('.', ',');
        updateTotals();
    };

    const hasProductsInCart = () => {
        let hasProducts = false;
        document.querySelectorAll('.quantity').forEach(quantityElement => {
            if (parseInt(quantityElement.textContent) > 0) {
                hasProducts = true;
            }
        });
        return hasProducts;
    };

    const clearCart = () => {
        document.querySelectorAll('.quantity').forEach(quantityElement => {
            quantityElement.textContent = 0;
        });
        document.querySelectorAll('.total').forEach(totalCell => {
            totalCell.textContent = 'R$0,00';
        });
        subtotalElement.textContent = 'R$0,00'; // Zerar subtotal
        totalElement.textContent = 'R$0,00'; // Zerar total
    };

    productTable.addEventListener('click', (event) => {
        const button = event.target;
        if (button.classList.contains('increase')) {
            const row = button.closest('tr');
            const quantityElement = row.querySelector('.quantity');
            quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
            updateProductTotal(row);
        }

        if (button.classList.contains('decrease')) {
            const row = button.closest('tr');
            const quantityElement = row.querySelector('.quantity');
            const currentQuantity = parseInt(quantityElement.textContent);
            if (currentQuantity > 0) {
                quantityElement.textContent = currentQuantity - 1;
                updateProductTotal(row);
            }
        }

        if (button.classList.contains('remove')) {
            const row = button.closest('tr');
            row.querySelector('.quantity').textContent = 0;
            updateProductTotal(row);
        }
    });

    finalizeButton.addEventListener('click', () => {
        if (!hasProductsInCart()) {
            alert('Adicione produtos ao carrinho antes de finalizar o pedido.');
        } else {
            alert('Pedido realizado com sucesso! Você receberá um e-mail de confirmação contendo todas as informações sobre a entrega! CLIQUE EM <OK> PARA VOLTAR A PÁGINA INICIAL.');
            clearCart();
            window.location.href = 'index.html';
        }
    });

    updateTotals();
});