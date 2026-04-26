import { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { zhTW } from 'date-fns/locale';

interface TimeAgoProps {
  timestamp: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTineAgo = () => {
      try {
        const date = parseISO(timestamp);
        setTimeAgo(formatDistanceToNow(date, { addSuffix: true, locale: zhTW }));
      } catch (error) {
        console.error("時間格式錯誤", error);
        setTimeAgo("無效時間");
      }
    };

    updateTineAgo();
    const intervalId = setInterval(updateTineAgo, 10000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span className="text-[10px] text-slate-500 font-mono">{timeAgo}</span>;
};

export default TimeAgo;
