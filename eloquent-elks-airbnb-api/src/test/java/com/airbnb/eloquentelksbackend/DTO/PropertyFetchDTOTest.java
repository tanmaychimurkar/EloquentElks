package com.airbnb.eloquentelksbackend.DTO;

import com.airbnb.eloquentelksbackend.entity.Property;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PropertyFetchDTOTest {

    @Test
    public void testPropertyGetDTO(){
        Property testProperty = new Property();
        testProperty.setId("testId");
        testProperty.setLongitude(8.541694);
        testProperty.setLatitude(47.376888);
        testProperty.setRoom_type("testRoomType");
        testProperty.setName("testName");
<<<<<<< HEAD:eloquent-elks-airbnb-api/src/test/java/com/airbnb/eloquentelksbackend/DTO/PropertyFetchDTOTest.java
        testProperty.setAvailability(120);
=======
        testProperty.setAvailability_365(120);
>>>>>>> feature/ASEP-47:eloquent-elks-backend/src/test/java/com/airbnb/eloquentelksbackend/DTO/PropertyFetchDTOTest.java
        testProperty.setHost_name("testHostName");
        testProperty.setPrice(300);
        testProperty.setNeighbourhood_group("testNeighborhhodGroup");

        PropertyFetchDTO propertyFetchDTO = DTOMapper.INSTANCE.convertPropertyToPropertyFetchDTO(testProperty);
        assertEquals(propertyFetchDTO.getName(), testProperty.getName());
        assertEquals(propertyFetchDTO.getRoomType(), testProperty.getRoom_type());
        assertEquals(propertyFetchDTO.getLatitude(),testProperty.getLatitude());
        assertEquals(propertyFetchDTO.getLongitude(),testProperty.getLongitude());
    }

}
