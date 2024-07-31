// MARK: - Types
type ActionResponseSuccess<Data> = {
  success: true;
  data?: Data | null;
};

type ActionResponseError<
  S extends {
    [k: string]: unknown;
  },
> = {
  success: false;
  error: {
    message?: string;
    issues?: Partial<Record<keyof S, string[]>>;
  };
};

export type ActionResponse<
  S extends {
    [k: string]: unknown;
  },
  Data = unknown,
> = ActionResponseSuccess<Data> | ActionResponseError<S>;
