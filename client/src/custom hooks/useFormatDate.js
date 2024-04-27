const useFormatDate = () => {
    const basicFormat = (dateString) => {
        const trueDate = new Date(dateString)
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        // Normalize to start of the day for accurate comparison
        today.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (date.getTime() === today.getTime()) {
            return trueDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
        } else if (date.getTime() === yesterday.getTime()) {
            return 'yesterday';
        } else if (date.getTime() < today.getTime() && date.getTime() >= (yesterday.getTime() - 6 * 24 * 3600 * 1000)) {
            return trueDate.toLocaleDateString(undefined, { weekday: 'long' });
        }
        return trueDate.toLocaleDateString();
    };

    return { basicFormat };
}

export default useFormatDate;
