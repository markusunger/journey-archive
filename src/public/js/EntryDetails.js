import { html, useState } from './preact.js';

const processDate = (date) => {
    const dateString = new Intl.DateTimeFormat('de-DE', {
        weekday: 'long',
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
    return dateString.split(', ');
};

export default function EntryDetails({ entry, onFavClick, onPhotoClick }) {
    if (!entry) return html`<div class="column"><p>Eintrag auswählen ...</p></div>`;

    const [day, mdy, hm] = processDate(entry.date_journal);

    return html` <div class="column">
        <div class="card">
            <div class="card-header">
                <div class="entry-header">
                    <div class="left" id="entry-date">
                        <h2 class="title is-2">${mdy}</h2>
                        <h2 class="subtitle is-5">${day}, ${hm}</h2>
                    </div>
                    <div class="middle" id="entry-place">${entry.address ? entry.address : 'kein Ort angegeben'}</div>
                    <div class="right" id="entry-fav">
                        <button
                            class="is-large ${entry.favourite ? 'is-primary' : 'is-white'}"
                            onClick=${() => {
                                onFavClick(entry._id);
                                entry.favourite = !entry.favourite;
                            }}
                        >
                            ${entry.favourite ? '⭐' : 'kein'} Fav
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div id="entry-text" dangerouslySetInnerHTML=${{ __html: entry.text }}></div>
                <div class="tags are-normal">
                    ${entry.tags.map((tag) => html`<span class="tag is-primary">${tag}</span>`)}
                </div>
            </div>
            <div class="card-footer">
                ${entry.photos.map(
                    (photo) =>
                        html`
                            <img
                                class="link-cursor thumbnail"
                                src="images/${photo}"
                                width="250"
                                onClick=${() => onPhotoClick(photo)}
                            />
                        `
                )}
            </div>
        </div>
    </div>`;
}
