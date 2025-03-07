export const formatDate = (dateString: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24-hour format
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    
    const date = new Date(dateString.toString().replace(/\.\d+/, '') + 'Z');
    return new Intl.DateTimeFormat('en-US', options).format(date);
};