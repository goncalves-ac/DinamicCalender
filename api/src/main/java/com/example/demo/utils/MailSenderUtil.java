package com.example.demo.utils;

import java.nio.charset.StandardCharsets;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class MailSenderUtil {

	@Autowired
	private JavaMailSender emailSender;
	
	@Value("${api.email.from.address}")
	private String address;
	
	@Value("${api.email.from.name}")
	private String name;
	
	public void sendMail(Mail mail) throws Exception {
		try {
			MimeMessage message = emailSender.createMimeMessage();
    		MimeMessageHelper helper = new MimeMessageHelper(message, 
    				MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
    				StandardCharsets.UTF_8.name());
    		
    		if(mail.getFromEmail() == null) {
    			mail.setFromEmail(address);
    		}
    		if(mail.getFromName() == null) {
    			mail.setFromName(name);
    		}
    		
    		helper.setTo(mail.getTo());
    		helper.setText(mail.getMessage());
    		helper.setSubject(mail.getSubject());
            helper.setFrom(mail.getFromEmail(), mail.getFromName());
            
            emailSender.send(message);
		} catch (Exception e) {
			throw e;
		}
	}
	
}
