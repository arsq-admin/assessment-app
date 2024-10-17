import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  questionId: string;
  setJourney: Dispatch<SetStateAction<string[]>>;
}

export const useSetJourney = ({ questionId, setJourney }: Props) => {
  useEffect(() => {
    if (questionId) {
      setJourney((prevState) => {
        if (questionId === prevState[prevState.length - 2]) {
          const newState = [...prevState];
          newState.pop();
          return newState;
        }
        return [...prevState, questionId];
      });
    }
  }, [questionId, setJourney]);
};
