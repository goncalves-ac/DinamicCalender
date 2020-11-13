package com.example.demo.model.controllers;

import org.springframework.util.StringUtils;
import com.example.demo.upload.utils.FileUploadUtil;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

@RestController
public class FileController {

    @CrossOrigin
    @PostMapping("/editarPerfil")
    public String saveImg(@RequestParam("image") MultipartFile file) {
        String fileNome = StringUtils.cleanPath(file.getOriginalFilename());
        String uploadDir = "files";

        Date date = new Date();
        String filePrefix = date.getTime() + "-";
        fileNome = filePrefix + fileNome;

        try {
            FileUploadUtil.saveFile(uploadDir, fileNome, file);
        }
        catch (IOException e) {
            return ("Não foi possível salvar o arquivo: " + fileNome);
        }

        return uploadDir + "/" + fileNome; //http://localhost:8080/uploadDir/fileName
    }
}
