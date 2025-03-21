export type Config = {
  align_symbol_open_paren: string;
  assignment_operator: string;
  break_around_multiline_strings: string;
  break_before_in: string;
  break_cases: string;
  break_collection_expressions: string;
  break_colon: string;
  break_infix: string;
  break_infix_before_func: string;
  break_fun_decl: string;
  break_fun_sig: string;
  break_separators: string;
  break_sequences: string;
  break_string_literals: string;
  break_struct: string;
  cases_matching_exp_indent: string;
  disambiguate_non_breaking_match: string;
  doc_comments: string;
  doc_comments_tag_only: string;
  dock_collection_brackets: string;
  exp_grouping: string;
  field_space: string;
  function_indent_nested: string;
  if_then_else: string;
  indicate_multiline_delimiters: string;
  indicate_nested_or_patterns: string;
  infix_precedence: string;
  leading_nested_match_parens: string;
  let_and: string;
  let_binding_deindent_fun: string;
  let_binding_spacing: string;
  let_module: string;
  line_endings: string;
  match_indent_nested: string;
  module_item_spacing: string;
  nested_match: string;
  ocp_indent_compat: string;
  parens_ite: string;
  parens_tuple: string;
  parens_tuple_patterns: string;
  parse_docstrings: string;
  sequence_blank_line: string;
  sequence_style: string;
  single_case: string;
  space_around_arrays: string;
  space_around_lists: string;
  space_around_records: string;
  space_around_variants: string;
  type_decl: string;
  wrap_comments: string;
  wrap_docstrings: string;
  wrap_fun_args: string;
};

export const defaultConfig: Config = {
  align_symbol_open_paren: "",
  assignment_operator: "",
  break_around_multiline_strings: "",
  break_before_in: "",
  break_cases: "",
  break_collection_expressions: "",
  break_colon: "",
  break_infix: "",
  break_infix_before_func: "",
  break_fun_decl: "",
  break_fun_sig: "",
  break_separators: "",
  break_sequences: "",
  break_string_literals: "",
  break_struct: "",
  cases_matching_exp_indent: "",
  disambiguate_non_breaking_match: "",
  doc_comments: "",
  doc_comments_tag_only: "",
  dock_collection_brackets: "",
  exp_grouping: "",
  field_space: "",
  function_indent_nested: "",
  if_then_else: "",
  indicate_multiline_delimiters: "",
  indicate_nested_or_patterns: "",
  infix_precedence: "",
  leading_nested_match_parens: "",
  let_and: "",
  let_binding_deindent_fun: "",
  let_binding_spacing: "",
  let_module: "",
  line_endings: "",
  match_indent_nested: "",
  module_item_spacing: "",
  nested_match: "",
  ocp_indent_compat: "",
  parens_ite: "",
  parens_tuple: "",
  parens_tuple_patterns: "",
  parse_docstrings: "",
  sequence_blank_line: "",
  sequence_style: "",
  single_case: "",
  space_around_arrays: "",
  space_around_lists: "",
  space_around_records: "",
  space_around_variants: "",
  type_decl: "",
  wrap_comments: "",
  wrap_docstrings: "",
  wrap_fun_args: "",
};

type StrOption = {
  valueType: "str";
  label: keyof Config;
  options: string[];
};

type IntOption = {
  valueType: "int";
  label: keyof Config;
};

const boolOptions = ["", "true", "false"];

export const selectList: (StrOption | IntOption)[] = [
  {
    valueType: "str",
    label: "align_symbol_open_paren",
    options: boolOptions,
  },
  {
    valueType: "str",
    label: "assignment_operator",
    options: ["", "begin_line", "end_line"],
  },
  {
    valueType: "str",
    label: "break_around_multiline_strings",
    options: boolOptions,
  },
  {
    valueType: "str",
    label: "break_before_in",
    options: ["", "auto", "fit_or_vertical"],
  },
  {
    valueType: "str",
    label: "break_cases",
    options: ["", "fit", "nested", "toplevel", "fit_or_vertical"],
  },
  {
    valueType: "str",
    label: "break_collection_expressions",
    options: ["", "wrap", "fit_or_vertical"],
  },
  { valueType: "str", label: "break_colon", options: ["", "before", "after"] },
  {
    valueType: "str",
    label: "break_infix",
    options: ["", "wrap", "fit_or_vertical", "wrap_or_vertical"],
  },
  { valueType: "str", label: "break_infix_before_func", options: boolOptions },
  {
    valueType: "str",
    label: "break_fun_decl",
    options: ["", "wrap", "fit_or_vertical", "smart"],
  },
  {
    valueType: "str",
    label: "break_fun_sig",
    options: ["", "wrap", "fit_or_vertical", "smart"],
  },
  {
    valueType: "str",
    label: "break_separators",
    options: ["", "before", "after"],
  },
  { valueType: "str", label: "break_sequences", options: boolOptions },
  {
    valueType: "str",
    label: "break_string_literals",
    options: ["", "auto", "never"],
  },
  { valueType: "str", label: "break_struct", options: boolOptions },
  {
    valueType: "str",
    label: "cases_matching_exp_indent",
    options: ["", "normal", "compact"],
  },
  {
    valueType: "str",
    label: "disambiguate_non_breaking_match",
    options: boolOptions,
  },
  {
    valueType: "str",
    label: "doc_comments",
    options: ["", "before", "before_except_val", "after_when_possible"],
  },
  {
    valueType: "str",
    label: "doc_comments_tag_only",
    options: ["", "fit", "default"],
  },
  { valueType: "str", label: "dock_collection_brackets", options: boolOptions },
  {
    valueType: "str",
    label: "exp_grouping",
    options: ["", "parens", "preserve"],
  },
  {
    valueType: "str",
    label: "field_space",
    options: ["", "tight", "loose", "tight_decl"],
  },
  {
    valueType: "str",
    label: "function_indent_nested",
    options: ["", "always", "auto", "never"],
  },
  {
    valueType: "str",
    label: "if_then_else",
    options: [
      "",
      "compact",
      "fit_or_vertical",
      "keyword_first",
      "k_r",
      "vertical",
    ],
  },
  {
    valueType: "str",
    label: "indicate_multiline_delimiters",
    options: ["", "no", "space", "closing_on_separate_line"],
  },
  {
    valueType: "str",
    label: "indicate_nested_or_patterns",
    options: ["", "space", "unsafe_no"],
  },
  {
    valueType: "str",
    label: "infix_precedence",
    options: ["", "indent", "parens"],
  },
  {
    valueType: "str",
    label: "leading_nested_match_parens",
    options: boolOptions,
  },
  { valueType: "str", label: "let_and", options: ["", "compact", "sparse"] },
  { valueType: "str", label: "let_binding_deindent_fun", options: boolOptions },
  {
    valueType: "str",
    label: "let_binding_spacing",
    options: ["compact", "sparse", "double_semicolon"],
  },
  { valueType: "str", label: "let_module", options: ["", "compact", "sparse"] },
  { valueType: "str", label: "line_endings", options: ["", "lf", "crlf"] },
  {
    valueType: "str",
    label: "match_indent_nested",
    options: ["", "always", "auto", "never"],
  },
  {
    valueType: "str",
    label: "module_item_spacing",
    options: ["", "compact", "preserve", "sparse"],
  },
  { valueType: "str", label: "nested_match", options: ["", "wrap", "align"] },
  { valueType: "str", label: "ocp_indent_compat", options: boolOptions },
  { valueType: "str", label: "parens_ite", options: boolOptions },
  {
    valueType: "str",
    label: "parens_tuple",
    options: ["", "always", "multi_line_only"],
  },
  {
    valueType: "str",
    label: "parens_tuple_patterns",
    options: ["", "always", "multi_line_only"],
  },
  { valueType: "str", label: "parse_docstrings", options: boolOptions },
  {
    valueType: "str",
    label: "sequence_blank_line",
    options: ["", "compact", "preserve_one"],
  },
  {
    valueType: "str",
    label: "sequence_style",
    options: ["", "before", "separator", "terminator"],
  },
  {
    valueType: "str",
    label: "single_case",
    options: ["", "compact", "sparse"],
  },
  { valueType: "str", label: "space_around_arrays", options: boolOptions },
  { valueType: "str", label: "space_around_lists", options: boolOptions },
  { valueType: "str", label: "space_around_records", options: boolOptions },
  { valueType: "str", label: "space_around_variants", options: boolOptions },
  { valueType: "str", label: "type_decl", options: ["", "compact", "sparse"] },
  { valueType: "str", label: "wrap_comments", options: boolOptions },
  { valueType: "str", label: "wrap_docstrings", options: boolOptions },
  { valueType: "str", label: "wrap_fun_args", options: boolOptions },
];
