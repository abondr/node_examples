var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["SUN"] = 10] = "SUN";
    DayOfWeek[DayOfWeek["MON"] = 11] = "MON";
    DayOfWeek[DayOfWeek["TUE"] = 12] = "TUE";
    DayOfWeek[DayOfWeek["WED"] = 13] = "WED";
    DayOfWeek[DayOfWeek["THU"] = 14] = "THU";
    DayOfWeek[DayOfWeek["FRI"] = 15] = "FRI";
    DayOfWeek[DayOfWeek["SAT"] = 16] = "SAT";
})(DayOfWeek || (DayOfWeek = {}));
var day;
day = DayOfWeek.MON;
var day2 = DayOfWeek.MON;
if (day === day2) {
    console.log("this is monday" + DayOfWeek.MON);
}
console.log("this is sunday" + DayOfWeek.SUN);
