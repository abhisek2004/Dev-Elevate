// components/Hackathons/HackathonTimer.tsx
import React, { useState, useEffect } from 'react';
import { Hackathon } from '../../types/hackathon';
import { Clock, Calendar } from 'lucide-react';

interface HackathonTimerProps {
  hackathon: Hackathon;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const HackathonTimer: React.FC<HackathonTimerProps> = ({ hackathon }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const regDeadline = new Date(hackathon.registrationDeadline);
    const startDate = new Date(hackathon.startDate);
    const endDate = new Date(hackathon.endDate);

    // Determine which date to count down to
    if (hackathon.status === 'upcoming' && now < regDeadline) {
      setTargetDate(regDeadline);
      setLabel('Registration ends in');
    } else if (hackathon.status === 'upcoming' && now < startDate) {
      setTargetDate(startDate);
      setLabel('Starts in');
    } else if (hackathon.status === 'active' && now < endDate) {
      setTargetDate(endDate);
      setLabel('Ends in');
    } else {
      setTargetDate(null);
      setLabel('Event ended');
    }
  }, [hackathon]);

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate && hackathon.status !== 'ended') {
    return null;
  }

  if (hackathon.status === 'ended') {
    return (
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Event Ended</span>
        </div>
        <p className="text-xs opacity-80">Thank you for participating!</p>
      </div>
    );
  }

  const hasTimeLeft = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;

  if (!hasTimeLeft) {
    return (
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Clock className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Time's Up!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-2">
        <Clock className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        {timeLeft.days > 0 && (
          <div className="text-center">
            <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
            <div className="text-xs opacity-80">{timeLeft.days === 1 ? 'Day' : 'Days'}</div>
          </div>
        )}
        
        {(timeLeft.days > 0 || timeLeft.hours > 0) && (
          <div className="text-center">
            <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-xs opacity-80">{timeLeft.hours === 1 ? 'Hour' : 'Hours'}</div>
          </div>
        )}
        
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-xs opacity-80">{timeLeft.minutes === 1 ? 'Min' : 'Mins'}</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className="text-xs opacity-80">{timeLeft.seconds === 1 ? 'Sec' : 'Secs'}</div>
        </div>
      </div>
    </div>
  );
};

export default HackathonTimer;
