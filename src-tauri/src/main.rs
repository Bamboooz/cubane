// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

mod filesystem;
mod explorer;
mod splash;
mod date;
mod sort;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();

            tauri::async_runtime::spawn(async move {
                match filesystem::verify_cubane_dir() {
                    Ok(()) => {
                        println!("Cubane directory verification successfull!");
                    }
                    Err(error) => {
                        panic!("{}", error);
                    }
                }
        
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
            });

            Ok(())
        })
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
            sort::sort_files_az,
            sort::sort_files_za,
            sort::sort_files_last_updated,
            sort::sort_files_first_updated,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
