open Ocamlformat_lib
open Config
open Js_of_ocaml

let format conf content =
  let new_conf = parse_config conf |> create_config in
  let res =
    Translation_unit.parse_and_format
      Syntax.Use_file
      ~input_name:"empty"
      ~source:content
      new_conf
  in
  match res with
  | Ok content -> Js.some content
  | _ -> Js.null
;;
