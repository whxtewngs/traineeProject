import {useRef} from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import * as React from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  blockClear: {
    position: 'absolute',
    right: -10,
    top: -12,
    cursor: 'pointer',
  }
});

export default function TechBlock(
  {
    element,
    isDisplayText,
    dispatch,
    actionTypeDelete
  }: {
    element: string
    isDisplayText: boolean | undefined
    dispatch: React.Dispatch<{ type: string; value: string; }>
    actionTypeDelete: string
  }
) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const classes = useStyles();

  return (
    <>
      <span ref={ref}>{element}</span>
      {!isDisplayText &&
          <span
              className={classes.blockClear}
              onClick={
                () => {
                  !isDisplayText && dispatch({type: actionTypeDelete, value: ref.current?.textContent ?? ''});
                }}
          >
          <CancelOutlinedIcon color="secondary"/>
    </span>}
    </>
  )
}