import { Dispatch, Fragment, SetStateAction, useContext } from "react";
import { isConditionMet } from "../services";
import { FollowUp, QuestionType } from "../types/assessmentConfig";
import { FreeText } from "./FreeText";
import { CheckboxGroup } from "./CheckboxGroup";
import { Typography } from "@mui/material";
import { RadioGroup } from "./RadioGroup";
import { AssessmentContext } from "../../../context";

interface Props {
  value: (string | number)[];
  config: FollowUp[];
  setFollowUpValue: Dispatch<
    SetStateAction<Record<string, (string | number)[]>>
  >;
  followUpValue: Record<string, (string | number)[]>;
  followUpFreeText: Record<string, Record<string, string>>;
  setFollowUpFreeText: Dispatch<
    SetStateAction<Record<string, Record<string, string>>>
  >;
}

export const FollowUpQuestions = ({
  config,
  value,
  setFollowUpValue,
  followUpValue,
  followUpFreeText,
  setFollowUpFreeText,
}: Props) => {
  const { currentAnswers } = useContext(AssessmentContext);
  return config.map((setting) => {
    const { condition, questions } = setting;

    return (
      isConditionMet(condition, value, currentAnswers) &&
      questions.map((question) => {
        if (question.type === QuestionType.TEXT) {
          return (
            <FreeText
              key={question.id}
              label={question.title}
              onChange={(event) =>
                setFollowUpValue((prevState) => ({
                  ...prevState,
                  [question.id]: [event.target.value],
                }))
              }
              value={followUpValue?.[question.id]?.[0] || ""}
            />
          );
        }

        if (question.type === QuestionType.MULTIPLE_CHOICE) {
          return (
            <Fragment key={question.id}>
              <Typography variant="h5">{question.title}</Typography>
              {question.allowMultiple ? (
                <CheckboxGroup
                  value={followUpValue?.[question.id] || []}
                  freeText={followUpFreeText?.[question.id] || {}}
                  onChange={(event) => {
                    setFollowUpValue((prevState) => {
                      const initialValue = prevState[question.id] || [];
                      const currentValue = [
                        ...initialValue.filter(
                          (value) => value !== event.target.value
                        ),
                      ];

                      if (event.target.checked) {
                        currentValue.push(event.target.value);
                      }

                      return {
                        ...prevState,
                        [question.id]: currentValue,
                      };
                    });
                  }}
                  freeTextOnChange={(event, optionValue) => {
                    setFollowUpFreeText((prevState) => ({
                      ...prevState,
                      [question.id]: {
                        ...prevState[question.id],
                        [optionValue]: event.target.value,
                      },
                    }));
                  }}
                  options={question.options}
                />
              ) : (
                <RadioGroup
                  value={followUpValue?.[question.id]?.[0] || ""}
                  freeText={
                    followUpFreeText?.[question.id]?.[
                      followUpValue?.[question.id]?.[0]
                    ] || ""
                  }
                  onChange={(event) => {
                    setFollowUpValue((prevState) => ({
                      ...prevState,
                      [question.id]: [event.target.value],
                    }));
                  }}
                  freeTextOnChange={(event, optionValue) =>
                    setFollowUpFreeText((prevState) => ({
                      ...prevState,
                      [question.id]: {
                        ...prevState[question.id],
                        [optionValue]: event.target.value,
                      },
                    }))
                  }
                  options={question.options}
                  questionId={question.id}
                />
              )}
            </Fragment>
          );
        }
      })
    );
  });
};
