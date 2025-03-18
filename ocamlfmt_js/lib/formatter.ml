open Ocamlformat_lib
open Config

let format content =
  let res =
    Translation_unit.parse_and_format
      Syntax.Use_file
      ~input_name:"empty"
      ~source:content
      myconfig
  in
  res
;;
