// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod filesystem;
mod explorer;
mod splash;
mod date;

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
            filesystem::rename_file,
            filesystem::last_updated,
            filesystem::cubane_path,
            explorer::open_in_explorer,
            splash::close_splashscreen,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
