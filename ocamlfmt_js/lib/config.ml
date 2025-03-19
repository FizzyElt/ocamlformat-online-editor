open Ocamlformat_lib
open Js_of_ocaml

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
    make_option_updater
      "align_symbol_open_paren"
      [ "true", true; "false", false ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with align_symbol_open_paren = elt v } })
    (* assignment_operator *)
  ; make_option_updater
      "assignment_operator"
      [ "begin_line", `Begin_line; "end_line", `End_line ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with assignment_operator = elt v } })
    (* break_around_multiline_strings *)
  ; make_option_updater
      "break_around_multiline_strings"
      [ "true", true; "false", false ]
      (fun conf v ->
         { conf with
           fmt_opts = { conf.fmt_opts with break_around_multiline_strings = elt v }
         })
  ; make_option_updater
      "module_item_spacing"
      [ "compact", `Compact; "preserve", `Preserve; "sparse", `Sparse ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with module_item_spacing = elt v } })
  ; make_option_updater
      "line_endings"
      [ "lf", `Lf; "crlf", `Crlf ]
      (fun conf v -> { conf with fmt_opts = { conf.fmt_opts with line_endings = elt v } })
  ; make_option_updater
      "sequence_blank_line"
      [ "compact", `Compact; "preserve_one", `Preserve_one ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with sequence_blank_line = elt v } })
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

  let conf = Conf.default in
  config_options
  |> List.fold_left
       (fun c (name, updater) ->
          match Hashtbl.find_opt htbl name with
          | Some v -> updater c v
          | None -> c)
       conf
;;
