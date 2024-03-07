use std::process::Command;

#[tauri::command]
#[cfg(target_os = "windows")]
pub fn open_in_explorer(file_path: &str) -> Result<(), String> {
    Command::new("cmd")
        .args(&["/C", "start", file_path])
        .spawn()
        .map_err(|e| format!("Failed to open Explorer: {}", e))
        .map(|_| ())
}

#[tauri::command]
#[cfg(target_os = "linux")]
pub fn open_in_explorer(file_path: &str) -> Result<(), String> {
    Command::new("xdg-open")
        .arg(file_path)
        .spawn()
        .map_err(|e| format!("Failed to open file explorer: {}", e))
        .map(|_| ())
}

#[tauri::command]
#[cfg(target_os = "macos")]
pub fn open_in_explorer(file_path: &str) -> Result<(), String> {
    Command::new("open")
        .arg(file_path)
        .spawn()
        .map_err(|e| format!("Failed to open Finder: {}", e))
        .map(|_| ())
}
