import { Column, Container } from "@/components";

import { scotGovColour } from "@/themes";

import { useNavigate } from "react-router-dom";

interface Props {
  redirectUrl?: string;
  buttonName?: string;
}

export const ImprovementPlanIntroPage = ({
  redirectUrl,
  buttonName,
}: Props) => {
  const { secondaryText } = scotGovColour;
  const navigate = useNavigate();
  return (
    <Container padding="4rem">
      <Column span="3 / span 8" margin="0 0 4rem">
        <h1>Improvement Plan</h1>
        <h2>What is an Improvement Plan</h2>
        <p style={{ color: secondaryText }}>
          The Contracting Authority has chosen to accept an Improvement Plan if
          a supplier does not meet the minimum requirements for this contract's
          Cyber Risk Profile. This allows non-compliant bidders to demonstrate
          that they will be able to meet the requirements that they currently do
          not meet to agreed timescales. Your Improvement Plan must set out
          credible information on:
        </p>
        <ul>
          <li style={{ color: secondaryText }}>
            your organisation’s proposed actions to achieve the requirements you
            currently do not meet – this may include proposed alternative
            mitigations or controls to manage relevant cyber risks; and/or
          </li>
          <li style={{ color: secondaryText }}>
            your organisation’s reasoning as to why compliance with specific
            minimum requirements is not necessary for the contract; and
          </li>
          <li style={{ color: secondaryText }}>
            in line with any requirements specified by the contracting authority
            in the Risk Management section of this report and Instructions to
            Tenderers, the date or contract phase by which your organisation
            intends to achieve the requirements or have in place alternative
            mitigations or controls.
          </li>
        </ul>
        <p style={{ color: secondaryText }}>
          If you submit an Improvement Plan, the authority will assess whether
          it satisfactorily addresses the requirements for this contract. The
          authority reserves the right to reject bidders if their Improvement
          Plans do not satisfactorily address the requirements.
        </p>

        {buttonName && redirectUrl && (
          <button className="ds_button" onClick={() => navigate(redirectUrl)}>
            {buttonName}
          </button>
        )}
      </Column>
    </Container>
  );
};
