open Lib
open Js_of_ocaml

let () = Js.Unsafe.global##.format := Formatter.format
