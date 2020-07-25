export const getNumberOfDay = (numberOfDay) => {
    const formattedNumberOfDay = (numberOfDay === 7) ? 0 : numberOfDay + 1;
    return formattedNumberOfDay
};

export const getTimezoneCookie = (location) => {
    const continent = location.split("/")[0]
    const city = location.split("/")[1]
    const timezoneCookie = `tz=${continent}%2F${city};`
    return timezoneCookie
}