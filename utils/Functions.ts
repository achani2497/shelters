export function daysPassed(arriveDate: string) {
    const arrivalDate = new Date(arriveDate);
    const currentDate = new Date();

    const diffInMs = currentDate.getTime() - arrivalDate.getTime();

    const msInADay = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const diffInDays = diffInMs / msInADay;

    const days = Math.floor(diffInDays);

    return days
}