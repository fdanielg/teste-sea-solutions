import { Box as BoxMUI, BoxProps } from "@mui/material";

export default function Box({ children, ...rest }: BoxProps) {
  return <BoxMUI {...rest}>{children}</BoxMUI>;
}
