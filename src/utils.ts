export const getTimezoneCookie = (location) => {
    const continent = location.split("/")[0]
    const city = location.split("/")[1]
    const timezoneCookie = `tz=${continent}%2F${city};`
    return timezoneCookie
}