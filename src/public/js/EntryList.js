import { html } from './preact.js';
import { sort } from './Application.js';

export default function EntryList({ entries, selectedEntry, onEntryLinkClick, onSortClick, sortBy }) {
    console.log(entries);

    if (!entries)
        return html`
            <div class="column">
                <p>Einträge werden geladen ...</p>
            </div>
        `;

    return html`
        <div class="column is-one-third scroll-container">
            <table class="table is-hoverable">
                <thead class="table-header">
                    <tr>
                        <td>#</td>
                        <td onClick=${() => onSortClick(sort.AUTHOR)} class="sort-column">
                            ${sortBy === sort.AUTHOR && '🔽'} Autor
                        </td>
                        <td onClick=${() => onSortClick(sort.DATE_DESC)} class="sort-column">
                            ${sortBy === sort.DATE_DESC && '🔽'}${sortBy === sort.DATE_ASC && '🔼'} Datum
                        </td>
                        <td onClick=${() => onSortClick(sort.FAV)} class="sort-column">
                            ${sortBy === sort.FAV && '🔽'} Fav
                        </td>
                    </tr>
                </thead>
                <tbody>
                    ${entries.map(
                        (entry, idx) => html`
                            <tr
                                class="link-row ${selectedEntry && selectedEntry.id === entry.id && 'is-selected'}"
                                onClick=${() => onEntryLinkClick(entry.id)}
                            >
                                <td>${idx + 1}.</td>
                                <td>
                                    ${entry.tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1)).join(', ')}
                                </td>
                                <td>${new Intl.DateTimeFormat('de-DE').format(new Date(entry.date_journal))}</td>
                                <td>${entry.favourite && '⭐'}</td>
                            </tr>
                        `
                    )}
                </tbody>
            </table>
        </div>
    `;
}
