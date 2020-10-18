'use strict';

function handleIndexPage() {
    console.log('Working');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleIndexPage);
} else {
    handleIndexPage();
}
