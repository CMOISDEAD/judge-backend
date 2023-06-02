export interface Code {
  lang: string;
  code: string;
  expected: string;
}

export interface CodeOutput {
  message: string;
  output: string;
  passed: boolean;
}
