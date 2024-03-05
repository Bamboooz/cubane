use std::process::Command;

#[tauri::command]
pub fn open_in_explorer(file_path: &str) -> Result<(), String> {
    Command::new("cmd")
        .args(&["/C", "start", file_path])
        .spawn()
        .map_err(|e| format!("Failed to open Explorer: {}", e))
        .map(|_| ())
}
