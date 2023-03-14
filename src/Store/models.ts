export type LoadingStateMachine = "idle" | "loading" | "success" | "error";

export type ReducerError = {
  message: string;
  data: any;
};
