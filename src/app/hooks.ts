import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { RootState, TDispatch } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<TDispatch>();