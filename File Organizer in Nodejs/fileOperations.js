import fs from "fs";
import path from "path";
import http from "http";

const fileExt = {
  images: ".jpg",
  documents: ".pdf",
  text: ".txt",
  audio: ".mp3",
};

const currentDirectory = process.cwd();
const allFiles = fs.readdirSync(currentDirectory);  // Now you have all the files present in currentDirectory

function createImgDir() {
  const newDir = path.join(currentDirectory, "images");
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir);
    console.log("Created New Image Directory.");
  }

  for (let file of allFiles) {
    if (typeof file == "string" && path.extname(file) == fileExt.images) {
      const oldPath = path.join(currentDirectory, file);
      const newPath = path.join(newDir, file);
      fs.renameSync(oldPath, newPath);
    }
  }
}
// createImgDir();

function createDocumentDir() {
  const newDir = path.join(currentDirectory, "pdf");
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir);
    console.log("Created New Pdf Directory");
  }

  for (let file of allFiles) {
    if (typeof file == "string" && path.extname(file) === fileExt.documents) {
      const oldPath = path.join(currentDirectory, file);
      const newPath = path.join(newDir, file);
      fs.renameSync(oldPath, newPath);
    }
  }
}
// createDocumentDir();

function createTextDir() {
  const newDir = path.join(currentDirectory, "text");
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir);
    console.log("Created New Text Directory");
  }

  for (let file of allFiles) {
    if (typeof file == "string" && path.extname(file) === fileExt.text) {
      const oldPath = path.join(currentDirectory, file);
      const newPath = path.join(newDir, file);
      fs.renameSync(oldPath, newPath);
    }
  }
}
// createTextDir();

function createAudioDir() {
  const newDir = path.join(currentDirectory, "audios");
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir);
    console.log("Created New Audio Directory");
  }

  for(let file of allFiles){
    if(typeof file == "string" && path.extname(file) === fileExt.audio){
      const oldPath = path.join(currentDirectory, file);
      const newPath = path.join(newDir, file);
      fs.renameSync(oldPath, newPath); 
    }
  }
}
// createAudioDir();


export function organizeAllFiles() {
  createImgDir();
  createDocumentDir();
  createTextDir();
  createAudioDir();
}


export function createFile(filename) {
  const filePath = path.join(currentDirectory, filename);
  fs.writeFileSync(filePath, "This is a new file created via HTTP!");
}

export function readFile(filename) {
  const filePath = path.join(currentDirectory, filename);
  if (!fs.existsSync(filePath)) throw new Error("File does not exist");
  return fs.readFileSync(filePath, "utf-8");
}

export function deleteFile(filename) {
  const filePath = path.join(currentDirectory, filename);
  if (!fs.existsSync(filePath)) throw new Error("File does not exist");
  fs.unlinkSync(filePath);
}