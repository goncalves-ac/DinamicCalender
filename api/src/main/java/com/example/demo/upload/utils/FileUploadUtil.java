package com.example.demo.upload.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;

public class FileUploadUtil {
	
	private final static Path uploadPath = Paths.get("assets");

    public static String saveFile(MultipartFile file) throws Exception {

        Date date = new Date();
        String filePrefix = date.getTime() + "-";
        String fileName = filePrefix + file.getName();

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
    
    public static void deleteFile(String fileName) throws Exception {
    	Path filePath = uploadPath.resolve(fileName);
    	
    	if (Files.exists(filePath)) {
    		Files.delete(filePath);
    	} else {
    		throw new IOException("Arquivo com nome" + fileName + " não existe.");
    	}   	
    	
    }
}
