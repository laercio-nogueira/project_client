export interface ErrorI {
  isLoading?: boolean;
  status: string;
  isUninitialized: boolean;
  error: {
    data: {
      message: string[];
    };
  };
  isError: boolean;
  reset: () => void;
}
