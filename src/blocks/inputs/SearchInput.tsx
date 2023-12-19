import { styled } from "solid-styled-components";

const Input = styled("input")`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0px;
  border-radius: 6px;
  text-align: left;
  width: 100%;
  border-width: 3px;
  border-style: solid;

  &:active,
  &:focus {
    outline: none;
  }
`;

type TTextInputProps = {
  onInput?: (value: any) => void;
  onSubmit?: (value: any) => void;
  placeholder?: string;
  value: string;
};

export const SearchInput = ({
  onInput,
  onSubmit,
  placeholder,
  value,
  ...rest
}: TTextInputProps) => {
  return (
    <Input
      onInput={(e) => {
        if (onInput) {
          onInput(e.currentTarget.value);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onSubmit) {
          onSubmit(e.currentTarget.value);
        }
      }}
      placeholder={placeholder}
      value={value}
      {...rest}
    />
  );
};
