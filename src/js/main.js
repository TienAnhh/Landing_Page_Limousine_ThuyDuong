document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('.header');
  const bookingForm = document.getElementById('bookingForm');
  const quickContactBtns = document.querySelectorAll('.quick-contact-btn');

  // Add bounce animation to contact buttons after page load
  setTimeout(() => {
    quickContactBtns.forEach((btn, index) => {
      setTimeout(() => {
        btn.classList.add('bounce');
        setTimeout(() => {
          btn.classList.remove('bounce');
        }, 1000);
      }, index * 300);  // Staggered animations
    });
  }, 1500);

  // Repeat bounce animation every 30 seconds
  setInterval(() => {
    quickContactBtns.forEach((btn, index) => {
      setTimeout(() => {
        btn.classList.add('bounce');
        setTimeout(() => {
          btn.classList.remove('bounce');
        }, 1000);
      }, index * 300);
    });
  }, 30000);

  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close hamburger menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Scroll event for header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Simple location autocomplete (in place of Google Maps API)
  const pickupInput = document.getElementById('pickupLocation');
  const dropoffInput = document.getElementById('dropoffLocation');

  // Common locations in Móng Cái and Hải Phòng
  const commonLocations = [
    'Bến xe Móng Cái, TP Móng Cái, Quảng Ninh',
    'Trung tâm thương mại Móng Cái, Quảng Ninh',
    'Cửa khẩu Móng Cái, Quảng Ninh',
    'Bến xe Kiến An, Hải Phòng',
    'Bến xe Lạc Long, Hải Phòng',
    'Trung tâm thương mại Aeon Mall, Hải Phòng',
    'Cảng Hải Phòng, Hải Phòng',
    'Sân bay Cát Bi, Hải Phòng',
    'Bến xe Niệm Nghĩa, Hải Phòng',
    'Hồ Đồng Đò, Móng Cái, Quảng Ninh',
    'Chợ Hạ Long, Quảng Ninh',
    'Bệnh viện Việt Tiệp, Hải Phòng',
    'Đại học Hải Phòng, Hải Phòng',
    'Quảng trường Thành phố, Móng Cái, Quảng Ninh',
    'Phố đi bộ Hải Phòng, Hải Phòng',
    'Vinhomes Imperia, Hải Phòng',
    'Khách sạn Wyndham, Hải Phòng',
    'Khách sạn Royal, Móng Cái, Quảng Ninh',
    'Chợ đêm Hạ Long, Quảng Ninh',
    'Đảo Tuần Châu, Quảng Ninh'
  ];

  // Function to create and show suggestions
  function setupLocationAutocomplete(inputElement) {
    if (!inputElement) return;

    // Create suggestions container
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'suggestions-container';
    suggestionsContainer.style.display = 'none';
    inputElement.parentElement.appendChild(suggestionsContainer);

    inputElement.addEventListener('input', function() {
      const inputValue = this.value.toLowerCase();

      if (inputValue.length < 2) {
        suggestionsContainer.style.display = 'none';
        return;
      }

      // Filter matching locations
      const filteredLocations = commonLocations.filter(location =>
        location.toLowerCase().includes(inputValue)
      );

      // Show suggestions
      if (filteredLocations.length > 0) {
        suggestionsContainer.innerHTML = '';
        filteredLocations.slice(0, 5).forEach(location => {
          const suggestionItem = document.createElement('div');
          suggestionItem.className = 'suggestion-item';
          suggestionItem.textContent = location;
          suggestionItem.addEventListener('click', function() {
            inputElement.value = location;
            suggestionsContainer.style.display = 'none';
          });
          suggestionsContainer.appendChild(suggestionItem);
        });
        suggestionsContainer.style.display = 'block';
      } else {
        suggestionsContainer.style.display = 'none';
      }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
      if (e.target !== inputElement) {
        suggestionsContainer.style.display = 'none';
      }
    });
  }

  // Setup autocomplete for pickup and dropoff inputs
  setupLocationAutocomplete(pickupInput);
  setupLocationAutocomplete(dropoffInput);

   // Date picker setup using pure JavaScript
   const dateDisplayField = document.getElementById('bookingDateDisplay');
   const dateInputWrapper = dateDisplayField ? dateDisplayField.parentElement : null;
   
   if (dateDisplayField && dateInputWrapper) {
     // Set today's date as default
     const today = new Date();
     const defaultDate = formatDate(today);
     dateDisplayField.value = defaultDate;
     
     let currentDate = today;
     let isCalendarOpen = false;
     let calendar = null;
     
     // Format date as DD/MM/YYYY
     function formatDate(date) {
       const day = String(date.getDate()).padStart(2, '0');
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const year = date.getFullYear();
       return `${day}/${month}/${year}`;
     }
     
     // Event for clicking on the date field or icon
     dateInputWrapper.addEventListener('click', function(e) {
       e.preventDefault();
       e.stopPropagation();
       
       if (isCalendarOpen) {
         closeCalendar();
       } else {
         openCalendar();
       }
     });
     
     // Create and open calendar
     function openCalendar() {
       if (calendar) {
         calendar.remove();
       }
       
       calendar = document.createElement('div');
       calendar.className = 'custom-calendar';
       
       // Create calendar header
       const header = document.createElement('div');
       header.className = 'calendar-header';
       
       const prevBtn = document.createElement('button');
       prevBtn.innerHTML = '&lt;';
       prevBtn.addEventListener('click', function(e) {
         e.stopPropagation();
         currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
         renderCalendar();
       });
       
       const nextBtn = document.createElement('button');
       nextBtn.innerHTML = '&gt;';
       nextBtn.addEventListener('click', function(e) {
         e.stopPropagation();
         currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
         renderCalendar();
       });
       
       const monthYearDisplay = document.createElement('div');
       monthYearDisplay.className = 'month-year';
       
       header.appendChild(prevBtn);
       header.appendChild(monthYearDisplay);
       header.appendChild(nextBtn);
       calendar.appendChild(header);
       
       // Create calendar days
       const daysContainer = document.createElement('div');
       daysContainer.className = 'calendar-days';
       calendar.appendChild(daysContainer);
       
       // Place calendar below the input
       dateInputWrapper.appendChild(calendar);
       isCalendarOpen = true;
       
       // Render the calendar
       renderCalendar();
       
       // Close calendar when clicking outside
       document.addEventListener('click', closeCalendarOnClickOutside);
     }
     
     // Render calendar content
     function renderCalendar() {
       if (!calendar) return;
       
       const monthYearDisplay = calendar.querySelector('.month-year');
       const daysContainer = calendar.querySelector('.calendar-days');
       
       // Month and year
       const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                     'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
       monthYearDisplay.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
       
       // Clear previous days
       daysContainer.innerHTML = '';
       
       // Add day headers
       const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
       dayNames.forEach(day => {
         const dayHeader = document.createElement('div');
         dayHeader.className = 'day-name';
         dayHeader.textContent = day;
         daysContainer.appendChild(dayHeader);
       });
       
       // Get start of month
       const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
       const startingDay = firstDay.getDay(); // 0 is Sunday, 1 is Monday, etc.
       
       // Add empty spaces for days before start of month
       for (let i = 0; i < startingDay; i++) {
         const emptyDay = document.createElement('div');
         emptyDay.className = 'day empty';
         daysContainer.appendChild(emptyDay);
       }
       
       // Days in month
       const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
       const today = new Date();
       today.setHours(0, 0, 0, 0);
       
       for (let i = 1; i <= daysInMonth; i++) {
         const day = document.createElement('div');
         day.className = 'day';
         day.textContent = i;
         
         const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
         dateToCheck.setHours(0, 0, 0, 0);
         
         // Disable past days
         if (dateToCheck < today) {
           day.classList.add('disabled');
         } else {
           day.addEventListener('click', function(e) {
             e.stopPropagation();
             const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
             dateDisplayField.value = formatDate(selectedDate);
             currentDate = selectedDate;
             closeCalendar();
           });
         }
         
         // Highlight today
         if (dateToCheck.getTime() === today.getTime()) {
           day.classList.add('today');
         }
         
         daysContainer.appendChild(day);
       }
     }
     
     // Close calendar
     function closeCalendar() {
       if (calendar) {
         calendar.remove();
         calendar = null;
         isCalendarOpen = false;
         document.removeEventListener('click', closeCalendarOnClickOutside);
       }
     }
     
     // Close calendar when clicking outside
     function closeCalendarOnClickOutside(e) {
       if (!dateInputWrapper.contains(e.target)) {
         closeCalendar();
       }
     }
   }

  // Restrict phone number input to only accept numbers
  const phoneInput = document.getElementById('phoneNumber');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Remove any non-numeric characters
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }

  // Booking form validation only (Telegram submit is handled separately)
  if (bookingForm) {
    bookingForm.addEventListener('input', function(e) {
      const target = e.target;

      // Validate on input change
      if (target.id === 'customerName') {
        if (!target.value.trim()) {
          showError(target, 'Vui lòng nhập họ tên');
        } else {
          clearError(target);
        }
      } else if (target.id === 'phoneNumber') {
        if (!target.value.trim()) {
          showError(target, 'Vui lòng nhập số điện thoại');
        } else if (!isValidPhone(target.value.trim())) {
          showError(target, 'Số điện thoại không hợp lệ');
        } else {
          clearError(target);
        }
      } else if (target.id === 'pickupLocation') {
        if (!target.value.trim()) {
          showError(target, 'Vui lòng nhập điểm đón');
        } else {
          clearError(target);
        }
      } else if (target.id === 'dropoffLocation') {
        if (!target.value.trim()) {
          showError(target, 'Vui lòng nhập điểm đến');
        } else {
          clearError(target);
        }
      } else if (target.id === 'travelTime') {
        if (!target.value.trim()) {
          showError(target, 'Vui lòng chọn khung giờ');
        } else {
          clearError(target);
        }
      } else if (target.id === 'seats') {
        if (!target.value.trim() || target.value < 1) {
          showError(target, 'Vui lòng chọn số lượng ghế');
        } else {
          clearError(target);
        }
      }
    });
  }

  // Helper functions for form validation
  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');

    errorMessage.className = 'error-message';
    errorMessage.textContent = message;

    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorMessage);
    }

    input.classList.add('invalid');
  }

  function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');

    if (errorMessage) {
      errorMessage.remove();
    }

    input.classList.remove('invalid');
  }

  function isValidPhone(phone) {
    // Simple Vietnamese phone number validation
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(phone);
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for the fixed header
        behavior: 'smooth'
      });
    }
  });
});

// ... existing code ... setupLocationAutocomplete(dropoffInput);

 

  // Restrict phone number input to only accept numbers
// ... existing code ...