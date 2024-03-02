// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod filesystem;

fn preload() {
    match filesystem::verify_cubane_dir() {
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
            filesystem::create_file,
            filesystem::delete_file,
            filesystem::read_directory,
            filesystem::read_file,
            filesystem::write_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
