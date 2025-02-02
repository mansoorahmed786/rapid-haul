import { format } from 'date-fns';

function formatDate(djangoDatetime) {
  const date = new Date(djangoDatetime); // Parse Django datetime
  return format(date, "MMMM do, yyyy 'at' h:mm:ss a"); // e.g., "January 12, 2025 at 3:30:00 PM"
}

export { formatDate };
