import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  textarea {
    resize: vertical;
  }
`;

interface Props {
  label: string;
  value: string;
  setValue: (value: string) => void;
  name: string;
}

export const FreeTextInput = ({ label, value, setValue, name }: Props) => {
  return (
    <Container>
      <label className="ds_label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="ds_input"
        rows={5}
        id={name}
        name={name}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Container>
  );
};
