open Ocamlformat_lib
open Js_of_ocaml
open Default_config

let bool_values = [ "true", true; "false", false ]

let make_option_updater name values updater =
  let insert (conf : Conf.t) value =
    let _, v = values |> List.find (fun (n, _) -> n = value) in
    updater conf v
  in
  name, insert
;;

let config_options =
  let elt content = Conf.Elt.make content `Default in
  [ (* align_symbol_open_paren *)
    make_option_updater "align_symbol_open_paren" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with align_symbol_open_paren = elt v } })
  ; (* assignment_operator *)
    make_option_updater
      "assignment_operator"
      [ "begin_line", `Begin_line; "end_line", `End_line ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with assignment_operator = elt v } })
  ; (* break_around_multiline_strings *)
    make_option_updater "break_around_multiline_strings" bool_values (fun conf v ->
      { conf with
        fmt_opts = { conf.fmt_opts with break_around_multiline_strings = elt v }
      })
  ; (* break_before_in *)
    make_option_updater
      "break_before_in"
      [ "auto", `Auto; "fit_or_vertical", `Fit_or_vertical ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with break_before_in = elt v } })
  ; (* break_cases *)
    make_option_updater
      "break_cases"
      [ "fit", `Fit
      ; "nested", `Nested
      ; "toplevel", `Toplevel
      ; "fit_or_vertical", `Fit_or_vertical
      ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with break_cases = elt v } })
  ; (* break_collection_expressions *)
    make_option_updater
      "break_collection_expressions"
      [ "wrap", `Wrap; "fit_or_vertical", `Fit_or_vertical ]
      (fun conf v ->
         { conf with
           fmt_opts = { conf.fmt_opts with break_collection_expressions = elt v }
         })
  ; (* break_colon *)
    make_option_updater
      "break_colon"
      [ "before", `Before; "after", `After ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with break_colon = elt v } })
  ; (* break_infix *)
    make_option_updater
      "break_infix"
      [ "wrap", `Wrap
      ; "fit_or_vertical", `Fit_or_vertical
      ; "wrap_or_vertical", `Wrap_or_vertical
      ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with break_infix = elt v } })
  ; (* break_infix_before_func *)
    make_option_updater "break_infix_before_func" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with break_infix_before_func = elt v } })
  ; (* break_fun_decl *)
    make_option_updater
      "break_fun_decl"
      [ "wrap", `Wrap; "fit_or_vertical", `Fit_or_vertical; "smart", `Smart ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with break_fun_decl = elt v } })
  ; (* break_fun_sig *)
    make_option_updater
      "break_fun_sig"
      [ "wrap", `Wrap; "fit_or_vertical", `Fit_or_vertical; "smart", `Smart ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with break_fun_sig = elt v } })
  ; (* break_separators *)
    make_option_updater
      "break_separators"
      [ "before", `Before; "after", `After ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with break_separators = elt v } })
  ; (* break_sequences *)
    make_option_updater "break_sequences" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with break_sequences = elt v } })
  ; (* break_string_literals *)
    make_option_updater
      "break_string_literals"
      [ "auto", `Auto; "never", `Never ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with break_string_literals = elt v } })
  ; (* break_struct *)
    make_option_updater "break_struct" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with break_struct = elt v } })
  ; (* cases_matching_exp_indent *)
    make_option_updater
      "cases_matching_exp_indent"
      [ "normal", `Normal; "compact", `Compact ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with cases_matching_exp_indent = elt v } })
  ; (* disambiguate_non_breaking_match *)
    make_option_updater "disambiguate_non_breaking_match" bool_values (fun conf v ->
      { conf with
        fmt_opts = { conf.fmt_opts with disambiguate_non_breaking_match = elt v }
      })
  ; (* doc_comments *)
    make_option_updater
      "doc_comments"
      [ "before", `Before
      ; "before_except_val", `Before_except_val
      ; "after_when_possible", `After_when_possible
      ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with doc_comments = elt v } })
  ; (* doc_comments_tag_only *)
    make_option_updater
      "doc_comments_tag_only"
      [ "fit", `Fit; "default", `Default ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with doc_comments_tag_only = elt v } })
  ; (* dock_collection_brackets *)
    make_option_updater "dock_collection_brackets" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with dock_collection_brackets = elt v } })
  ; (* exp_grouping *)
    make_option_updater
      "exp_grouping"
      [ "parens", `Parens; "preserve", `Preserve ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with exp_grouping = elt v } })
  ; (* field_space *)
    make_option_updater
      "field_space"
      [ "tight", `Tight; "loose", `Loose; "tight_decl", `Tight_decl ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with field_space = elt v } })
  ; (* function_indent_nested *)
    make_option_updater
      "function_indent_nested"
      [ "always", `Always; "auto", `Auto; "never", `Never ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with function_indent_nested = elt v } })
  ; (* if_then_else *)
    make_option_updater
      "if_then_else"
      [ "compact", `Compact
      ; "fit_or_vertical", `Fit_or_vertical
      ; "keyword_first", `Keyword_first
      ; "k_r", `K_R
      ; "vertical", `Vertical
      ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with if_then_else = elt v } })
  ; (* indicate_multiline_delimiters *)
    make_option_updater
      "indicate_multiline_delimiters"
      [ "no", `No
      ; "space", `Space
      ; "closing_on_separate_line", `Closing_on_separate_line
      ]
      (fun conf v ->
         { conf with
           fmt_opts = { conf.fmt_opts with indicate_multiline_delimiters = elt v }
         })
  ; (* indicate_nested_or_patterns *)
    make_option_updater
      "indicate_nested_or_patterns"
      [ "space", `Space; "unsafe_no", `Unsafe_no ]
      (fun conf v ->
         { conf with
           fmt_opts = { conf.fmt_opts with indicate_nested_or_patterns = elt v }
         })
  ; (* infix_precedence *)
    make_option_updater
      "infix_precedence"
      [ "indent", `Indent; "parens", `Parens ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with infix_precedence = elt v } })
  ; (* leading_nested_match_parens *)
    make_option_updater "leading_nested_match_parens" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with leading_nested_match_parens = elt v } })
  ; (* let_and *)
    make_option_updater
      "let_and"
      [ "compact", `Compact; "sparse", `Sparse ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with let_and = elt v } })
  ; (* let_binding_deindent_fun *)
    make_option_updater "let_binding_deindent_fun" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with let_binding_deindent_fun = elt v } })
  ; (* let_binding_spacing *)
    make_option_updater
      "let_binding_spacing"
      [ "compact", `Compact; "sparse", `Sparse; "double_semicolon", `Double_semicolon ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with let_binding_spacing = elt v } })
  ; (* let_module *)
    make_option_updater
      "let_module"
      [ "compact", `Compact; "sparse", `Sparse ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with let_module = elt v } })
  ; (* line_endings *)
    make_option_updater
      "line_endings"
      [ "lf", `Lf; "crlf", `Crlf ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with line_endings = elt v } })
  ; (* match_indent_nested *)
    make_option_updater
      "match_indent_nested"
      [ "always", `Always; "auto", `Auto; "never", `Never ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with match_indent_nested = elt v } })
  ; (* module_item_spacing *)
    make_option_updater
      "module_item_spacing"
      [ "compact", `Compact; "preserve", `Preserve; "sparse", `Sparse ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with module_item_spacing = elt v } })
  ; (* nested_match *)
    make_option_updater
      "nested_match"
      [ "wrap", `Wrap; "align", `Align ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with nested_match = elt v } })
  ; (* ocp_indent_compat *)
    make_option_updater "ocp_indent_compat" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with ocp_indent_compat = elt v } })
  ; (* parens_ite *)
    make_option_updater "parens_ite" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with parens_ite = elt v } })
  ; (* parens_tuple *)
    make_option_updater
      "parens_tuple"
      [ "always", `Always; "multi_line_only", `Multi_line_only ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with parens_tuple = elt v } })
  ; (* parens_tuple_patterns *)
    make_option_updater
      "parens_tuple_patterns"
      [ "always", `Always; "multi_line_only", `Multi_line_only ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with parens_tuple_patterns = elt v } })
  ; (* parse_docstrings *)
    make_option_updater "parse_docstrings" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with parse_docstrings = elt v } })
  ; (* sequence_blank_line *)
    make_option_updater
      "sequence_blank_line"
      [ "compact", `Compact; "preserve_one", `Preserve_one ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with sequence_blank_line = elt v } })
  ; (* sequence_style *)
    make_option_updater
      "sequence_style"
      [ "before", `Before; "separator", `Separator; "terminator", `Terminator ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with sequence_style = elt v } })
  ; (* single_case *)
    make_option_updater
      "single_case"
      [ "compact", `Compact; "sparse", `Sparse ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with single_case = elt v } })
  ; (* space_around_arrays *)
    make_option_updater "space_around_arrays" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with space_around_arrays = elt v } })
  ; (* space_around_lists *)
    make_option_updater "space_around_lists" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with space_around_lists = elt v } })
  ; (* space_around_records *)
    make_option_updater "space_around_records" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with space_around_records = elt v } })
  ; (* space_around_variants *)
    make_option_updater "space_around_variants" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with space_around_variants = elt v } })
  ; (* type_decl *)
    make_option_updater
      "type_decl"
      [ "compact", `Compact; "sparse", `Sparse ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with type_decl = elt v } })
  ; (* wrap_comments *)
    make_option_updater "wrap_comments" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with wrap_comments = elt v } })
  ; (* wrap_docstrings *)
    make_option_updater "wrap_docstrings" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with wrap_docstrings = elt v } })
  ; (* wrap_fun_args *)
    make_option_updater "wrap_fun_args" bool_values (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with wrap_fun_args = elt v } })
  ]
;;

let make_int_option_updater name updater =
  let insert (conf : Conf.t) (value : string) =
    try
      let n = int_of_string value in
      updater conf n
    with
    | Failure _ -> conf
  in
  name, insert
;;

let int_config_options =
  let elt content = Conf.Elt.make content `Default in
  [ make_int_option_updater "cases_exp_indent" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with cases_exp_indent = elt v } })
  ; make_int_option_updater "doc_comments_padding" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with doc_comments_padding = elt v } })
  ; make_int_option_updater "extension_indent" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with extension_indent = elt v } })
  ; make_int_option_updater "function_indent" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with function_indent = elt v } })
  ; make_int_option_updater "indent_after_in" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with indent_after_in = elt v } })
  ; make_int_option_updater "let_binding_indent" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with let_binding_indent = elt v } })
  ; make_int_option_updater "margin" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with margin = elt v } })
  ; make_int_option_updater "match_indent" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with match_indent = elt v } })
  ; make_int_option_updater "max_indent" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with max_indent = elt (Some v) } })
  ; make_int_option_updater "stritem_extension_indent" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with stritem_extension_indent = elt v } })
  ; make_int_option_updater "type_decl_indent" (fun conf v ->
      { conf with fmt_opts = { conf.fmt_opts with type_decl_indent = elt v } })
  ]
;;

type 'a matrix_js_t = 'a Js.js_array Js.t Js.js_array Js.t

let parse_config (list : Js.js_string Js.t matrix_js_t) =
  let list =
    Js.to_array list |> Array.map (fun row -> Js.to_array row |> Array.map Js.to_string)
  in
  list
  |> Array.to_seq
  |> Seq.filter (fun arr -> Array.length arr = 2)
  |> Seq.map (fun arr -> arr.(0), arr.(1))
  |> List.of_seq
;;

let create_config (list : (string * string) list) =
  let htbl = Hashtbl.create (List.length list) in
  List.iter (fun (k, v) -> Hashtbl.add htbl k v) list;

  let conf =
    match Hashtbl.find_opt htbl "profile" with
    | Some "default" -> default_profile
    | Some "conventional" -> default_profile
    | Some "ocamlformat" -> ocamlformat_profile
    | Some "janestreet" -> janestreet_profile
    | Some _ | None -> Conf.default
  in
  let conf =
    config_options
    |> List.fold_left
         (fun c (name, updater) ->
            match Hashtbl.find_opt htbl name with
            | Some v -> updater c v
            | None -> c)
         conf
  in
  let conf =
    int_config_options
    |> List.fold_left
         (fun c (name, updater) ->
            match Hashtbl.find_opt htbl name with
            | Some v -> updater c v
            | None -> c)
         conf
  in
  conf
;;
