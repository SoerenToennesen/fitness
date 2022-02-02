package fitness.messaging;

import com.google.gson.Gson;
import lombok.Data;

import java.io.Serializable;

// This class is inspired from the course
// 02267 Software Development of Web Services Jan 22
// at DTU (Technical University of Denmark)
@Data
public class Event implements Serializable {

    private static final long serialVersionUID = 4986172999588690076L;
    private String type;
    private Object[] arguments;

    public Event(String topic, Object[] arguments) {
        this.type = topic;
        this.arguments = arguments;
    }

    public <T> T getArgument(int i, Class<T> cls) {
        var gson = new Gson();
        var jsonString = gson.toJson(arguments[i]);
        return gson.fromJson(jsonString, cls);
    }
}
