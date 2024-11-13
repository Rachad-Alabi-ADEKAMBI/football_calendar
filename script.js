document.addEventListener('DOMContentLoaded', () => {
    let currentDate = new Date();
    let selectedDate = null;
  
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const currentMonthElement = document.getElementById('currentMonth');
    const calendarDaysElement = document.getElementById('calendarDays');
    const selectedDateElement = document.getElementById('selectedDate');
  
    // Format the date as "MMMM yyyy"
    function formatMonth(date) {
      const options = { year: 'numeric', month: 'long' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
  
    // Get all the days in the current month
    function getMonthDays(date) {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const days = [];
  
      for (let day = startOfMonth; day <= endOfMonth; day.setDate(day.getDate() + 1)) {
        days.push(new Date(day));
      }
  
      return days;
    }
  
    // Render the calendar
    function renderCalendar() {
      currentMonthElement.textContent = formatMonth(currentDate);
      const days = getMonthDays(currentDate);
  
      // Clear the existing days
      calendarDaysElement.innerHTML = '';
  
      // Generate the day buttons
      days.forEach(day => {
        const dayButton = document.createElement('button');
        dayButton.classList.add('day');
        dayButton.textContent = day.getDate();
        dayButton.addEventListener('click', () => handleDateClick(day));
  
        // Check if the day is in the current month
        if (day.getMonth() !== currentDate.getMonth()) {
          dayButton.disabled = true;
        }
  
        // Highlight today's date
        if (isToday(day)) {
          dayButton.classList.add('today');
        }
  
        // Highlight selected date
        if (selectedDate && isSameDay(day, selectedDate)) {
          dayButton.classList.add('selected');
        }
  
        calendarDaysElement.appendChild(dayButton);
      });
    }
  
    // Check if the date is today's date
    function isToday(date) {
      const today = new Date();
      return date.getDate() === today.getDate() &&
             date.getMonth() === today.getMonth() &&
             date.getFullYear() === today.getFullYear();
    }
  
    // Check if two dates are the same day
    function isSameDay(date1, date2) {
      return date1.getDate() === date2.getDate() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getFullYear() === date2.getFullYear();
    }
  
    // Handle the date click
    function handleDateClick(day) {
      selectedDate = isSameDay(selectedDate, day) ? null : day;
      renderCalendar();
  
      selectedDateElement.textContent = selectedDate
        ? `Selected: ${formatDate(selectedDate)}`
        : `Today: ${formatDate(new Date())}`;
    }
  
    // Format the date
    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
  
    // Go to previous month
    prevMonthButton.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  
    // Go to next month
    nextMonthButton.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  
    // Initial render
    renderCalendar();
  });
  