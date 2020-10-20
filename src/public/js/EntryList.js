import { html } from './preact.js';

export default function EntryList({ entries, onEntryLinkClick }) {
    console.log(entries);

    if (!entries)
        return html`
            <div class="column">
                <p>Einträge werden geladen ...</p>
            </div>
        `;

    return html`
        <div class="column is-one-third scroll-container">
            <table class="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Autor</td>
                        <td>Datum</td>
                    </tr>
                </thead>
                <tbody>
                    ${entries.map(
                        (entry, idx) => html`
                            <tr>
                                <td>${idx + 1}.</td>
                                <td>
                                    ${entry.tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1)).join(', ')}
                                </td>
                                <td>
                                    <a href="#" class="entry-link" onClick=${() => onEntryLinkClick(entry.id)}>
                                        ${new Intl.DateTimeFormat('de-DE').format(new Date(entry.date_journal))}
                                    </a>
                                </td>
                            </tr>
                        `
                    )}
                </tbody>
            </table>
        </div>
    `;
}
