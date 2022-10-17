#![feature(try_blocks)]

use anyhow::Context;
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

use marine_sqlite_connector as sqlite;
use marine_sqlite_connector::{Connection, State, Statement, Value};

module_manifest!();

fn db() -> Connection {
    sqlite::open("/tmp/health.sqlite").expect("open sqlite db")
}

pub fn main() {
    db()
    .execute(
        "CREATE TABLE IF NOT EXISTS statuses (status TEXT, peer_id TEXT, service_id TEXT, last_update INTEGER);",
    )
    .expect("table should be created successfully");
}

#[marine]
pub struct HealthStatus {
    status: String,
    peer_id: String,
    service_id: String,
    last_update: u64,
}

#[marine]
pub fn store_status(status: String, host: String, service_id: String, timestamp: u64) {
    let status = HealthStatus {
        status,
        peer_id: host,
        service_id,
        last_update: timestamp
    };

    store(status);
}

#[marine]
pub fn store(status: HealthStatus) {
    let HealthStatus {
        status,
        peer_id,
        service_id,
        last_update,
    } = status;

    db().execute(format!(
        "INSERT INTO statuses VALUES ('{}', '{}', '{}', {})",
        status, peer_id, service_id, last_update
    ))
    .expect("insert health status");
}

fn read_status(s: &mut Statement) -> anyhow::Result<HealthStatus> {
    Ok(HealthStatus {
        status: s.read(0)?,
        peer_id: s.read(1)?,
        service_id: s.read(2)?,
        last_update: s.read::<f64>(3)? as u64,
    })
}

fn statuses() -> anyhow::Result<Vec<HealthStatus>> {
    let mut s = db()
        .prepare("SELECT * FROM statuses")
        .expect("prepare select");

    std::iter::from_fn(move || {
        let r: anyhow::Result<Option<HealthStatus>> = try {
            if let State::Row = s.next()? {
                Some(read_status(&mut s)?)
            } else {
                None
            }
        };
        r.context("error fetching status row from sqlite")
            .transpose()
    })
    .collect()
}

#[marine]
pub fn get_all_statuses() -> Vec<HealthStatus> {
    statuses().expect("get statuses")
}

#[marine]
/// returns optional HealthStatus
pub fn get_status(service_id: String) -> Vec<HealthStatus> {
    let mut s = db()
        .prepare("SELECT * FROM statuses WHERE service_id = ?")
        .expect("prepare select");
    s.bind(1, &Value::String(service_id))
        .expect("bind service id");

    if let State::Row = s.next().expect("read one row from statuses") {
        vec![read_status(&mut s).expect("read status rom row")]
    } else {
        vec![]
    }
}
