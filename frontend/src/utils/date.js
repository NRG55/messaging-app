export function formatLastConversationDate(rawDate) {
    if (!rawDate) {
        return '';
    }
    
    const dateToFormat = new Date(rawDate);
    const now = new Date();
   
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const givenDate = new Date(dateToFormat.getFullYear(), dateToFormat.getMonth(), dateToFormat.getDate());

    const timeDifferenceInMilliseconds = today - givenDate;
    const timeDifferenceInDays = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);

    // Less than 1 day ago, example: "17:20"
    if (timeDifferenceInDays === 0) {
        return dateToFormat.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }
    
    // Less than 7 days ago, example: "Mon", "Tue"
    if (timeDifferenceInDays > 0 && timeDifferenceInDays < 7) {
        return dateToFormat.toLocaleDateString([], { weekday: 'short' });
    }

    // More than 7 days ago, example: "23/10/2026"
    return dateToFormat.toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export function formatLastSeenDate(rawDate) {
    if (!rawDate) {
        return 'last seen a long time ago';
    }

    const dateToFormat = new Date(rawDate);
    const now = new Date();

    const timeDifferenceInSeconds = Math.floor((now - dateToFormat) / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);

    // Less than 1 minute ago, example: "last seen just now"
    if (timeDifferenceInSeconds < 60) {
        return 'last seen just now';
    }

    // Less than 1 hour ago, example: "last seen 5 minutes ago"
    if (timeDifferenceInMinutes < 60) {
        return `last seen ${timeDifferenceInMinutes} ${timeDifferenceInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    // Less than 24 hours ago, example: "last seen 5 hours ago"
    if (timeDifferenceInHours < 24) {
        return `last seen ${timeDifferenceInHours} ${timeDifferenceInHours === 1 ? 'hour' : 'hours'} ago`;
    }

    // More than a day ago, example: "last seen on 23/10/2026"
    const formattedDate = dateToFormat.toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    
    return `last seen on ${formattedDate}`;
}