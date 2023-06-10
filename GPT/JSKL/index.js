// JavaScript 코드 작성 부분
// 필요한 기능을 구현하거나 API와의 통신 등을 처리할 수 있습니다.
// 자바 백엔드와의 연동은 해당 부분에서 구현하시면 됩니다.

// 달력 생성 함수
function generateCalendar() {
    const calendarContainer = document.getElementById('calendar-container');

    // 현재 날짜 정보 가져오기
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // 달력 표시 영역 생성
    const calendar = document.createElement('div');
    calendar.classList.add('calendar');

    // 년도와 월 표시
    const monthYearHeader = document.createElement('h3');
    monthYearHeader.innerText = `${currentYear}년 ${currentMonth + 1}월`;
    calendar.appendChild(monthYearHeader);

    // 요일 표시
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekdayRow = document.createElement('div');
    weekdayRow.classList.add('calendar-row');
    weekdays.forEach((weekday) => {
        const weekdayCell = document.createElement('div');
        weekdayCell.classList.add('calendar-cell', 'weekday');
        weekdayCell.innerText = weekday;
        weekdayRow.appendChild(weekdayCell);
    });
    calendar.appendChild(weekdayRow);

    // 날짜 표시
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    let dayCount = 1;
    let calendarRow = document.createElement('div');
    calendarRow.classList.add('calendar-row');

    // 첫 번째 주에서 첫 번째 날짜 이전의 빈 칸 생성
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-cell', 'empty');
        calendarRow.appendChild(emptyCell);
    }
    // 날짜 채우기
    for (let i = firstDayOfWeek; i < 7; i++) {
        const calendarCell = document.createElement('div');
        calendarCell.classList.add('calendar-cell', 'date');
        calendarCell.innerText = dayCount;
        calendarRow.appendChild(calendarCell);
        dayCount++;

        if (dayCount > totalDays) {
            break;
        }
    }

    calendar.appendChild(calendarRow);

    // 나머지 주 채우기
    while (dayCount <= totalDays) {
        calendarRow = document.createElement('div');
        calendarRow.classList.add('calendar-row');

        for (let i = 0; i < 7; i++) {
            if (dayCount > totalDays) {
                break;
            }

            const calendarCell = document.createElement('div');
            calendarCell.classList.add('calendar-cell', 'date');
            calendarCell.innerText = dayCount;
            calendarRow.appendChild(calendarCell);
            dayCount++;
        }

        calendar.appendChild(calendarRow);
    }

    calendarContainer.appendChild(calendar);
}

// 달력 생성 함수 호출
generateCalendar();
