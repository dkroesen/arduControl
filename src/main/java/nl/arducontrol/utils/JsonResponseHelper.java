package nl.arducontrol.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import nl.arducontrol.exception.JsonConversionException;

import java.io.IOException;

public class JsonResponseHelper {

    private JsonResponseHelper() {}

    public static String createJsonResponse(final Object o) throws JsonConversionException {
        final String result;
        final ObjectMapper mapper = new ObjectMapper();
        try {
            result = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(o);
        } catch (IOException e) {
            throw new JsonConversionException("Conversion to JSON failed due to IOException: " + e.getMessage());
        }
        return result;
    }
}
