const formatDate = (date) => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const yesterday = new Date(todayDate);
  yesterday.setDate(yesterday.getDate() - 1);

  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);

  const weekday = currentDate.toLocaleDateString([], { weekday: "short" });
  const day = currentDate.toLocaleDateString([], { day: "numeric" });
  const month = currentDate.toLocaleDateString([], { month: "short" });
  const year = currentDate.toLocaleDateString([], { year: "numeric" });

  if (currentDate.getTime() === todayDate.getTime()) {
    return "Today";
  } else if (currentDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else if (currentDate.getFullYear() === todayDate.getFullYear()) {
    const diffDays = todayDate.getDate() - currentDate.getDate();
    if (diffDays < 7) {
      return currentDate.toLocaleDateString([], { weekday: "long" });
    } else {
      return `${day} ${month} ${year}, ${weekday}`;
    }
  } else {
    return `${day} ${month} ${year}, ${weekday}`;
  }
};

export { formatDate };
