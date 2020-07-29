"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimezoneCookie = void 0;
exports.getTimezoneCookie = function (location) {
    var continent = location.split("/")[0];
    var city = location.split("/")[1];
    var timezoneCookie = "tz=" + continent + "%2F" + city + ";";
    return timezoneCookie;
};
