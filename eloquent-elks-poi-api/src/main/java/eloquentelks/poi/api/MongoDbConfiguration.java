package eloquentelks.poi.api;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoDbConfiguration {

//    @Value("${spring.data.mongodb.host}")
//    private String host;
//
//    @Value("${spring.data.mongodb.port}")
//    private String port;
//
//    @Value("${spring.data.mongodb.database}")
//    private String database;
//
//    @Bean
//    public MongoClient mongoClient(){
//        return MongoClients.create("mongodb://"+host+":"+Integer.parseInt(port));
//    }
//
//    @Bean
//    public SimpleMongoClientDatabaseFactory
}
