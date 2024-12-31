import { Box } from "@mui/material";
import { Option } from "../types/assessmentConfig";
import { MinimumRequiredLabel } from "./MinimumRequiredLabel";
import { scotGovColour } from "@/themes";

interface Props {
  questionId: string;
  value: (string | number)[];
  freeText: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  freeTextOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    optionValue: string
  ) => void;
  options: Option[];
  disabled: boolean;
}

export const CheckboxGroup = ({
  questionId,
  value,
  options,
  freeText: freeTextValue,
  onChange,
  freeTextOnChange,
  disabled,
}: Props) => {
  const { secondaryText } = scotGovColour;
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem" width="90%">
      <p style={{ color: secondaryText }}>Select all that apply.</p>
      {options.map(
        ({
          name,
          value: optionValue,
          freeText,
          freeTextLabel,
          minimumRequired,
        }) => {
          return (
            <Box className="ds_field_group" key={name}>
              <div className="ds_checkbox">
                <input
                  className="ds_checkbox__input"
                  id={optionValue}
                  onChange={onChange}
                  value={optionValue}
                  name={questionId}
                  checked={value.includes(optionValue)}
                  type="checkbox"
                  disabled={disabled}
                />
                <label className="ds_checkbox__label" htmlFor={optionValue}>
                  {name}
                </label>
                {minimumRequired && <MinimumRequiredLabel />}
              </div>
              {freeText && value.includes(optionValue) && (
                <Box
                  sx={{
                    paddingLeft: "3.5rem",
                    width: "100%",
                  }}
                >
                  <label
                    className="ds_label"
                    htmlFor={`${questionId}-freeText`}
                  >
                    {freeTextLabel}
                  </label>
                  <textarea
                    value={freeTextValue[optionValue] || ""}
                    onChange={(event) => freeTextOnChange(event, optionValue)}
                    className="ds_input"
                    rows={3}
                    id={`${questionId}-freeText`}
                    name={`${questionId}-freeText`}
                  />
                </Box>
              )}
            </Box>
          );
        }
      )}
    </Box>
  );
};
