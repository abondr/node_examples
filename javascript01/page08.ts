enum DayOfWeek {
    SUN = 10, MON, TUE, WED, THU, FRI, SAT
}
let day: DayOfWeek;
day = DayOfWeek.MON;
let day2 = DayOfWeek.MON;
if (day === day2) {
    console.log("this is monday" + DayOfWeek.MON);
}
console.log("this is sunday" + DayOfWeek.SUN);