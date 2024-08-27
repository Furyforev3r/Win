// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::{Path, PathBuf};
use serde::Serialize;
use tauri::command;
use mime_guess::from_path;
use base64::{Engine, engine::general_purpose};

#[derive(Serialize)]
struct FileEntry {
    path: String,
    name: String,
    is_dir: bool,
    children: Option<Vec<FileEntry>>,
}

fn read_directory(path: &Path) -> Result<Vec<FileEntry>, String> {
    if path.is_dir() {
        match fs::read_dir(path) {
            Ok(entries) => {
                let mut directories = Vec::new();
                let mut files = Vec::new();
                for entry in entries {
                    match entry {
                        Ok(entry) => {
                            let path = entry.path();
                            let name = path.file_name()
                                .unwrap_or_default()
                                .to_string_lossy()
                                .into_owned();
                            let is_dir = path.is_dir();
                            let file_entry = FileEntry {
                                path: path.to_string_lossy().into_owned(),
                                name,
                                is_dir,
                                children: if is_dir {
                                    match read_directory(&path) {
                                        Ok(children) => Some(children),
                                        Err(e) => return Err(e),
                                    }
                                } else {
                                    None
                                },
                            };
                            if is_dir {
                                directories.push(file_entry);
                            } else {
                                files.push(file_entry);
                            }
                        }
                        Err(err) => return Err(format!("Failed to read entry: {}", err)),
                    }
                }
                let mut all_entries = directories;
                all_entries.extend(files);
                Ok(all_entries)
            }
            Err(err) => Err(format!("Failed to read directory: {}", err)),
        }
    } else {
        Err(format!("The provided path is not a directory"))
    }
}

fn read_file_content(path: &Path) -> Result<String, String> {
    if path.is_file() {
        match fs::read_to_string(path) {
            Ok(content) => Ok(content),
            Err(err) => Err(format!("Failed to read file: {}", err)),
        }
    } else {
        Err(format!("The provided path is not a file"))
    }
}

#[command]
fn get_files_in_folder(folder_path: String) -> Result<Vec<FileEntry>, String> {
    let path = PathBuf::from(folder_path);
    read_directory(&path)
}

#[command]
fn get_file_content(file_path: String) -> Result<String, String> {
    let path = PathBuf::from(file_path);
    read_file_content(&path)
}

#[command]
fn save_file_content(file_path: String, content: String) -> Result<(), String> {
    let path = PathBuf::from(file_path);
    
    if path.is_dir() {
        return Err("The provided path is a directory".to_string());
    }

    match fs::write(&path, content) {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("Failed to write to file: {}", err)),
    }
}

#[command]
fn get_file_type(file_path: String) -> String {
    let mime_type = from_path(&file_path).first_or_octet_stream();
    if mime_type.type_() == mime::TEXT {
        return "text".to_string();
    } else if mime_type.type_() == mime::IMAGE {
        return "image".to_string();
    }
    "unknown".to_string()
}

#[command]
fn get_file_base64(file_path: String) -> Result<String, String> {
    let engine = general_purpose::STANDARD;
    
    match fs::read(&file_path) {
        Ok(file_data) => Ok(engine.encode(&file_data)),
        Err(e) => Err(format!("Failed to read file: {}", e)),
    }
}

#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet, 
            get_files_in_folder, 
            get_file_content, 
            save_file_content,
            get_file_type,
            get_file_base64
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
