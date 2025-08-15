const formatDate = (date) => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const yesterday = new Date(todayDate);
  yesterday.setDate(yesterday.getDate() - 1);

  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);

  if (currentDate.getTime() === todayDate.getTime()) {
    return "Today";
  } else if (currentDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else if (currentDate.getFullYear() === todayDate.getFullYear()) {
    const diffDays = todayDate.getDate() - currentDate.getDate();
    if (diffDays < 7) {
      return currentDate.toLocaleDateString([], { weekday: "long" });
    } else {
      return currentDate.toLocaleDateString([], {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    }
  } else {
    return currentDate.toLocaleDateString([], {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};

export { formatDate };
