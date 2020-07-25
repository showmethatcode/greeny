export const getNumberOfDay = (numberOfDay) => {
    const formattedNumberOfDay = (numberOfDay === 7) ? 0 : numberOfDay + 1;
    return formattedNumberOfDay
};
