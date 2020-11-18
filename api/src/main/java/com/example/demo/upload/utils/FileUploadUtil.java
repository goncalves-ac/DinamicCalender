package com.example.demo.upload.utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {
	
	private final static Path uploadPath = Paths.get("static");
	
	private static String getFileNamePrefix(boolean prefix) {
		if (prefix) {
			Date date = new Date();
            return date.getTime() + "-"; 
		} else {
			return "";
		}
	}
	
	private static String getFileNameAffix(String fileName, String fileOriginalName) {
		if (fileName.contains(".")) {
			return fileName;
		} else {
			return fileOriginalName;
		}
	}

    public static String saveFile(MultipartFile file, boolean prefix) throws Exception {

    	String fileName = getFileNamePrefix(prefix) + getFileNameAffix(file.getName(), file.getOriginalFilename());
        

        if(!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = file.getInputStream()){
            Path filePath = uploadPath.resolve(fileName);
            
            if (Files.exists(filePath)) { 
            	throw new IOException("Já existe um arquivo com esse nome.");
            }
            
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            return uploadPath + "/" + fileName;
        }
        
        catch (IOException ioException) {
            throw new IOException("Não foi possível salvar o arquivo: " + fileName, ioException);
        }

    }
    
    public static MultipartFile getFile(String avatarUri) throws Exception {
    	   	

    	File oldImg = new File(avatarUri);
    	if (!oldImg.exists()) {
    		return null;
    	}

    	
    	byte[] oldImgByteArray = Files.readAllBytes(Paths.get(avatarUri));
    	
    	MultipartFile oldImgMultipart = new MockMultipartFile(oldImg.getName(), oldImgByteArray);

    	return oldImgMultipart;
    }
    
    public static void deleteFile(String avatarUri) throws Exception {
    	Path filePath = Paths.get(avatarUri);
    	
    	if (Files.exists(filePath)) {
    		Files.delete(filePath);
    	} else {
    		throw new IOException("Destino de arquivo inexistente.");
    	}   	
    	
    }
    
    public static void rollback(OldNewImgFileState oldState) throws Exception {
    	deleteFile(oldState.getNewImgUri());
    	saveFile(oldState.getOldImg(), false);
    }
}
