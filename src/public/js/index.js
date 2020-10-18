'use strict';

const handleIndexPage = async () => {
    const entryTextContainer = document.getElementById('entry-text');
    const entryTagsContainer = document.getElementById('entry-tags');
    const entryDateContainer = document.getElementById('entry-date');
    const entryPlaceContainer = document.getElementById('entry-place');
    const detailsLinks = Array.from(document.querySelectorAll('.entry-link'));

    let selectedEntry = detailsLinks[0];

    const fetchEntry = async (id) => {
        const data = await fetch(`/api/details/${id}`).then((data) => data.json());
        return data && data.entry ? data.entry : null;
    };

    const updateInfo = (data) => {
        console.log(data);
        entryTextContainer.innerHTML = data.text;
        entryTagsContainer.innerHTML = data.tags.reduce(
            (str, tag) => str + `<span class="tag is-primary">${tag}</span>`,
            ''
        );
        entryDateContainer.innerHTML = new Date(parseInt(data.date_journal, 10)).toLocaleDateString('de-DE');
        entryPlaceContainer.innerHTML = data.address || `kein Ort`;
    };

    detailsLinks.forEach((link) => {
        link.addEventListener('click', async () => {
            const { id } = link.dataset;
            const newEntry = await fetchEntry(id);
            if (newEntry) updateInfo(newEntry);
            selectedEntry.parentNode.parentNode.classList.remove('is-selected');
            link.parentNode.parentNode.classList.add('is-selected');
            selectedEntry = link;
        });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleIndexPage);
} else {
    handleIndexPage();
}
