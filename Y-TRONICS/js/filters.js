// FILTER FUNCTIONALITY
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const navLinks = document.querySelectorAll('.filter-nav');
    
    const updateFilter = (filterValue) => {
        currentFilter = filterValue;
        renderProducts();
        
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        navLinks.forEach(link => {
            if (link.dataset.filter === filterValue) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateFilter(btn.dataset.filter);
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            updateFilter(link.dataset.filter);
        });
    });
}
