use std::env;
use std::path::{Path, PathBuf};
use std::fs;

use lazy_static::lazy_static;

use crate::date::format_duration;

#[cfg(target_os = "windows")]
lazy_static! {
    pub static ref APPDATA: String = {
        env::var("APPDATA").unwrap_or_else(|_| {
            panic!("Failed to retrieve APPDATA environment variable");
        })
    };
}

#[cfg(target_os = "macos")]
lazy_static! {
    pub static ref APPDATA: String = {
        // Get the home directory on macOS and append the required path components
        let mut path = env::home_dir().unwrap_or_else(|| {
            panic!("Failed to determine home directory");
        });
        path.push("Library");
        path.push("Application Support");
        path.to_string_lossy().to_string()
    };
}

#[cfg(target_os = "linux")]
lazy_static! {
    pub static ref APPDATA: String = {
        // Get the home directory on Linux and append the required path components
        let mut path = env::var("HOME").unwrap_or_else(|_| {
            panic!("Failed to retrieve HOME environment variable");
        });
        path.push_str("/.config"); // Adjust this based on your specific requirements
        path.to_string()
    };
}

#[tauri::command]
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
pub fn read_directory() -> Result<Vec<String>, String> {
    verify_cubane_dir().map_err(|err| format!("{}", err))?;

    let mut files = Vec::new();

    for entry in fs::read_dir(&cubane_path()).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();

        if path.is_file() {
            let path_str = path.to_string_lossy().into_owned();
            files.push(path_str);
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

#[tauri::command]
pub fn last_updated(file_path: &str, include_formatting: bool) -> Result<String, String> {
    match fs::metadata(file_path) {
        Ok(metadata) => {
            if let Ok(modified_time) = metadata.modified() {
                let duration = modified_time
                    .elapsed()
                    .map_err(|e| format!("Error getting elapsed time: {}", e))?;

                let result = if include_formatting {
                    format_duration(duration)
                } else {
                    format!("{}", duration.as_secs())
                };

                Ok(result)
            } else {
                Err("Unable to retrieve file creation date.".to_string())
            }
        }
        Err(e) => Err(format!("Error getting file metadata: {}", e)),
    }
}
