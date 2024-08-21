import {
  getQuestionOrder,
  indexQuestionById,
  formatAnswers,
  getLastAnsweredQuestion,
  getNextQuestion,
} from "./assessment";
import { mockAnswers, mockConfig } from "./mocks";

describe("getQuestionOrder", () => {
  it("should get the id of all the questions in the config in order", () => {
    expect(getQuestionOrder(mockConfig)).toEqual([
      "SAQ000-01",
      "SAQ000-02",
      "SAQ2",
      "SAQ4",
      "SAQ6",
      "SAQ8",
      "SAQ11",
      "SAQ15",
      "SAQ16",
      "SAQ17",
      "SAQ25",
      "SAQ29",
      "SAQ34",
      "SAQ38",
      "SAQ40",
      "SAQ42",
      "SAQ43",
      "SAQ45",
      "SAQ47",
      "SAQ48",
      "SAQ55",
      "SAQ57",
      "SAQ60",
      "SAQ61",
      "SAQ63",
      "SAQ78",
      "SAQ81",
      "SAQ82",
      "SAQ83",
      "SAQ84",
      "SAQ85",
      "SAQ86",
      "SAQ87",
      "SAQ98",
      "SAQ99",
      "SAQ100",
      "SAQ101",
      "SAQ102",
      "SAQ103",
      "SAQ104",
      "SAQ105",
      "SAQ106",
      "SAQ109",
      "SAQ115",
      "SAQ116",
      "SAQ120",
      "SAQ121",
      "SAQ122",
      "SAQ131",
      "SAQ132",
      "SAQ133",
    ]);
  });
});

describe("indexQuestionById", () => {
  it("should get the id of all the questions in the config in order", () => {
    expect(
      indexQuestionById({
        sections: [
          { questions: [{ id: "id1" }, { id: "id2" }, { id: "id3" }] },
          { questions: [{ id: "id4" }, { id: "id5" }, { id: "id6" }] },
        ],
      })
    ).toEqual({
      id1: { id: "id1" },
      id2: { id: "id2" },
      id3: { id: "id3" },
      id4: { id: "id4" },
      id5: { id: "id5" },
      id6: { id: "id6" },
    });
  });
});

describe("formatAnswers", () => {
  it("should format the answers to include question title and other information", () => {
    expect(formatAnswers(mockConfig, mockAnswers)).toEqual({
      Certification: [
        {
          answers: [{ label: "No", value: "no" }],
          id: "SAQ000-01",
          question: "Do you have any Information Security Certification?",
        },
      ],
      "Managing Security Risk": [
        {
          answers: [
            {
              freeText: "No idea",
              label: "Not applicable",
              value: "n/a",
            },
          ],
          id: "SAQ4",
          question:
            "Are there arrangements for reporting significant cyber security incidents to external authorities?",
        },
        {
          answers: [
            {
              label: "Yes",
              value: "yes",
            },
          ],
          id: "SAQ8",
          question:
            "Do senior management review the effectiveness of the information security programme on a regular basis?",
        },
        {
          answers: [
            {
              label: "EEA",
              value: "eea",
            },
          ],
          id: "SAQ11",
          question:
            "In which countries or regions will data or information be processed?",
        },
        {
          answers: [
            {
              label: "Yes",
              value: "yes",
            },
          ],
          id: "SAQ15",
          question:
            "Are proportionate measures in place to ensure that storage media containing  relevant data are not compromised?",
        },
      ],
      "Protecting from Cyber Attack & Identity and Access Management": [
        {
          answers: [
            {
              label: "Yes",
              value: "yes",
            },
          ],
          id: "SAQ34",
          question:
            "Are users only granted the level of access to information and systems that they require to perform their role?",
        },
        {
          answers: [
            {
              label: "Required for all users",
              value: "requiredForAllUsers",
            },
          ],
          id: "SAQ38",
          question:
            "Is multi-factor authentication implemented to authenticate users?",
        },
      ],
    });
  });
});

describe("getLastAnsweredQuestion", () => {
  it("should get me the id of the last answered question", () => {
    const order = getQuestionOrder(mockConfig);
    expect(getLastAnsweredQuestion(order, mockAnswers)).toEqual({
      id: "SAQ38",
      index: 13,
    });
  });

  it("should get return an empty id and -1 if there are no answers", () => {
    const order = getQuestionOrder(mockConfig);
    expect(getLastAnsweredQuestion(order, {})).toEqual({
      id: "",
      index: -1,
    });
  });
});

describe("getNextQuestion", () => {
  it("should return null if the question id is invalid", () => {
    const allQuestions = indexQuestionById(mockConfig);
    expect(getNextQuestion(mockConfig, "fakeId")).toEqual(null);
  });

  it("should return null if it is the last question", () => {
    const allQuestions = indexQuestionById(mockConfig);
    expect(getNextQuestion(mockConfig, "SAQ133")).toEqual(null);
  });

  it("should get me the next question if there are no logic", () => {
    const allQuestions = indexQuestionById(mockConfig);
    expect(getNextQuestion(mockConfig, "SAQ42")).toEqual(allQuestions["SAQ43"]);
  });

  it("should get the next ordered question if there is logic but there is no answer", () => {
    const allQuestions = indexQuestionById(mockConfig);
    expect(getNextQuestion(mockConfig, "SAQ60")).toEqual(allQuestions["SAQ61"]);
  });

  it("should get the next ordered question if there is logic but answers do not match the conditions", () => {
    const allQuestions = indexQuestionById(mockConfig);
    expect(getNextQuestion(mockConfig, "SAQ60")).toEqual(allQuestions["SAQ61"]);
  });

  it("should get the next question from the logic condition", () => {
    const allQuestions = indexQuestionById(mockConfig);
    expect(
      getNextQuestion(mockConfig, "SAQ60", {
        "SAQ000-02": { answer: [{ value: "iso27001" }] },
      })
    ).toEqual(allQuestions["SAQ78"]);
  });
});
