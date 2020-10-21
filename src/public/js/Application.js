import { html, useState, useEffect } from './preact.js';

import EntryList from './EntryList.js';
import EntryDetails from './EntryDetails.js';

export const sort = {
    DATE_ASC: 'date_ascending',
    DATE_DESC: 'date_descending',
    AUTHOR: 'author',
    FAV: 'faved'
};

export default function Application() {
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [sortBy, setSortBy] = useState(sort.DATE_DESC);
    const [showPhotoModal, setPhotoModal] = useState(false);
    const [photoModalUrl, setPhotoModalUrl] = useState(null);

    const showPhoto = (url) => {
        setPhotoModalUrl(url);
        setPhotoModal(true);
    };

    const fetchData = async (url) => {
        const response = await fetch(url, {
            credentials: 'include'
        });

        if (!response.ok) return undefined;

        try {
            const data = await response.json();
            return data;
        } catch (e) {
            return undefined;
        }
    };

    const fetchEntries = async () => {
        const entries = await fetchData('/api/entries');
        if (Object.prototype.hasOwnProperty.call(entries, 'entries')) setEntries(entries.entries);
    };

    const handleEntryLinkClick = (id) => {
        const entry = entries.find((entry) => entry.id === id);
        if (entry) {
            setSelectedEntry(entry);
        } else {
            setSelectedEntry(null);
        }
    };

    const handleFav = async (id) => {
        if (!id) return;
        const favedEntry = await fetchData(`/api/entries/${id}/fav`);
        setEntries((entries) =>
            entries.map((entry) => {
                if (entry.id === favedEntry.id) return favedEntry;
                return entry;
            })
        );
    };

    useEffect(() => {
        fetchEntries().then(() => handleSortBy(sort.DATE_DESC));
    }, []);

    const handleSortBy = (newSort) => {
        const toSortBy = newSort === sort.DATE_DESC && sortBy === sort.DATE_DESC ? sort.DATE_ASC : newSort;
        setSortBy(toSortBy);

        if (!entries.length) return;

        switch (toSortBy) {
            case sort.AUTHOR:
                return setEntries(
                    entries.sort((a, b) => {
                        if (a.tags[0][0] === b.tags[0][0]) return 0;
                        if (a.tags[0][0] > b.tags[0][0]) return -1;
                        if (a.tags[0][0] < b.tags[0][0]) return 1;
                    })
                );
            case sort.DATE_ASC:
                return setEntries(
                    entries.sort((a, b) => {
                        if (a.date_journal === b.date_journal) return 0;
                        if (a.date_journal < b.date_journal) return -1;
                        if (a.date_journal > b.date_journal) return 1;
                    })
                );
            case sort.DATE_DESC:
                return setEntries(
                    entries.sort((a, b) => {
                        if (a.date_journal === b.date_journal) return 0;
                        if (a.date_journal > b.date_journal) return -1;
                        if (a.date_journal < b.date_journal) return 1;
                    })
                );
            case sort.FAV:
                return setEntries(
                    entries.sort((a, b) => {
                        if (a.favourite && b.favourite) return 0;
                        if (a.favourite && !b.favourite) return -1;
                        if (!a.favourite && b.favourite) return 1;
                    })
                );
            default:
                break;
        }
    };

    return html`
    <div>
        <div class="columns">
            <${EntryList}
                entries=${entries}
                selectedEntry=${selectedEntry}
                onEntryLinkClick=${handleEntryLinkClick}
                onSortClick=${handleSortBy}
                sortBy=${sortBy}
            />
            <${EntryDetails} entry=${selectedEntry} onFavClick=${handleFav} onPhotoClick=${showPhoto} />
        </div>
        <div class="modal ${showPhotoModal && 'is-active'}">
          <div class="modal-background" onClick=${() => setPhotoModal(false)}></div>
          <div class="modal-content">
              <img src="${photoModalUrl && `images/${photoModalUrl}`}" alt="Journey-Foto">
            </p>
          </div>
          <button class="modal-close is-large" aria-label="close" onClick=${() => setPhotoModal(false)}></button>
        </div>
        </div>
    `;
}
