open Ocamlformat_lib

let make_option_updater name values updater =
  let insert (conf : Conf_t.t) value =
    let _, v = values |> List.find (fun (n, _) -> n = value) in
    updater conf v
  in
  name, insert
;;

let config_options =
  let elt content = Conf_t.Elt.make content `Default in
  [ make_option_updater
      "module_item_spacing"
      [ "compact", `Compact; "preserve", `Preserve; "sparse", `Sparse ]
      (fun conf v ->
         { conf with fmt_opts = { conf.fmt_opts with module_item_spacing = elt v } })
  ]
;;

let myconfig =
  config_options
  |> List.fold_left (fun acc (_, update) -> update acc "sparse") Conf.default
;;
