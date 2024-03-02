// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod files;

fn preload() {
    match files::verify_cubane_dir() {
        Ok(()) => {
            println!("Cubane directory verification successfull!");
        }
        Err(error) => {
            panic!("{}", error);
        }
    }
}

fn main() {
    preload();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            files::create_file,
            files::delete_file,
            files::read_directory,
            files::read_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
