import { IconButton } from "@mui/material"
import { MouseEventHandler } from "react"

type IconButtonLargeProps = {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined,
  icon: any
}

export default function IconButtonLarge({ onClick, icon }: IconButtonLargeProps) {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      onClick={onClick}
    >
      {icon}
    </IconButton>
  )
} 