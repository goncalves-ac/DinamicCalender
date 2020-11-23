package com.example.demo.utils;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OldNewImgFileState {
	private String newImgUri;
	private MultipartFile oldImg;
	
	public OldNewImgFileState(String newImgUri, MultipartFile oldImg) {
		this.newImgUri = newImgUri;
		this.oldImg = oldImg;
	}

	public OldNewImgFileState() {
		// TODO Auto-generated constructor stub
	}
}
