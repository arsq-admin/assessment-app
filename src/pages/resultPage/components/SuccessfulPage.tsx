interface Props {
  title?: string;
  body?: string;
}

export const SuccessfulPage = ({ title = "", body = "" }: Props) => {
  return (
    <>
      <p>Thank you for your submission</p>
      <h1>{title}</h1>
      <p>{body}</p>
      <h2>What happens next?</h2>
      <p>
        You have completed the assessment and may now close this browser window.
      </p>
      <p>
        Please refer to the invitation to tender to see if there are any
        remaining assessments to complete.
      </p>
      <p>If you’d like to track your progress please visit app.supply25.com</p>
    </>
  );
};
