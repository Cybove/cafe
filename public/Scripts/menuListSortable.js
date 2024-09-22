(function () {
  const sortableInstances = new Map();

  function initializeSortables() {
    const categories = document.querySelectorAll('[id^="category-"]');

    const existingIds = new Set([...sortableInstances.keys()]);
    const currentIds = new Set([...categories].map((cat) => cat.id));

    for (const id of existingIds) {
      if (!currentIds.has(id)) {
        sortableInstances.get(id).forEach((instance) => instance.destroy());
        sortableInstances.delete(id);
      }
    }

    categories.forEach((category) => {
      if (!sortableInstances.has(category.id)) {
        const instances = [];

        instances.push(
          new Sortable(document.getElementById('categories-container'), {
            animation: 150,
            handle: '#category-handle',
            onEnd: debounce(handleCategorySortEnd, 100),
          })
        );

        const tbody = category.querySelector('tbody');
        if (tbody) {
          instances.push(
            new Sortable(tbody, {
              group: 'shared',
              animation: 150,
              onEnd: debounce(handleSortEnd, 100),
            })
          );
        }

        sortableInstances.set(category.id, instances);
      }
    });
  }

  function handleCategorySortEnd(evt) {
    const newOrder = Array.from(evt.to.children).map((div, index) => ({
      id: div.dataset.categoryId,
      sort_order: index,
    }));

    htmx.ajax('POST', '/api/categories/sort', {
      target: '#toast-container',
      swap: 'innerHTML',
      values: { categories: JSON.stringify(newOrder) },
    });
    htmx.trigger(document.body, 'refreshOptions');
  }

  function handleSortEnd(evt) {
    const itemId = evt.item.querySelector('input[name="id"]').value;
    const newCategoryId = evt.to.closest('[id^="category-"]').id.split('-')[1];
    const oldCategoryId = evt.from.closest('[id^="category-"]').id.split('-')[1];

    if (newCategoryId !== oldCategoryId) {
      moveItem(itemId, newCategoryId, evt.newIndex);
    } else {
      sortItems(newCategoryId, evt.to);
    }
  }

  function moveItem(itemId, newCategoryId, newIndex) {
    htmx.ajax('POST', '/api/items/move', {
      target: '#toast-container',
      swap: 'innerHTML',
      values: { itemId, newCategoryId, newIndex },
    });
  }

  function sortItems(categoryId, container) {
    const newOrder = Array.from(container.children).map((tr, index) => ({
      id: tr.querySelector('input[name="id"]').value,
      sort_order: index,
    }));
    htmx.ajax('POST', '/api/items/sort', {
      target: '#toast-container',
      swap: 'innerHTML',
      values: { categoryId, items: JSON.stringify(newOrder) },
    });
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  initializeSortables();
})();
