open Ocamlformat_lib
open Config
open Js_of_ocaml

let format conf content =
    conf
    |> parse_config
    |> create_config
    |> Translation_unit.parse_and_format
         Syntax.Use_file
         ~input_name:"empty"
         ~source:content
    |> Result.fold ~ok:Js.some ~error:(Fun.const Js.null)
;;
