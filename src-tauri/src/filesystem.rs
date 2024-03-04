use std::env;
use std::path::{Path, PathBuf};
use std::fs;

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
pub fn create_file(file_name: &str, initial_content: &str) -> Result<(), String> {
    verify_cubane_dir().map_err(|err| format!("{}", err))?;
    
    let file_path = cubane_path().join(file_name);

    match fs::File::create(&file_path) {
        Ok(_) => {
            if !initial_content.is_empty() {
                write_file(file_path.display().to_string().as_str(), initial_content)?;
            }

            Ok(())
        }
        Err(err) => Err(format!("Failed to create a file: {}.", err)),
    }
}

#[tauri::command]
pub fn delete_file(file_path: &str) -> Result<(), String> {
    match fs::remove_file(file_path) {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("Failed to delete a file: {}.", err)),
    }
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
pub fn read_file(file_path: &str) -> Result<String, String> {
    match fs::read_to_string(file_path) {
        Ok(contents) => Ok(contents),
        Err(err) => Err(format!("Failed to read a file: {}.", err)),
    }
}

#[tauri::command]
pub fn write_file(file_path: &str, content: &str) -> Result<(), String> {
    match fs::write(file_path, content) {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("Failed to write to a file: {}.", err)),
    }
}

#[tauri::command]
pub fn rename_file(file_path: &str, new_name: &str) -> Result<(), String> {
    match fs::rename(file_path, new_name) {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("Failed to rename a file: {} to {}.", err, new_name)),
    }
}
