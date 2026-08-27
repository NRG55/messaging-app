export function formatLastConversationDate(rawDate) {
    if (!rawDate) {
        return '';
    }
    
    const dateToFormat = new Date(rawDate);
    const now = new Date();
   
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const givenDate = new Date(dateToFormat.getFullYear(), dateToFormat.getMonth(), dateToFormat.getDate());

    const timeDifferenceInMilliseconds = today - givenDate;
    const daysDifference = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);

    if (daysDifference === 0) {
        // 17:20
        return dateToFormat.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false,
        });
    }
    
    if (daysDifference > 0 && daysDifference < 7) {
        // "Mon", "Tue"
        return dateToFormat.toLocaleDateString([], { weekday: 'short' });
    }

    // 01/01/2026
    return dateToFormat.toLocaleDateString([], { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
    });
}