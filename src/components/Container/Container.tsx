import { Container as ContainerMUI, ContainerProps } from "@mui/material/"

export type Props = ContainerProps

export default function Container({ maxWidth = "lg", children, ...rest }: Props) {
  return (
    <ContainerMUI maxWidth={maxWidth} {...rest}>
      {children}
    </ContainerMUI>
  )
}
