package com.capgemini.kycapp.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.WebMvcProperties.View;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.BeanNameViewResolver;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;


@SpringBootApplication
@Configuration
@EnableAutoConfiguration
@ComponentScan("com.capgemini.kycapp")
public class App 
{
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    }
    @Bean
    public RestTemplate geRestTemplate() {
        return new RestTemplate();
    }
    
    /*@Bean
    public MappingJackson2JsonView jsonTemplate() {
        MappingJackson2JsonView view = new MappingJackson2JsonView();
        view.setPrettyPrint(true);
        return view;
    }
    
    @Bean
    public ViewResolver viewResolver() {
        return new BeanNameViewResolver();
    }*/
    
}
