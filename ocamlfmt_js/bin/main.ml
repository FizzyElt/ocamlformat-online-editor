open Lib
open Js_of_ocaml

let () =
    Js.Unsafe.global##.format := Formatter.format;
    Js.export
      "ocamlFmt"
      (object%js
         method format = Formatter.format
      end )
;;
