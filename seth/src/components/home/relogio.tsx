import React, { useState, useEffect } from 'react';
import '../../App.css';

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID); 
  }, []);

  const tick = () => {
    setTime(new Date());
  };

  const formatHours = (date: Date) => {
    return date.getHours().toString().padStart(2, '0');
  };

  const formatMinutes = (date: Date) => {
    return date.getMinutes().toString().padStart(2, '0');
  };

  const formatDay = (date: Date) => {
    return date.getDate().toString().padStart(2, '0');
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('default', { month: 'long' });
  };

  const formatYear = (date: Date) => {
    return date.getFullYear().toString();
  };

  const formatWeekday = (date: Date) => {
    return date.toLocaleDateString('default', { weekday: 'long' });
  };

  return (
    <div className='clockHome'>
      <div className='clockTimeCSS'>
        <div className='clockHour'>
          {formatHours(time)}:
        </div>
        <div className='clockMinute'>
          {formatMinutes(time)}
        </div>
      </div>
      <div className='clockDateCSS'>
        <div className='clockWeekday'>
          {formatWeekday(time)}
        </div>
        <div className='clockDay'>
          {formatDay(time)}
        </div>
        <div className='clockMonth'>
          {formatMonth(time)}
        </div>
        <div className='clockYear'>
          {formatYear(time)} 
        </div>
      </div>
    </div>
  );
};

export default Clock;
