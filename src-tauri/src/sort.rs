use crate::filesystem::last_updated;

#[tauri::command]
pub fn sort_files_az(files: Vec<String>) -> Vec<String> {
    let mut sorted_files = files.clone();
    sorted_files.sort(); // Sort the cloned vector in alphabetical order

    sorted_files
}

#[tauri::command]
pub fn sort_files_za(files: Vec<String>) -> Vec<String> {
    let mut sorted_files = sort_files_az(files);
    sorted_files.reverse();

    sorted_files
}

#[tauri::command]
pub fn sort_files_last_updated(mut files: Vec<String>) -> Vec<String> {
    files.sort_by(|a, b| {
        let a_last_updated = last_updated(a, false).unwrap_or_else(|err| {
            eprintln!("Error getting last updated time for {}: {}", a, err);
            std::u64::MAX.to_string()
        });

        let b_last_updated = last_updated(b, false).unwrap_or_else(|err| {
            eprintln!("Error getting last updated time for {}: {}", b, err);
            std::u64::MAX.to_string()
        });

        a_last_updated.cmp(&b_last_updated)
    });

    files
}

#[tauri::command]
pub fn sort_files_first_updated(files: Vec<String>) -> Vec<String> {
    let mut sorted_files = sort_files_last_updated(files);
    sorted_files.reverse();

    sorted_files
}
