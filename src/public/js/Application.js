import { html, useState, useEffect } from './preact.js';

import EntryList from './EntryList.js';
import EntryDetails from './EntryDetails.js';

export default function Application() {
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);

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

    useEffect(() => {
        fetchEntries();
    }, []);

    return html`
        <div class="columns">
            <${EntryList} entries=${entries} onEntryLinkClick=${handleEntryLinkClick} />
            <${EntryDetails} entry=${selectedEntry} />
        </div>
    `;
}
