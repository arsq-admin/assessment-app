interface Props {
  title?: string;
  body?: string;
}

export const SuccessfulPage = ({ title = "", body = "" }: Props) => {
  return (
    <>
      <div className="ds_notification-panel">
        <h1 className="ds_notification-panel__title">
          Thank you for your submission
        </h1>
        <p className="ds_notification-panel__content">
          You have met the requirements for this assessment.
        </p>
        <p className="ds_notification-panel__content">
          We’ve sent you a confirmation email.
        </p>
        <p className="ds_notification-panel__content">
          Check your spam inbox if you do not get an email.
        </p>
      </div>
      <h2>{title}</h2>
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
