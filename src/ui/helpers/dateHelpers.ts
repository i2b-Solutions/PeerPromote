export const isValidDate = (day: number, month: number, year: number) => {
    if (year < 1900 || year > 9999) {
        return false;
    }

    if (month < 1 || month > 12) {
        return false;
    }

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDayOfMonth) {
        return false;
    }

    const proposedDate = new Date(year, month - 1, day);
    return proposedDate.getFullYear() === year &&
        proposedDate.getMonth() === month - 1 &&
        proposedDate.getDate() === day;
}

export function calculateAge(date: { day: number, month: number, year: number }): number {
    const today = new Date();
    const birthDate = new Date(date.year, date.month - 1, date.day);
    let age = today.getFullYear() - birthDate.getFullYear();
  
    // Adjust for months and days
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  