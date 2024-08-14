import { TextField, FormLabel, Box } from "@mui/material";
import { Option } from "../types/assessmentConfig";
import { MinimumRequiredLabel } from "./MinimumRequiredLabel";

interface Props {
  value: string | number;
  freeText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  freeTextOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    optionValue: string
  ) => void;
  options: Option[];
  questionId: string;
}

export const RadioGroup = ({
  value,
  freeText: freeTextValue,
  onChange,
  freeTextOnChange,
  options,
  questionId,
}: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {options.map(
        ({
          name,
          value: optionValue,
          freeText,
          freeTextLabel,
          minimumRequired,
        }) => {
          return (
            <Box key={`${questionId}-${name}`}>
              <div className="ds_radio">
                <input
                  className="ds_radio__input"
                  id={optionValue}
                  name={questionId}
                  type="radio"
                  onChange={onChange}
                  checked={value === optionValue}
                  value={optionValue}
                />
                <label className="ds_radio__label" htmlFor={optionValue}>
                  {name}
                </label>
                {minimumRequired && <MinimumRequiredLabel />}
              </div>
              {freeText && value === optionValue && (
                <FormLabel
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    flexDirection: "column",
                    marginLeft: "1.9rem",
                  }}
                >
                  <i>{freeTextLabel}</i>
                  <TextField
                    value={freeTextValue || ""}
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
