package eloquentelks.poi.api.repository;

import com.mapbox.geojson.Feature;
import com.mapbox.geojson.Point;

import java.util.List;

/**
 * Repository for GeoJson features
 */
public interface IFeatureRepository {

    /**
     * Loads GeoJson features from the database within the radius around the specified center.
     * @param center Center point of the circle
     * @param radius Radius of the circle
     * @return
     */
    List<Feature> getFeatures(Point center, double radius);

    /**
     * Loads GeoJson features from the database with a specific attraction type.
     * @param attractionType
     * @return
     */
    List<Feature> getFeatures(String attractionType);
}
