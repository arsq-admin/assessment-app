import {
  AssessmentConfig,
  LogicAction,
  Question,
  QuestionType,
  TargetType,
} from "@/api/assessment/types";
import { AssessmentAnswers } from "@/pages/assessmentPage/types/assessmentAnswers";
import { FormattedAnswers } from "@/pages/reviewPage/useAnswers";
import { isConditionMet } from "@/pages/assessmentPage/services";

export const getQuestionOrder = (config: AssessmentConfig) => {
  const order: string[] = [];

  config.sections.forEach((section) => {
    section.questions.forEach((question) => {
      order.push(question.id);
    });
  });

  return order;
};

export const indexQuestionById = (config: AssessmentConfig) => {
  const indexById: Record<string, Question> = {};

  config.sections.forEach((section) => {
    section.questions.forEach((question) => {
      indexById[question.id] = question;
    });
  });

  return indexById;
};

export const formatAnswers = (
  config: AssessmentConfig,
  answers: AssessmentAnswers
): FormattedAnswers => {
  const formattedAnswers: FormattedAnswers = {};

  Object.keys(answers).forEach((questionId) => {
    const currentSection = config?.sections.find((section) => {
      return section.questions.find((question) => question.id === questionId);
    });

    const currentQuestion = currentSection?.questions.find((question) => {
      return question.id === questionId;
    });

    if (!currentQuestion || !currentSection) {
      return;
    }

    if (!formattedAnswers[currentSection.name]) {
      formattedAnswers[currentSection.name] = [];
    }

    formattedAnswers[currentSection.name].push({
      question: currentQuestion.title,
      id: questionId,
      answers: answers[questionId].answer.map((answer) => {
        const label =
          "options" in currentQuestion &&
          currentQuestion.options.find(
            (option) => option.value === answer.value
          )?.name;

        return {
          ...answer,
          label: label || "",
        };
      }),
    });
  });

  return formattedAnswers;
};

export const getLastAnsweredQuestion = (
  questionOrder: string[],
  answers: AssessmentAnswers
) => {
  const answeredQuestionIds = Object.keys(answers);

  let latestQuestionIndex = -1;
  let latestQuestionId = "";

  answeredQuestionIds.forEach((id) => {
    const index = questionOrder.findIndex((questionId) => id === questionId);

    if (index > latestQuestionIndex) {
      latestQuestionIndex = index;
      latestQuestionId = id;
    }
  });

  return { id: latestQuestionId, index: latestQuestionIndex };
};

export const getNextQuestion = (
  config: AssessmentConfig,
  currentQuestionId: string,
  answers: AssessmentAnswers = {}
) => {
  const allQuestions = indexQuestionById(config);
  const order = getQuestionOrder(config);

  const question = allQuestions[currentQuestionId];
  const questionIndex = order.findIndex((id) => id === currentQuestionId);

  // Return null if unable to find the question from config
  if (!question) return null;

  // Return null if it's the last question
  if (questionIndex === order.length - 1) return null;

  const { logic } = question;

  if (logic) {
    const currentAnswer = answers?.[currentQuestionId] || {};
    const formattedAnswer =
      currentAnswer?.answer?.map(({ value }) => value) || [];

    const firstLogicMatchedIndex = logic.findIndex(({ condition }) =>
      isConditionMet(condition, formattedAnswer, answers)
    );

    if (firstLogicMatchedIndex !== -1) {
      const { target, action } = logic[firstLogicMatchedIndex];

      if (action === LogicAction.END) {
        // Return null as the assessment will end
        return null;
      }

      if (action === LogicAction.SKIP) {
        if (target.type === TargetType.QUESTION) {
          return allQuestions[target.value];
        }

        // Return null as not skipping to a question
        return null;
      }
    }
  }

  const nextIndex = questionIndex + 1;
  return allQuestions[order[nextIndex]];
};

export const getRemainingQuestionsInSection = (
  config: AssessmentConfig,
  sectionName: string,
  answers: AssessmentAnswers
) => {
  const order = getQuestionOrder(config);

  const lastAnsweredQuestion = getLastAnsweredQuestion(order, answers);

  if (!lastAnsweredQuestion.id) return [];

  const nextQuestion = getNextQuestion(
    config,
    lastAnsweredQuestion.id,
    answers
  );

  if (!nextQuestion) return [];

  const nextQuestionIndex = order.findIndex((id) => id === nextQuestion?.id);

  if (nextQuestionIndex === -1) return [];

  const remainingQuestionIds = order.slice(nextQuestionIndex);

  const currentSection = config?.sections.find(
    (section) => section.name === sectionName
  );

  return (
    currentSection?.questions.filter((question) => {
      return remainingQuestionIds.includes(question.id);
    }) || []
  );
};

export const areThereUnansweredQuestions = (
  config: AssessmentConfig,
  answers: AssessmentAnswers
) => {
  const order = getQuestionOrder(config);
  const lastAnsweredQuestion = getLastAnsweredQuestion(order, answers);

  if (!lastAnsweredQuestion.id) return false;

  const nextQuestion = getNextQuestion(
    config,
    lastAnsweredQuestion.id,
    answers
  );

  return Boolean(nextQuestion);
};

export const isQuestionLaterInAssessment = (
  config: AssessmentConfig,
  questionAId: string,
  questionBId: string
) => {
  const order = getQuestionOrder(config);
  const indexA = order.findIndex((id) => id === questionAId);
  const indexB = order.findIndex((id) => id === questionBId);

  return indexA > indexB;
};

export const getQuestionJourneyFromAnswers = (
  config: AssessmentConfig,
  answers: AssessmentAnswers,
  startingQuestionId?: string
) => {
  const allQuestions = indexQuestionById(config);

  const currentAnswers: AssessmentAnswers = {};
  const journey = [];

  let questionId =
    startingQuestionId || config?.sections?.[0]?.questions?.[0]?.id;

  while (questionId) {
    const question = allQuestions[questionId];
    journey.push(question.id);
    currentAnswers[question.id] = answers[question.id];

    const nextQuestion = getNextQuestion(config, questionId, currentAnswers);

    if (!nextQuestion) {
      break;
    }

    questionId = nextQuestion.id;
  }

  return journey;
};

export const hasMissingAnswers = (
  journey: string[],
  answers: AssessmentAnswers
) => {
  return !journey.every((questionId) => {
    return answers[questionId]?.answer?.length > 0;
  });
};

export const getFirstUnansweredQuestion = (
  journey: string[],
  answers: AssessmentAnswers
) => {
  let unansweredQuestion = "";

  journey.find((questionId) => {
    if (answers[questionId]?.answer?.length > 0) {
      return false;
    }

    unansweredQuestion = questionId;
    return true;
  });

  return unansweredQuestion;
};

export const isAssessmentComplete = (
  questionJourney: string[],
  answers: AssessmentAnswers
) => {
  return questionJourney.every((questionId) => {
    return answers[questionId];
  });
};

export const getQuestionFromConfig = (
  config: AssessmentConfig,
  questionId: string
): {
  question: Question | null;
  section: string;
} => {
  if (!questionId) {
    return {
      question: null,
      section: "",
    };
  }

  for (let i = 0; i <= config.sections.length - 1; i++) {
    const { questions } = config.sections[i];
    for (let j = 0; j <= questions.length - 1; j++) {
      if (questions[j].id === questionId) {
        return { question: questions[j], section: config.sections[i].name };
      }
    }
  }

  return {
    question: null,
    section: "",
  };
};

export const getQuestionMinimumRequiredAnswer = (question: Question) => {
  const { type } = question;

  if (type === QuestionType.MULTIPLE_CHOICE) {
    const minOption = question.options.find((option) => {
      return option.minimumRequired === true;
    });

    return minOption?.name;
  }

  return undefined;
};
