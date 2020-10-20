import { html } from './preact.js';

export default function EntryDetails({ entry }) {
    if (!entry) return html` <div class="column"><p>Eintrag auswählen ...</p></div> `;

    return html` <div class="column">
        <div class="card">
            <div class="card-header">
                <div class="entry-header">
                    <div class="left" id="entry-date">
                        <h2 class="title is-2">
                            ${new Intl.DateTimeFormat('de-DE').format(new Date(entry.date_journal))}
                        </h2>
                    </div>
                    <div class="right" id="entry-place">${entry.address ? entry.address : 'kein Ort angegeben'}</div>
                </div>
            </div>
            <div class="card-content">
                <div id="entry-text" dangerouslySetInnerHTML=${{ __html: entry.text }}></div>
                <div class="tags are-normal">
                    ${entry.tags.map((tag) => html`<span class="tag is-primary">${tag}</span>`)}
                </div>
            </div>
        </div>
    </div>`;
}
