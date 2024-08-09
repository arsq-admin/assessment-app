import {
  Radio,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  TextField,
  FormLabel,
  Box,
} from "@mui/material";
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
    <MuiRadioGroup
      value={value || ""}
      defaultValue={value || ""}
      onChange={onChange}
      sx={{ display: "flex", flexDirection: "column" }}
    >
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
              <FormControlLabel
                value={optionValue}
                control={<Radio />}
                label={name}
              />
              {minimumRequired && <MinimumRequiredLabel />}
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
    </MuiRadioGroup>
  );
};
