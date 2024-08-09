import {
  Box,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { Option } from "../types/assessmentConfig";
import { MinimumRequiredLabel } from "./MinimumRequiredLabel";

interface Props {
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
  value,
  options,
  freeText: freeTextValue,
  onChange,
  freeTextOnChange,
}: Props) => {
  return (
    <Box display="flex" flexDirection="column">
      {options.map(
        ({
          name,
          value: optionValue,
          freeText,
          freeTextLabel,
          minimumRequired,
        }) => {
          return (
            <Box key={name}>
              <FormControlLabel
                value={optionValue}
                checked={value.includes(optionValue)}
                control={<Checkbox onChange={onChange} />}
                label={name}
              />
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
