document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления фильтрами
    const filterButtons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.item');
    
    // Кнопки "Избранное"
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    // Форма добавления
    const addForm = document.getElementById('addForm');
    
    // Фильтрация по категориям
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            items.forEach(item => {
                const type = item.getAttribute('data-type');
                const isFavorite = item.getAttribute('data-favorite') === 'true';
                
                if (filter === 'all' || 
                    (filter === 'gif' && type === 'gif') || 
                    (filter === 'photo' && type === 'photo') ||
                    (filter === 'favorite' && isFavorite)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Добавление в избранное
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const item = this.closest('.item');
            
            if (icon.classList.contains('far')) {
                // Добавляем в избранное
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('active');
                item.setAttribute('data-favorite', 'true');
            } else {
                // Удаляем из избранного
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
                item.setAttribute('data-favorite', 'false');
            }
        });
    });
    
    // Добавление нового изображения через форму
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const imageUrl = document.getElementById('imageUrl').value;
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const type = document.getElementById('type').value;
            
            // Создаем новый элемент
            const gallery = document.querySelector('.gallery');
            const newItem = document.createElement('div');
            newItem.className = 'item';
            newItem.setAttribute('data-type', type);
            newItem.setAttribute('data-favorite', 'false');
            
            newItem.innerHTML = `
                <div class="image-container">
                    <img src="${imageUrl}" alt="${title}" loading="lazy">
                    <button class="favorite-btn"><i class="far fa-heart"></i></button>
                </div>
                <div class="caption">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <span class="date">${new Date().toLocaleDateString()}</span>
                </div>
            `;
            
            // Вставляем в начало галереи
            gallery.insertBefore(newItem, gallery.firstChild);
            
            // Добавляем обработчик для новой кнопки избранного
            newItem.querySelector('.favorite-btn').addEventListener('click', function() {
                const icon = this.querySelector('i');
                const item = this.closest('.item');
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.classList.add('active');
                    item.setAttribute('data-favorite', 'true');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.classList.remove('active');
                    item.setAttribute('data-favorite', 'false');
                }
            });
            
            // Очищаем форму
            addForm.reset();
            
            // Показываем сообщение
            alert('Изображение добавлено!');
        });
    }
});
