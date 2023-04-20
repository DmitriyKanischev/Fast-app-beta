import React from 'react';

export function SearchStatus({length}) {
    const dynamicPhrase = (length) => {
        if (length > 4 || length === 1) {
            return `${length} человек тусанёт с тобой сегодня`
        } else if (length === 0) {
            return 'Никто не тусанёт с тобой сегодня'
        } else {
            return `${length} человека тусанут с тобой сегодня`
        }
    }

    return (
        <h1>
            <span className={"badge m-2 py-2 px-4 bg-" +(length > 0 ? "primary" : "danger")}>{dynamicPhrase(length)}</span>
        </h1>

    )
}