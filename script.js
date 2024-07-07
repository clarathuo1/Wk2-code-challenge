document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const clearListBtn = document.getElementById('clearListBtn');
    const shoppingList = document.getElementById('shoppingList');

    let items = JSON.parse(localStorage.getItem('shoppingItems')) || [];

    const saveAndRender = () => {
        localStorage.setItem('shoppingItems', JSON.stringify(items));
        renderList();
    };

    const renderList = () => {
        shoppingList.innerHTML = '';

        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.dataset.index = index;
            if (item.purchased) listItem.classList.add('purchased');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'toggle-purchased';
            checkbox.checked = item.purchased;
            checkbox.addEventListener('change', () => togglePurchased(index));

            const label = document.createElement('label');
            label.textContent = item.name;
            label.contentEditable = true;
            label.addEventListener('blur', () => updateItemName(index, label.textContent.trim()));

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-item';
            deleteBtn.textContent = '🚮';
            deleteBtn.addEventListener('click', () => deleteItem(index));

            listItem.append(checkbox, label, deleteBtn);
            shoppingList.appendChild(listItem);
        });
    };

    const updateItemName = (index, newName) => {
        if (newName) {
            items[index].name = newName;
            saveAndRender();
        }
    };

    const togglePurchased = (index) => {
        items[index].purchased = !items[index].purchased;
        saveAndRender();
    };

    const deleteItem = (index) => {
        items.splice(index, 1);
        saveAndRender();
    };

    const addItem = () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveAndRender();
        }
    };

    const clearList = () => {
        items = [];
        saveAndRender();
    };

    addItemBtn.addEventListener('click', addItem);
    clearListBtn.addEventListener('click', clearList);
    itemInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addItem();
    });

    renderList();
});