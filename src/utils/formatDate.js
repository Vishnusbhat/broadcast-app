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

const createdBefore = (timestamp) => {
  const now = Date.now();
  const difference = now - timestamp;
  if (difference < 60 * 1000) {
    if (Math.floor(difference / 1000) === 0) return 'now'
    return `${Math.floor(difference / 1000)} seconds ago`;
  } else if (difference < 1000 * 60 * 60) {
    return `${Math.floor(difference / (60 * 1000))} minutes ago`;
  } else if (difference < 1000 * 60 * 60 * 24) {
    return `${Math.floor(difference / (60 * 1000 * 60))} hours ago`;
  } else {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    const dayofweek = date.toLocaleString('default', { weekday: 'short' });
    const day = date.getDate();
    return `${day} ${month} ${year}, ${dayofweek}`;
  }
};
export { formatDate, createdBefore };
