import { Typography, TypographyProps } from "@mui/material";

export default function Heading({
  children,
  color = "#000",
  fontSize = 48,
  fontWeight = 400,
  variant = "h1",
  ...rest
}: TypographyProps) {
  return (
    <Typography
      {...rest}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      variant={variant}
    >
      {children}
    </Typography>
  );
}
