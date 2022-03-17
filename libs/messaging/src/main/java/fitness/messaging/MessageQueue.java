package fitness.messaging;

import com.google.gson.Gson;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.util.function.Consumer;

// This class is inspired from the course
// 02267 Software Development of Web Services Jan 22
// at DTU (Technical University of Denmark)
@SpringBootApplication
public class MessageQueue {

    private static final String TOPIC = "events";
    private static final String DEFAULT_HOSTNAME = "localhost";
    private static final String EXCHANGE_NAME = "eventsExchange";
    private static final String QUEUE_TYPE = "topic";

    private Channel channel;

    public MessageQueue() {
        this.channel = setupChannel();
    }

    public void addHandler(String eventType, Consumer<Event> handler) {
        var handlerChannel = setupChannel();
        System.out.println("- Handler " + handler + " for event type " + eventType + " set up.");
        try {
            String queueName = handlerChannel.queueDeclare().getQueue();
            handlerChannel.queueBind(queueName, EXCHANGE_NAME, TOPIC);

            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String message = new String(delivery.getBody(), "UTF-8");

                Event event = new Gson().fromJson(message, Event.class);

                if (eventType.equals(event.getType())) {
                    System.out.println("[x] Handle event " + message);
                    handler.accept(event);
                }
            };
            handlerChannel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
            });
        } catch (IOException e1) {
            throw new Error(e1);
        }
    }

    public void publish(Event event) {
        String message = new Gson().toJson(event);
        System.out.println("[x] Publishing event " + message + ".");
        try {
            channel.basicPublish(EXCHANGE_NAME, TOPIC, null, message.getBytes("UTF-8"));
        } catch (IOException e) {
            throw new Error(e);
        }
    }

    public Channel setupChannel() {
        Channel channelSetup = null;
        boolean channelSetupSuccess = false;
        do {
            try {
                ConnectionFactory factory = new ConnectionFactory();
                factory.setHost(DEFAULT_HOSTNAME);
                Connection connection = factory.newConnection();
                channelSetup = connection.createChannel();
                channelSetup.exchangeDeclare(EXCHANGE_NAME, QUEUE_TYPE);
                channelSetupSuccess = true;
            } catch (Exception e) {
                System.out.println(e);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ex) {
                    ex.printStackTrace();
                }
            }
        } while (!channelSetupSuccess);
        return channelSetup;
    }

}
