use std::env;
use std::path::{Path, PathBuf};
use std::fs;
use std::fs::File;
use std::io::Read;

use serde::Serialize;
use lazy_static::lazy_static;

#[derive(Serialize)]
pub struct FileEntry {
    path: String,
}

lazy_static! {
    pub static ref APPDATA: String = {
        env::var("APPDATA").unwrap_or_else(|_| {
            panic!("Failed to retrieve APPDATA environment variable");
        })
    };
}

pub fn cubane_path() -> PathBuf {
    Path::new(&*APPDATA).join("cubane")
}

pub fn verify_cubane_dir() -> Result<(), String> {
    let cubane_path = cubane_path();
    let exists = cubane_path.exists() && cubane_path.is_dir();

    if !exists {
        if let Err(err) = fs::create_dir_all(&cubane_path) {
            return Err(format!("Failed to load cubane directory, error: {}", err));
        }
    }

    Ok(())
}

#[tauri::command]
pub fn create_file(file_name: &str) -> Result<(), String> {
    verify_cubane_dir().map_err(|err| format!("{}", err))?;

    let file_path = cubane_path().join(file_name);
    fs::File::create(&file_path)
        .map_err(|err| format!("Failed to create file: {}", err))
        .map(|_| ())
}

#[tauri::command]
pub fn delete_file(file_name: &str) -> Result<(), String> {
    verify_cubane_dir().map_err(|err| format!("{}", err))?;

    let file_path = cubane_path().join(file_name);
    fs::remove_file(&file_path)
        .map_err(|err| format!("Failed to delete file: {}", err))
        .map(|_| ())
}

#[tauri::command]
pub fn read_directory() -> Result<Vec<FileEntry>, String> {
    verify_cubane_dir().map_err(|err| format!("{}", err))?;

    let mut files = Vec::new();

    for entry in fs::read_dir(&cubane_path()).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();

        if path.is_file() {
            let path_str = path.to_string_lossy().into_owned();
            files.push(FileEntry { path: path_str });
        }
    }

    Ok(files)
}

#[tauri::command]
pub fn read_file(file_name: &str) -> Result<String, String> {
    verify_cubane_dir().map_err(|err| format!("{}", err))?;

    let file_path = cubane_path().join(file_name);
    let mut file_content = String::new();

    let mut file = File::open(&file_path)
        .map_err(|err| format!("Failed to open file: {}", err))?;

    file.read_to_string(&mut file_content)
        .map_err(|err| format!("Failed to read file: {}", err))?;

    Ok(file_content)
}
