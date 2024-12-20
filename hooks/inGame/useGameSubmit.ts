import { useState } from 'react';

interface SubmitData {
  nickname: string;
  roundId: number;
  coordinate: number[] | null;
}

export const useGameSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAnswer = async (data: SubmitData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('좌표 전송 실패');
      }

      return true;
    } catch (error) {
      console.error('네트워크 오류:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitAnswer, isSubmitting };
};
