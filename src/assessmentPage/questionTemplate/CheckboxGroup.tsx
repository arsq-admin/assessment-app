import { Box, FormLabel, TextField } from "@mui/material";
import { Option } from "../types/assessmentConfig";
import { MinimumRequiredLabel } from "./MinimumRequiredLabel";

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
}

export const CheckboxGroup = ({
  questionId,
  value,
  options,
  freeText: freeTextValue,
  onChange,
  freeTextOnChange,
}: Props) => {
  return (
    <Box display="flex" flexDirection="column" gap="1rem">
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
                />
                <label className="ds_checkbox__label" htmlFor={optionValue}>
                  {name}
                </label>
              </div>
              {minimumRequired && <MinimumRequiredLabel />}
              {freeText && value.includes(optionValue) && (
                <FormLabel
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    flexDirection: "column",
                    marginLeft: "1.9rem",
                  }}
                >
                  {freeTextLabel}
                  <TextField
                    value={freeTextValue[optionValue] || ""}
                    onChange={(event) => freeTextOnChange(event, optionValue)}
                  />
                </FormLabel>
              )}
            </Box>
          );
        }
      )}
    </Box>
  );
};
