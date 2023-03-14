import { Typography, TypographyProps } from "@mui/material";

export default function Text({
  children,
  color = "#000",
  fontSize = 16,
  fontWeight = 400,
  ...rest
}: TypographyProps) {
  return (
    <Typography
      {...rest}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </Typography>
  );
}
