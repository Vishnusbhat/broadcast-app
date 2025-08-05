export function getDeadline (date) {
    let d = new Date();
    let currentTime = new Date(date);
    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const requiredMinutes = minutes % 30;
    d.setDate(currentTime.getDate() + 1);
    d.setHours(hour);
    d.setMinutes(minutes + (30 - requiredMinutes));
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}