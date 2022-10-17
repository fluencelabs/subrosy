use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

module_manifest!();

pub fn main() {}

#[marine]
pub fn set_ok(ok: bool) {
    todo!()
}

#[marine]
pub fn ok() -> bool {
    true
}
